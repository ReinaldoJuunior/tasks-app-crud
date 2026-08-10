const http = require("http");
const crypto = require("crypto");
const { createSecretKey } = require("crypto");
const { SignJWT } = require("jose");
const { readDB, writeDB } = require("./db");
const { hashPassword, verifyPassword } = require("./password");

const PORT = 4000;

// Lê o corpo (body) da requisição e retorna como JSON
function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

function sendJSON(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  res.end(JSON.stringify(payload));
}

// Remove a senha antes de devolver o usuário para o cliente
function toPublicUser(user) {
  const { password, ...publicUser } = user;
  return publicUser;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = url;
  const method = req.method;

  // Pré-flight do CORS
  if (method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });
    return res.end();
  }

  try {
    // ---------- REGISTRO ----------
    if (pathname === "/auth/register" && method === "POST") {
      const body = await readBody(req);
      const { username, email, password } = body;
      if (!username || !email || !password) {
        return sendJSON(res, 400, {
          error: "Todos os campos são obrigatórios.",
        });
      }

      const db = readDB();
      const exists = db.users.find((u) => u.username === username);
      if (exists) {
        return sendJSON(res, 409, { error: "Usuário já cadastrado" });
      }

      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
        return sendJSON(res, 400, {
          error: "Por favor, insira um email válido.",
        });
      }

      if (password.length < 6) {
        return sendJSON(res, 400, {
          error: "A senha deve ter pelo menos 6 caracteres.",
        });
      }

      const newUser = {
        id: crypto.randomUUID(),
        username,
        email,
        password: hashPassword(password),
      };

      db.users.push(newUser);
      writeDB(db);

      const secret = createSecretKey(Buffer.from(process.env.JWT_SECRET || "dev-secret", "utf8"));
      const token = await new SignJWT({
        sub: newUser.id,
        username: newUser.username,
        email: newUser.email,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secret);

      return sendJSON(res, 201, {
        message: "Usuário registrado com sucesso",
        user: toPublicUser(newUser),
        token,
      });
    }

    // ---------- LOGIN ----------
    if (pathname === "/auth/login" && method === "POST") {
      const body = await readBody(req);
      const { email, password } = body;

      const db = readDB();
      const user = db.users.find((u) => u.email === email);

      if (!user || !verifyPassword(password, user.password)) {
        console.error("E-mail ou senha inválidos:", email);
        return sendJSON(res, 401, { error: "E-mail ou senha inválidos" });
      }

      return sendJSON(res, 200, {
        message: "Login efetuado com sucesso",
        user: toPublicUser(user),
      });
    }

    // ---------- LISTAR USUÁRIOS ----------
    if (pathname === "/users" && method === "GET") {
      const db = readDB();
      return sendJSON(res, 200, db.users.map(toPublicUser));
    }

    // ---------- BUSCAR / ATUALIZAR / DELETAR POR ID ----------
    const userMatch = pathname.match(/^\/users\/([^/]+)$/);
    if (userMatch) {
      const id = userMatch[1];
      const db = readDB();
      const index = db.users.findIndex((u) => u.id === id);

      if (index === -1) {
        return sendJSON(res, 404, { error: "Usuário não encontrado" });
      }

      if (method === "GET") {
        return sendJSON(res, 200, toPublicUser(db.users[index]));
      }

      if (method === "PUT") {
        const body = await readBody(req);
        const { username, email, password } = body;

        if (username) db.users[index].username = username;
        if (email) db.users[index].email = email;
        if (password) db.users[index].password = hashPassword(password);

        writeDB(db);
        return sendJSON(res, 200, {
          message: "Usuário atualizado com sucesso",
          user: toPublicUser(db.users[index]),
        });
      }

      if (method === "DELETE") {
        const [removed] = db.users.splice(index, 1);
        writeDB(db);
        return sendJSON(res, 200, {
          message: "Usuário removido com sucesso",
          user: toPublicUser(removed),
        });
      }
    }

    // ---------- ROTA NÃO ENCONTRADA ----------
    console.log("Rota não encontrada:", pathname, method);
    return sendJSON(res, 404, { error: "Rota não encontrada" });
  } catch (err) {
    console.error(err);
    return sendJSON(res, 500, { error: "Erro interno do servidor" });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Backend rodando em http://127.0.0.1:${PORT}`);
});

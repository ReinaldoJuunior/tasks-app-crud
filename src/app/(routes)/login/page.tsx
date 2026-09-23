import { FormLogin } from "@/src/components/forms/FormLogin";
import { COOKIE } from "@/src/constants/constants";
import { checkInvalidEmail, checkInvalidPassword } from "@/src/lib/utils";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const PAGE_TITLE = "Login";

export const metadata: Metadata = {
  title: PAGE_TITLE,
};

export default function Login() {

  const handleLogin = async (_: string, formData: FormData) => {

    "use server";
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      return "Preencha todos os campos.";
    }

    if (!checkInvalidEmail(email)) {
      return "E-mail inválido.";
    }

    if (!checkInvalidPassword(password)) {
      return "A senha deve ter no mínimo 6 caracteres.";
    }

    try {
      const body = {
        email,
        password
      }

      const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("HTTP STATUS:", res.status);
      const { token, message } = await res.json();
      console.log("API Response:", { token, message });

      if (!token) {
        return message;
      } else {
        const cookiesStore = await cookies();

        cookiesStore.set("token", token, COOKIE);

      }

    } catch (error) {
      console.error("Handle Login failed.");
      return "Erro de login.";
    }
    redirect("/tasks");

  };
  return (
    <>
      <h1 className="text-center text-4xl font-bold">{PAGE_TITLE}</h1>
      <FormLogin action={handleLogin} />

      <Link className="text-center underline" href="/register">
        Não tenho Cadastro
      </Link>
    </>
  );
}

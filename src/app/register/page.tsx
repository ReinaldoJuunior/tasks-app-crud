
import FormRegister from "@/src/components/FormRegister";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";

export default function Cadastro() {
  const handleRegister = async (_: string, formData: FormData) => {

    "use server";
    const username = formData.get("username")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    try {
      const body = {
        username,
        email,
        password
      }

      const res = await fetch("http://127.0.0.1:4000/auth/register", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("HTTP STATUS:", res.status);
      const register = await res.json();
      console.log("API Response:", register);
      if (!res.ok) {
        // @todo? Logica de autenticação, caso o usuário já exista, ou caso o email já esteja em uso.
        
      }

    } catch (error) {
      return "Não foi possível conectar ao servidor. Tente novamente mais tarde.";
    }
    redirect("/tasks", RedirectType.replace);
  };


  return (
    <div className="grid gap-y-4 px-8 min-w-100 py-12 bg-[#fdfcfc] rounded-3xl shadow-xl">
      <h1 className="text-center text-4xl font-bold">Cadastro</h1>

      <FormRegister action={handleRegister} />

      <Link className="text-center underline" href="/login">
        Já tenho Cadastro
      </Link>
    </div>

  );
}

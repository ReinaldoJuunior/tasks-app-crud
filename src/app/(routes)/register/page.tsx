
import { FormRegister } from "@/src/components/forms/FormRegister";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { checkInvalidEmail, checkInvalidPassword } from "@/src/lib/utils";
import { COOKIE } from "@/src/constants/constants";

const PAGE_TITLE = "Cadastro";

export const metadata: Metadata = {
  title: PAGE_TITLE,
};

export default function Cadastro() {
  const handleRegister = async (_: string, formData: FormData) => {

    "use server";
    const username = formData.get("username")?.toString();
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
        username,
        email,
        password
      }

      const res = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
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
        // Logica de autenticação, caso o usuário já exista, ou caso o email já esteja em uso.
        const cookiesStore = await cookies();
        cookiesStore.set("token", token, COOKIE);

      }

    } catch (error) {
      console.error("Handle Register failed.");
      return "Erro de cadastro.";
    }
    redirect("/tasks");

  };


  return (
    <>
      <h1 className="text-center text-4xl font-bold">{PAGE_TITLE}</h1>

      <FormRegister action={handleRegister} />

      <Link className="text-center underline" href="/login">
        Já tenho Cadastro
      </Link>
    </>

  );
}

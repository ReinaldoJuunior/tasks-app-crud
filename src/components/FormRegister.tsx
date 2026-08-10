"use client";
import { FC, useActionState, useState } from "react";
import { FormInput } from "./FormInput";
import { FormButton } from "./FormButton";
import { FormError } from "./FormError";

type FormRegisterProps = {
  action: (_: string, formData: FormData) => Promise<string>;
};

export const FormRegister: FC<FormRegisterProps> = ({ action }) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, formAction, isPending] = useActionState(action, "");

  return (
    <>
      {!isPending && <FormError message={errorMessage} />}

      <form className="grid gap-y-6" action={formAction} >

        <FormInput
          id="username"
          label="Usuário"
          value={username}
          setValue={setUsername}
        />
        <FormInput
          id="email"
          label="E-mail"
          name="email"
          value={email}
          setValue={setEmail}
          type="email"
        />

        <FormInput
          id="password"
          name="password"
          label="Senha"
          value={password}
          setValue={setPassword}
          type="password"
        />
        <FormButton>
          Cadastrar
        </FormButton>
      </form>
    </>
  );
}

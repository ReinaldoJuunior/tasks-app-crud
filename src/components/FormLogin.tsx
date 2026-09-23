"use client";
import { FC, useActionState, useState } from "react";
import { FormInput } from "./FormInput";
import { FormButton } from "./FormButton";
import { FormError } from "./FormError";

type FormLoginProps = {
  action: (_: string, formData: FormData) => Promise<string>;
};

export const FormLogin: FC<FormLoginProps> = ({ action }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, formAction, isPending] = useActionState(action, "");

  return (
    <>
      {!isPending && <FormError message={errorMessage} />}

      <form className="grid gap-y-6" action={formAction} >

        <FormInput
          id="email"
          label="E-mail"
          value={email}
          setValue={setEmail}
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
            Login
        </FormButton>
      </form>
    </>
  );
}

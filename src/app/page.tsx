
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid gap-y-4">
      <h1 className="text-4xl">Bem vindo!</h1>
      <p className="font-bold">Telas disponiveis</p>

      <ul className="list-disc ml-6 underline">
        <li>
          <Link href="/register">Cadastro</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/tasks">Tarefas</Link>
        </li>
      </ul>
    </div>
  );
}

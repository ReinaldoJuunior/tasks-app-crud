import { FormTasks } from "@/src/components/forms/FormTasks";
import { COOKIE } from "@/src/constants/constants";
import { fetchWithToken } from "@/src/lib/fetchWithToken";
import { Metadata } from "next";
import { cookies } from "next/headers";

const PAGE_TITLE = "Tarefas";

export const metadata: Metadata = {
  title: PAGE_TITLE,
};

export default function Tasks() {

  const handleCreateTask = async (_: string, formData: FormData) => {

    "use server";
    const task = formData.get("tasks")?.toString();

    if (!task) {
      return " Informe o título da tarefa.";
    }

    try {
      const body = {
        title: task
      }

      const cookiesStore = await cookies();
      const token = cookiesStore.get("token")?.value;

      if (!token) {
        return "Token não encontrado. Faça login novamente.";
      } else {
        const { message } = await fetchWithToken(`${process.env.BACKEND_URL}/tasks`, token, {
          method: "POST",
          body: JSON.stringify(body),
        });
        
        return message;
      }
    } catch (error) {
      console.error("Handle Create Task failed.");
      return "Erro ao criar tarefa.";
    }
  };

  return (
    <>
      <h1 className="text-center text-4xl font-bold">{PAGE_TITLE}</h1>
      <FormTasks action={handleCreateTask} />

      <ul>
        <li>
          tasks...
        </li>
      </ul>
    </>
  );
}

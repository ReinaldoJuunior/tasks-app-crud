"use server";
import { fetchWithToken } from "@/src/lib/fetchWithToken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const handleCreateTask = async (_: string, formData: FormData) => {
    const task = formData.get("tasks")?.toString();

    if (!task) {
        return "Informe o título da tarefa.";
    }

    try {
        const body = {
            title: task
        }

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return "Token não encontrado. Faça login novamente.";
        } else {
            const { message } = await fetchWithToken(`${process.env.BACKEND_URL}/tasks`, token, {
                method: "POST",
                body: JSON.stringify(body),
            });

            if (message) {
                return message;
            }
            revalidateTag("get-tasks", "max");
        }
    } catch (error) {
        console.error("Handle Create Task failed.");
        return "Erro ao criar tarefa.";
    }
};

export const handleCompleteTask = async (formData: FormData) => {
    const id = formData.get("id")?.toString();

    if (!id) {
        console.error("Informe o ID da tarefa.")
        return;
    }

    try {

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return "Token não encontrado. Faça login novamente.";
        } else {
            const { message } = await fetchWithToken(`${process.env.BACKEND_URL}/tasks/${id}/complete`, token, {
                method: "PUT",
            });

            if (message) {
                console.error("handleCompleteTask failed:", message);
                return
            }
            revalidateTag("get-tasks", "max");
        }
    } catch (error) {
        console.error("handleCompleteTask failed.");
        return "Erro ao atualizar tarefa.";
    }
};
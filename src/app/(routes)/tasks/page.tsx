import { FormTasks } from "@/src/components/forms/FormTasks";
import { fetchWithToken } from "@/src/lib/fetchWithToken";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { handleCompleteTask, handleCreateTask } from "./actions";
import { TaskCard } from "@/src/components/TaskCard";

const PAGE_TITLE = "Tarefas";

export const metadata: Metadata = {
  title: PAGE_TITLE,
};

type TaskType = {
  _id: string;
  userId: string;
  title: string;
  completed: boolean;
  deleted: boolean;
  createDate: string;
  modifyDate: string;
  __v: 0;
};

export default async function Tasks() {

  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) return null;
  const { tasks }: { tasks: TaskType[] } = await fetchWithToken(
    `${process.env.BACKEND_URL}/tasks`,
    token,
    {
      next: {
        tags: ["get-tasks"],
      },
    }
  );

  return (
    <>
      <h1 className="text-center text-4xl font-bold">{PAGE_TITLE}</h1>
      <FormTasks action={handleCreateTask} />

      <ul className="grid gap-y-3">
        {tasks.reverse().map((task) => (
          <TaskCard 
          key={task._id} 
          id={task._id} 
          completed={task.completed}
          completeAction={handleCompleteTask}>
            
            {task.title}
          </TaskCard>
        ))}
      </ul>
    </>
  );
}

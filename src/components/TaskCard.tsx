"use client";
import { FC, PropsWithChildren } from "react"

interface TaskCardProps extends PropsWithChildren {
  id: string;
  completed: boolean;
  completeAction: (formData: FormData) => Promise<void>;
}

export const TaskCard: FC<TaskCardProps> = ({ children, id, completed, completeAction }) => (
    <li className="p-4 text-[#7b7c7b] border border-[#e8e9e9] rounded-lg hover:border-[#b1b2b2]">
        <form action={completeAction}>
            <input name="id" type="hidden" value={id} />
            <input 
            type="checkbox" 
            className="accent[#141516]" 
            name="completed" 
            defaultChecked={completed}
            onChange={(e) => {e.target.form?.submit()}} 
            />
        </form>

        {children}
    </li>
);
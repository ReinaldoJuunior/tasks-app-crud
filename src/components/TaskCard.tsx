"use client";
import classNames from "classnames";
import { FC, PropsWithChildren } from "react"

interface TaskCardProps extends PropsWithChildren {
  id: string;
  completed: boolean;
  completeAction: (formData: FormData) => Promise<any>;
  deleteAction: (formData: FormData) => Promise<any>;
}

export const TaskCard: FC<TaskCardProps> = ({ id, children, completed, completeAction, deleteAction }) => (
    <li className={classNames(
        "p-4 grid grid-cols-[auto_1fr_auto] gap-x-2 text-[#7b7c7b] border border-[#e8e9e9] rounded-lg ",
        {"opacity-50": completed, "hover:border-[#b1b2b2]": !completed}
        )}>
        <form className="flex" action={completeAction}>
            <input name="id" type="hidden" value={id} />
            <input 
            type="checkbox" 
            className="accent[#141516]" 
            name="completed" 
            defaultChecked={completed}
            onChange={(e) => !completed && e.target.form?.requestSubmit()} 
            disabled={completed}
            />
        </form>
        <p className={classNames("cursor-default",
            {"line-through": completed}
        )}>

        {children}
        </p>

        {!completed && (
            <form className="flex" action={deleteAction}>
                <input name="id" type="hidden" value={id} />
                <button className="cursor-pointer hover:[&_svg_path]:stroke-red-500" >
                    <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                    >
                        <path
                            className="stroke-red-700 fill-none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M1 1 L13 13 M13 1 L1 13"
                        />
                    </svg>
            
            </button>
        </form>
        )}
    </li>
);
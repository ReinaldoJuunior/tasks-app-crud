import { PropsWithChildren } from "react";

export const FormButton= ({ children }: PropsWithChildren) => (

  <button className="py-2 bg-[#141516] text-white shadow-md rounded-lg cursor-pointer hover:shadow-none">
    {children}
  </button>

);





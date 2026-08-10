import { FC } from "react";

export const FormError: FC<{ message: string }> = ({ message }) => {

  if(!message) return null;

  return (
    <p className="px-4 py-2 bg-red-400 text-white font-bold text-sm rounded-lg">
      {message}
    </p>

  );
};

import { Metadata } from "next";

const PAGE_TITLE = "Tarefas";

export const metadata: Metadata = {
  title: PAGE_TITLE,
};

export default function Tasks() {
  return (
    <>
      <h1 className="text-center text-4xl font-bold">{PAGE_TITLE}</h1>
    </>
  );
}

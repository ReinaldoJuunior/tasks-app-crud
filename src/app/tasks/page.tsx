import { Metadata } from "next";

const PAGE_TITLE = "Tarefas";

export const metadata: Metadata = {
  title: PAGE_TITLE,
};

export default function Tasks() {
  return (
    <div className="grid gap-y-4 px-8 min-w-100 py-12 bg-[#fdfcfc] rounded-3xl shadow-xl">
      <h1 className="text-center text-4xl font-bold">{PAGE_TITLE}</h1>
    </div>
  );
}

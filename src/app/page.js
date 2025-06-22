import { AddTransactionForm } from "@/components/AddTransactionForm";
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-black-600">
        <AddTransactionForm />
      </h1>
    </main>
  );
}
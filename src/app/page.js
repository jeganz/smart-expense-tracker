"use client"

import DataTable from "@/components/Transaction-table";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Home() {
  const [transactions, settransactions] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "transactions"), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      settransactions(items); // or however you're setting state
    });

    return () => unsubscribe(); // clean up
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-black-600">
        {/* <AddTransactionForm /> */}
      </h1>
        <DataTable Transactions={transactions}/>
    </main>
  );
}
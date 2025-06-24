"use client"
import { categories } from "@/constants/categories"
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Input2 } from "@/components/ui/input2"
import { Label } from "@/components/ui/label"
import { useState,useEffect } from "react"
import { Calendar28 } from "./ui/datepicker"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Plus,CheckCircle2Icon } from "lucide-react"

export function AddTransactionForm() {


  

  const [isAdding, setisAdding] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const formSchema = z.object({
    amount: z.coerce.number().positive({ message: "Amount must be greater than 0" }),
    description: z.string().min(1, "Descrption is required").max(100),
    date: z.string().min(1, "Date is required"),
    type: z.enum(["income", "expense"], { message: "Type is required" }),
    category: z.string().min(1, "Category is required"),
  });

  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      description: "",
      date: "",
      type: "",
      category: "",
    },
  });
  
  const selectedDate = form.watch("date");
  const selectedType = form.watch("type");
  const selectedCategory = form.watch("category");

  const onSubmit = async (data) => {
    setisAdding(true);
    try {
      const request=await addDoc(collection(db, "transactions"), data);
      console.log("Transaction added");
      if(request.id){
        setisSuccess(true)
      }
      form.reset(); // reset form after submission
    } catch (error) {
      console.error(error);
    }
    setisAdding(false);
    setTimeout(() => setisSuccess(false), 2000);
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button ><Plus /> Add</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Transaction</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="flex items-center gap-1">
              <Input2 type="number" {...form.register('amount')} />
              <Label className="grid !text-5xl" htmlFor="name-1">₹</Label>
            </div>
            {form.formState.errors.amount && (<p className="text-sm text-red-500">{form.formState.errors.amount.message}</p>)}
            <div className="grid gap-3">
              <Input placeholder="Description" {...form.register("description")} />
              {form.formState.errors.description && (
                <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Calendar28 onChange={(val) => form.setValue("date", val)} val={selectedDate} />
              {form.formState.errors.date && (
                <p className="text-sm text-red-500">{form.formState.errors.date.message}</p>
              )}

            </div>
            <div className="grid gap-3">
              <ToggleGroup type="single" size="lg" variant="outline" name='type' value={selectedType} onValueChange={(val) => val && form.setValue("type", val)}>
                <ToggleGroupItem value="expense" aria-label="Toggle bold">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M200-200v-400h80v264l464-464 56 56-464 464h264v80H200Z" /></svg>
                  Expense
                </ToggleGroupItem>
                <ToggleGroupItem value="income" aria-label="Toggle italic">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#75FB4C"><path d="m216-160-56-56 464-464H360v-80h400v400h-80v-264L216-160Z" /></svg>
                  Income
                </ToggleGroupItem>
              </ToggleGroup>
              {form.formState.errors.type && (
                <p className="text-sm text-red-500">{form.formState.errors.type.message}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Select onValueChange={(val) => val && form.setValue("category", val)} value={selectedCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((item) => (
                    <SelectItem key={item} value={item}>{item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.category && (
                <p className="text-sm text-red-500">{form.formState.errors.category.message}</p>
              )}
            </div>
          </div>
          <div className="grid gap-3 w-full justify-center">
            {isAdding && (<TextShimmerWave>Adding Transaction</TextShimmerWave>)}
            {isSuccess ? (<Alert className=" bg-green-100">
              <CheckCircle2Icon />
              <AlertTitle>Success! Your transaction have been added</AlertTitle>
            </Alert>):""}
            
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Add</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

"use client"
import { categories } from "@/constants/categories"
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
import { useState } from "react"
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
import { Item } from "@radix-ui/react-toggle-group"

export function AddTransactionForm() {
  const [transactiionData, setTransactionData] = useState({
    amount: "",
    description: "",
    date: "",
    type:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionData((prev)=>({...prev,[name]:value}))
    
  }
  const handleSubmit = ()=>{
    setTransactionData({
    amount: "",
    description: "",
    date: "",
    type:"",
    category:"",
  })
    console.log(transactiionData);
  }
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Add Transaction</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Transaction</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="flex items-center gap-1">
              <Input2 type="number" name='amount' onChange={handleChange} required/>
              <Label className="grid !text-5xl" htmlFor="name-1">₹</Label>
            </div>
            <div className="grid gap-3">
              <Input name="description" onChange={handleChange} placeholder="Description"/>
            </div>
            <div className="grid gap-3">
              <Calendar28 setTransactionData={setTransactionData}/>
            </div>
            <div className="grid gap-3">
                  <ToggleGroup type="single" size="lg" variant="outline" name='type' onValueChange={(val)=> val && setTransactionData((prev)=>({...prev,type:val}))}>
                    <ToggleGroupItem value="expense" aria-label="Toggle bold">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M200-200v-400h80v264l464-464 56 56-464 464h264v80H200Z"/></svg>
                      Expense
                    </ToggleGroupItem>
                    <ToggleGroupItem value="income" aria-label="Toggle italic">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#75FB4C"><path d="m216-160-56-56 464-464H360v-80h400v400h-80v-264L216-160Z"/></svg>
                      Income
                    </ToggleGroupItem>
                  </ToggleGroup>
            </div>
            <div className="grid gap-3">
              <Select onValueChange={(val)=> val && setTransactionData((prev)=>({...prev,category:val}))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((item)=>(
                    <SelectItem value={item}>{item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={handleSubmit}>Add</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

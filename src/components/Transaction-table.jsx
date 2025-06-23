import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowDownLeft, ArrowUpRight, CalendarIcon } from "lucide-react"
import { AddTransactionForm } from "./AddTransactionForm"
import { Button } from "./ui/button"

const Transactions = [
  {
    id: "1",
    description: "Salary Payment",
    date: "2024-01-15",
    amount: 5000.0,
    type: "income",
    category: "Salary",
  },
  {
    id: "2",
    description: "Grocery Shopping",
    date: "2024-01-14",
    amount: 125.5,
    type: "expense",
    category: "Food & Dining",
  },
  {
    id: "3",
    description: "Freelance Project",
    date: "2024-01-13",
    amount: 800.0,
    type: "income",
    category: "Freelance",
  },
  {
    id: "4",
    description: "Electric Bill",
    date: "2024-01-12",
    amount: 89.25,
    type: "expense",
    category: "Utilities",
  },
  {
    id: "5",
    description: "Coffee Shop",
    date: "2024-01-11",
    amount: 12.75,
    type: "expense",
    category: "Food & Dining",
  },
  {
    id: "6",
    description: "Investment Dividend",
    date: "2024-01-10",
    amount: 250.0,
    type: "income",
    category: "Investment",
  },
  {
    id: "7",
    description: "Gas Station",
    date: "2024-01-09",
    amount: 45.8,
    type: "expense",
    category: "Transportation",
  },
  {
    id: "8",
    description: "Online Course",
    date: "2024-01-08",
    amount: 99.99,
    type: "expense",
    category: "Education",
  },
]

export default function DataTable({Transactions}) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">Track your income and expenses</p>
      </div>
      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>A list of your recent financial transactions</CardDescription>
          <CardAction>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Export
              </Button>
              <AddTransactionForm/>
            </div>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      {transaction.type === "income" ? (
                        <ArrowDownLeft className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-red-600" />
                      )}
                      <span>{transaction.description}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(transaction.date)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{transaction.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={transaction.type === "income" ? "secondary" : "secondary"}
                      className={transaction.type === "income" ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-red-100 text-red-800 hover:bg-red-200"}
                    >
                      {transaction.type === "income" ? "Income" : "Expense"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

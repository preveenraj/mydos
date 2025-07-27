"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Calendar as CalendarIcon, X } from "lucide-react";
import { format, addDays } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Todo } from "./todo-list";

type AddTodoProps = {
  addTodo: (todo: Omit<Todo, "id" | "completed">) => void;
};

export function AddTodo({ addTodo }: AddTodoProps) {
  const [text, setText] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleAdd = () => {
    if (text.trim() === "") return;
    addTodo({
      text,
      date: format(date || new Date(), "yyyy-MM-dd"),
    });
    setText("");
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button onClick={handleAdd}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}

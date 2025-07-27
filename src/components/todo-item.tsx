"use client";

import { motion } from "framer-motion";
import { Trash } from "lucide-react";
import { Todo } from "./todo-list";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

type TodoItemProps = {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};

export function TodoItem({ todo, toggleTodo, deleteTodo }: TodoItemProps) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center gap-4 p-2 rounded-lg"
    >
      <Checkbox
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onCheckedChange={() => toggleTodo(todo.id)}
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={`flex-1 text-lg ${
          todo.completed ? "line-through text-muted-foreground" : ""
        }`}
      >
        {todo.text}
      </label>
      <Button variant="ghost" size="icon" onClick={() => deleteTodo(todo.id)}>
        <Trash className="h-4 w-4 text-muted-foreground" />
      </Button>
    </motion.li>
  );
}

"use client";

import { useState } from "react";
import useLocalStorage from "@/hooks/use-local-storage";
import { AnimatePresence, motion } from "framer-motion";
import { format, addDays } from "date-fns";

import { AddTodo } from "./add-todo";
import { TodoItem } from "./todo-item";
import { Button } from "./ui/button";
import { useSound } from "@/hooks/use-sound";
import { triggerHapticFeedback } from "@/lib/haptics";
import { addTodoSound, completeTodoSound, deleteTodoSound } from "@/lib/sounds";
import { toast } from "sonner";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  date: string;
};

export function TodoList() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [filter, setFilter] = useState("today");

  const playAddSound = useSound(addTodoSound);
  const playCompleteSound = useSound(completeTodoSound);
  const playDeleteSound = useSound(deleteTodoSound);

  const handleAddTodo = (todo: Omit<Todo, "id" | "completed">) => {
    playAddSound();
    triggerHapticFeedback("light");
    setTodos((prev) => [
      ...prev,
      {
        ...todo,
        id: crypto.randomUUID(),
        completed: false,
      },
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          if (!todo.completed) {
            playCompleteSound();
            triggerHapticFeedback("success");
            toast.success("Task completed!");
          }
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      }),
    );
  };

  const deleteTodo = (id: string) => {
    playDeleteSound();
    triggerHapticFeedback("heavy");
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    const today = format(new Date(), "yyyy-MM-dd");
    const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");
    if (filter === "today") return todo.date === today;
    if (filter === "tomorrow") return todo.date === tomorrow;
    return true;
  });

  return (
    <div className="w-full max-w-md">
      <AddTodo addTodo={handleAddTodo} />
      <div className="mt-4 flex justify-center gap-2">
        <Button
          variant={filter === "today" ? "default" : "outline"}
          onClick={() => setFilter("today")}
        >
          Today
        </Button>
        <Button
          variant={filter === "tomorrow" ? "default" : "outline"}
          onClick={() => setFilter("tomorrow")}
        >
          Tomorrow
        </Button>
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
      </div>
      <motion.ul className="mt-6 space-y-2">
        <AnimatePresence>
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}

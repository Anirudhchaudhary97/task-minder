"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface Task {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  userName: string;
}

interface User {
  id: number;
  userName: string;
}

interface TaskContextType {
  tasks: Task[];
  createTask: (newTask: NewTask) => void;
  updateTask: (id: number, updatedTask: Partial<Task>) => void;
  deleteTask: (id: number) => void;
  users: User[];
}

interface NewTask {
  title: string;
  userId: number;
  completed: boolean;
  userName: string;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export default function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchTasksAndUsers = async () => {
      const todosResponse = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const usersResponse = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const todos = await todosResponse.json();
      const users = await usersResponse.json();

      // Extracting only id and name for each user
      const userNames: User[] = users.map((user: any) => ({
        id: user.id,
        userName: user.name,
      }));

      setUsers(userNames);

      // Combined userId and task for task card component.
      const mergedTasks: Task[] = todos.map((todo: any) => {
        const user = userNames.find((user) => user.id === todo.userId);
        return {
          ...todo,
          userName: user ? user.userName : "Unknown User",
        };
      });

      setTasks(mergedTasks);
    };

    fetchTasksAndUsers();
  }, []);

  // Add task
  const createTask = (newTask: NewTask) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        ...newTask,
        id: prevTasks.length + 1,
      },
    ]);
  };

  // Update task
  const updateTask = (id: number, updatedTask: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, createTask, updateTask, deleteTask, users }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTask = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};

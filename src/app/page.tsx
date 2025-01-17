'use client';
import { TaskDialog } from '@/components/TaskDialog';
import { ClipboardList } from 'lucide-react';
import Task from "../types/task"
import { useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleCreateTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    const task: Task = {
      ...newTask,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, task]);
  };
  console.log(tasks)
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <ClipboardList className="h-8 w-8 text-yellow-500" />
          <h1 className="text-3xl font-bold">Team Task Manager</h1>
        </div>
        <p className="text-muted-foreground mb-6">
          Collaborate with your team by managing tasks efficiently
        </p>
        <TaskDialog onSave={handleCreateTask} />
     
      </div>

      
    </main>
  );
}
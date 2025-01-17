"use client";

import { useState } from "react";
import { useTask } from "../../context/TaskContext";

export default function TaskList() {
  const { tasks, users, createTask, updateTask, deleteTask } = useTask();
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedAssignedTo, setEditedAssignedTo] = useState<string>("");
  //   console.log(users);

  const handleEdit = (
    taskId: number,
    currentTitle: string,
    currentAssignedTo: string
  ) => {
    setEditingTaskId(taskId);
    setEditedTitle(currentTitle);
    setEditedAssignedTo(currentAssignedTo);
  };

  const handleSave = (taskId: number) => {
    updateTask(taskId, { title: editedTitle, userName: editedAssignedTo });
    setEditingTaskId(null);
    setEditedTitle("");
    setEditedAssignedTo("");
  };

  const handleCancel = () => {
    setEditingTaskId(null);
    setEditedTitle("");
    setEditedAssignedTo("");
  };

  return (
    <div className="overflow-auto p-6">
      {/* Header Section */}
      <h1 className="text-2xl font-semibold mb-4">Tasks</h1>
      {/* Add Task Button Section */}
      <button
        onClick={() =>
          //
          // Pass the values from the addTask modal.
          //
          createTask({
            title: "New Task",
            userId: 1,
            completed: false,
            userName: "New user",
          })
        }
        className="mt-4 p-2 rounded-md"
      >
        Add Task
      </button>

      {/* Task List Section */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 rounded-lg shadow-md">
            {/* Edit Mode Section */}
            {editingTaskId === task.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="text"
                  value={editedAssignedTo}
                  onChange={(e) => setEditedAssignedTo(e.target.value)}
                  placeholder="Assigned to"
                  className="w-full p-2 border rounded-md"
                />
                <div className="space-x-2">
                  <button
                    onClick={() => handleSave(task.id)}
                    className="p-2 rounded-md"
                  >
                    Save
                  </button>
                  <button onClick={handleCancel} className="p-2 rounded-md">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* View Mode Section */
              <>
                <h3 className="text-xl font-bold">{task.title}</h3>
                <p className="text-sm">User: {task.userName}</p>
                <p className="text-sm">Assigned To: {task.userName}</p>
                <p className="text-sm">
                  Status: {task.completed ? "Completed" : "Incomplete"}
                </p>
                <div className="space-x-2">
                  {/* Action Buttons Section */}
                  <button
                    onClick={() =>
                      updateTask(task.id, { completed: !task.completed })
                    }
                    className="p-2 rounded-md"
                  >
                    {task.completed ? "Mark Incomplete" : "Mark Complete"}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 rounded-md"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      handleEdit(task.id, task.title, task.userName)
                    }
                    className="p-2 rounded-md"
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { KanbanColumn } from "@/app/(private)/(home)/(kanban-components)/kanban-column";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Column, Task } from "@/lib/interfaces/kanban";

// Sample data
const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    color: "bg-slate-500",
    tasks: [
      {
        id: "1",
        title: "Design new landing page",
        description:
          "Create wireframes and mockups for the new product landing page",
        priority: "high",
        assignee: "John Doe",
        dueDate: "2024-01-15",
        tags: ["design", "frontend"],
      },
      {
        id: "2",
        title: "Set up CI/CD pipeline",
        description: "Configure automated testing and deployment",
        priority: "medium",
        assignee: "Jane Smith",
        dueDate: "2024-01-20",
        tags: ["devops", "automation"],
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "bg-blue-500",
    tasks: [
      {
        id: "3",
        title: "Implement user authentication",
        description: "Add login, signup, and password reset functionality",
        priority: "high",
        assignee: "Mike Johnson",
        dueDate: "2024-01-18",
        tags: ["backend", "security"],
      },
    ],
  },
  {
    id: "review",
    title: "In Review",
    color: "bg-yellow-500",
    tasks: [
      {
        id: "4",
        title: "Update documentation",
        description: "Review and update API documentation",
        priority: "low",
        assignee: "Sarah Wilson",
        dueDate: "2024-01-12",
        tags: ["documentation"],
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "bg-green-500",
    tasks: [
      {
        id: "5",
        title: "Fix mobile responsive issues",
        description: "Resolved layout problems on mobile devices",
        priority: "medium",
        assignee: "Alex Brown",
        tags: ["frontend", "mobile"],
      },
    ],
  },
];

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [searchTerm, setSearchTerm] = useState("");

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleAddTask = (columnId: string, taskData: Omit<Task, "id">) => {
    const newTask: Task = {
      ...taskData,
      id: generateId(),
    };

    setColumns((prev) =>
      prev.map((column) =>
        column.id === columnId
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      )
    );
  };

  const handleMoveTask = (
    taskId: string,
    fromColumnId: string,
    toColumnId: string
  ) => {
    setColumns((prev) => {
      const newColumns = [...prev];

      // Find the task to move
      const fromColumn = newColumns.find((col) => col.id === fromColumnId);
      const toColumn = newColumns.find((col) => col.id === toColumnId);
      const taskToMove = fromColumn?.tasks.find((task) => task.id === taskId);

      if (!fromColumn || !toColumn || !taskToMove) return prev;

      // Remove task from source column
      fromColumn.tasks = fromColumn.tasks.filter((task) => task.id !== taskId);

      // Add task to destination column
      toColumn.tasks.push(taskToMove);

      return newColumns;
    });
  };

  const filteredColumns = columns.map((column) => ({
    ...column,
    tasks: column.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignee?.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">Task Management</h1>
              <p className="text-muted-foreground">
                Organize and track your team&apos;s work
              </p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>

          {/* Search and filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredColumns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              onAddTask={handleAddTask}
              onMoveTask={handleMoveTask}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          {columns.map((column) => (
            <div key={column.id} className="bg-card rounded-lg p-4 border">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${column.color}`} />
                <span className="font-medium text-sm">{column.title}</span>
              </div>
              <div className="text-2xl font-bold">{column.tasks.length}</div>
              <div className="text-xs text-muted-foreground">
                {column.tasks.filter((task) => task.priority === "high").length}{" "}
                high priority
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

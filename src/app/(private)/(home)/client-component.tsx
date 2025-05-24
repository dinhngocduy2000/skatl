"use client";

import { useState } from "react";
import { Column } from "@/lib/interfaces/kanban";
import KanbanHeaderComponent from "./(kanban-components)/(kanban-header)";
import KanbanListComponent from "./(kanban-components)/(kanban-list)";
import KanbanStatsComponent from "./(kanban-components)/(kanban-stats)";

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
    <div className="h-full bg-background p-6 max-w-7xl mx-auto flex flex-col">
      {/* Header */}
      <KanbanHeaderComponent
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Kanban Board */}
      <KanbanListComponent
        filteredColumns={filteredColumns}
        setColumns={setColumns}
      />

      {/* Stats */}
      <KanbanStatsComponent columns={columns} />
    </div>
  );
}

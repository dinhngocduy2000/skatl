"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TaskCard } from "./task-card";
import { AddTaskDialog } from "./add-task-dialog";
import { Column, Task } from "@/lib/interfaces/kanban";

interface KanbanColumnProps {
  column: Column;
  onAddTask: (columnId: string, task: Omit<Task, "id">) => void;
  onMoveTask: (
    taskId: string,
    fromColumnId: string,
    toColumnId: string
  ) => void;
}

export function KanbanColumn({
  column,
  onAddTask,
  onMoveTask,
}: KanbanColumnProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const taskId = e.dataTransfer.getData("text/plain");
    const fromColumnId = findTaskColumn(taskId);

    if (fromColumnId && fromColumnId !== column.id) {
      onMoveTask(taskId, fromColumnId, column.id);
    }
  };

  const findTaskColumn = (taskId: string): string | null => {
    console.log("findTaskColumn", taskId);
    // This would typically come from a parent component or context
    // For now, we'll assume it's handled by the parent
    return null;
  };

  return (
    <Card className="flex flex-col h-full min-h-[500px]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${column.color}`} />
            <CardTitle className="text-sm font-medium">
              {column.title}
            </CardTitle>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {column.tasks.length}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAddDialogOpen(true)}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent
        className={`gutter-container flex-1 space-y-3 pr-3 transition-colors h-full overflow-hidden hover:overflow-auto ${
          isDragOver ? "bg-muted/50" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}

        {column.tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="text-muted-foreground text-sm">No tasks yet</div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAddDialogOpen(true)}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add task
            </Button>
          </div>
        )}
      </CardContent>

      <AddTaskDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddTask={(task) => onAddTask(column.id, task)}
      />
    </Card>
  );
}

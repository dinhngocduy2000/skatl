import { Column } from "@/lib/interfaces/kanban";
import React from "react";

type Props = {
  columns: Column[];
};

const KanbanStatsComponent = ({ columns }: Props) => {
  return (
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
  );
};

export default KanbanStatsComponent;

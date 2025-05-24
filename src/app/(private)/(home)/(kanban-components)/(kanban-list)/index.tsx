import { Column, Task } from "@/lib/interfaces/kanban";
import React, { Dispatch, SetStateAction } from "react";
import { KanbanColumn } from "./kanban-column";

type Props = {
  filteredColumns: Column[];
  setColumns: Dispatch<SetStateAction<Column[]>>;
};

const KanbanListComponent = ({ filteredColumns, setColumns }: Props) => {
  const generateId = () => Math.random().toString(36).substr(2, 9);
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-auto min-h-[500px] sm:min-h-0 h-full flex-1">
      {filteredColumns.map((column) => (
        <KanbanColumn
          key={column.id}
          column={column}
          onAddTask={handleAddTask}
          onMoveTask={handleMoveTask}
        />
      ))}
    </div>
  );
};

export default KanbanListComponent;

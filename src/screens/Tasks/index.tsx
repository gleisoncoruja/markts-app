import React, { useState, useEffect } from "react";
import { MainContainer } from "../../components/Container";
import { MainTitle } from "../../components/Title";
import { TasksContent } from "./components/TasksContent";
import { TaskCard } from "./components/TaskCard";
import { ITask } from "../../interfaces/Tasks";
import { dbQuery } from "../../db";

export const TasksScreen: React.FC = () => {
  const [tasksData, setTasksData] = useState<ITask[]>([]);

  const getTasks = async () => {
    try {
      const data = await dbQuery.getTasksByPeriod("today");
      setTasksData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <MainContainer>
      <MainTitle>Tarefas</MainTitle>
      <TasksContent>
        <TaskCard tasksData={tasksData} />
      </TasksContent>
    </MainContainer>
  );
};

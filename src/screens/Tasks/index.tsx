import React, { useState, useEffect } from "react";
import { MainContainer } from "../../components/Container";
import { MainTitle } from "../../components/Title";
import { TasksContent } from "./components/TasksContent";
import { TaskCard } from "./components/TaskCard";
import { ITask } from "../../interfaces/Tasks";
import { dbService } from "../../db";
import { AddButton } from "./components/AddButton";
import { Modal } from "../../components/Modal";
import { CreateTask } from "./components/ModalBody/CreateTask";

export const TasksScreen: React.FC = () => {
  const [tasksData, setTasksData] = useState<ITask[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const getTasks = async () => {
    try {
      const data = await dbService.getTasks();
      setTasksData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <MainContainer>
      <MainTitle>Tarefas</MainTitle>
      <TasksContent>
        <TaskCard tasksData={tasksData} onPress={handleModal} />
      </TasksContent>
      <AddButton onPress={handleModal} />
      <Modal modalVisible={modalVisible} onRequestClose={handleModal}>
        <CreateTask />
      </Modal>
    </MainContainer>
  );
};

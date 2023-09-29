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
import { EditTask } from "./components/ModalBody/EditTask.tsx";
import Toast from "react-native-toast-message";

export const TasksScreen: React.FC = () => {
  const [tasksData, setTasksData] = useState<ITask[]>([]);
  const [taskDetailData, setTaskDetailData] = useState<ITask>();
  const [modalCreateVisible, setModalCreateVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getTasks = async () => {
    try {
      const data = await dbService.getTasks();
      setTasksData(data);
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao buscar tarefas",
      });
    } finally {
      setRefreshing(false);
    }
  };

  const handleCreateModal = () => {
    setModalCreateVisible(!modalCreateVisible);
  };

  const handleShowEditModal = (taskId: number) => {
    const taskDetail = tasksData.find(({ id }) => id === taskId);
    setTaskDetailData(taskDetail);
    setModalEditVisible(true);
  };

  const handleHideEditModal = () => {
    setTaskDetailData(undefined);
    setModalEditVisible(false);
  };

  const reloadData = () => {
    getTasks();
    setModalCreateVisible(false);
    setModalEditVisible(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <MainContainer>
      <MainTitle>Tarefas</MainTitle>
      <TasksContent>
        <TaskCard
          tasksData={tasksData}
          onPress={handleShowEditModal}
          handleRefresh={handleRefresh}
          refreshing={refreshing}
        />
      </TasksContent>
      <AddButton onPress={handleCreateModal} />
      <Modal
        modalVisible={modalCreateVisible}
        onRequestClose={handleCreateModal}
      >
        <CreateTask reloadData={reloadData} />
      </Modal>
      <Modal
        modalVisible={modalEditVisible}
        onRequestClose={handleHideEditModal}
      >
        <EditTask reloadData={reloadData} taskData={taskDetailData} />
      </Modal>
    </MainContainer>
  );
};

import React from "react";
import styled from "styled-components/native";
import { ITask } from "../../../../interfaces/Tasks";
import { View, Text, FlatList } from "react-native";

interface ITaskCardProps {
  tasksData: ITask[];
}

interface ICardProps {
  task: ITask;
}

const StyledCardContent = styled.View`
  flex: 1;
  border-radius: 16px;
  background-color: #fff;
  padding: 16px;
  margin: 0px 16px 16px 16px;
`;

const Card: React.FC<ICardProps> = ({ task }) => (
  <StyledCardContent>
    <Text>{task.title}</Text>
  </StyledCardContent>
);

export const TaskCard: React.FC<ITaskCardProps> = ({ tasksData }) => {
  return (
    <FlatList
      data={tasksData}
      renderItem={({ item }) => <Card task={item} />}
      keyExtractor={(task) => String(task.id)}
    />
  );
};

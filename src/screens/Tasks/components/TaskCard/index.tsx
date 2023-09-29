import React from "react";
import styled from "styled-components/native";
import { ITask } from "../../../../interfaces/Tasks";
import { TouchableOpacityProps, RefreshControl, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FeatherIcons from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface IStyledCardContent extends TouchableOpacityProps {
  isComplete: boolean;
}
interface ITaskCardProps {
  tasksData: ITask[];
  onPress: (taskId: number) => void;
  handleRefresh: () => void;
  refreshing: boolean;
}

interface ICardProps {
  task: ITask;
  onPress: (taskId: number) => void;
}

const StyledCardContent: React.FC<IStyledCardContent> = styled.TouchableOpacity`
  flex-direction: row;
  border-radius: 16px;
  background-color: ${({ isComplete }) =>
    isComplete ? "rgba(64, 105, 53,0.7)" : "rgba(182, 0, 24, 0.7)"};
  padding: 16px;
  margin: 0px 16px 16px 16px;
  gap: 8px;
`;

const DateTimeContent = styled.View`
  gap: 2px;
  align-items: center;
  justify-content: center;
`;

const DateTimeText = styled.Text`
  font-family: "JostMedium";
  font-size: 10px;
  color: #fff;
`;

const InfoContent = styled.View`
  flex: 1;
  gap: 2px;
`;

const InfoTitleText = styled.Text`
  font-family: "JostSemiBold";
  font-size: 16px;
  color: #fff;
`;

const InfoDescriptionText = styled.Text`
  font-family: "JostMedium";
  font-size: 14px;
  color: #fff;
  max-width: 200px;
`;

const InfoStatusText = styled.Text`
  font-family: "JostMedium";
  font-size: 14px;
  color: #fff;
  max-width: 200px;
`;

const IconContent = styled.View`
  align-items: center;
  justify-content: center;
`;

const Card: React.FC<ICardProps> = ({ task, onPress }) => {
  const date = new Date(task.date).toLocaleDateString();
  const isComplete = !!task.isComplete;
  const status = isComplete ? "Completa" : "Pendente";

  const categoryIcon = {
    school: <Ionicons name="school" size={32} color={"white"} />,
    work: <Ionicons name="briefcase-sharp" size={32} color={"white"} />,
    shop: <FeatherIcons name="shopping-cart" size={32} color={"white"} />,
    reading: <MaterialIcons name="menu-book" size={32} color={"white"} />,
    workOut: <MaterialIcons name="directions-run" size={32} color={"white"} />,
    others: <MaterialIcons name="devices-other" size={32} color={"white"} />,
  }[task.category];

  return (
    <StyledCardContent
      isComplete={isComplete}
      onPress={() => onPress(task.id!)}
    >
      <DateTimeContent>
        <DateTimeText>{date}</DateTimeText>
        <DateTimeText>{task.timeFrom}</DateTimeText>
        <DateTimeText>{task.timeTo}</DateTimeText>
      </DateTimeContent>
      <InfoContent>
        <InfoTitleText>{task.title}</InfoTitleText>
        <InfoDescriptionText numberOfLines={1} ellipsizeMode="tail">
          {task.description}
        </InfoDescriptionText>
        <InfoStatusText>Status: {status}</InfoStatusText>
      </InfoContent>
      <IconContent>{categoryIcon}</IconContent>
    </StyledCardContent>
  );
};

export const TaskCard: React.FC<ITaskCardProps> = ({
  tasksData,
  onPress,
  handleRefresh,
  refreshing,
}) => {
  return (
    <FlatList
      data={tasksData}
      renderItem={({ item }) => <Card task={item} onPress={onPress} />}
      keyExtractor={(task) => String(task.id)}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );
};

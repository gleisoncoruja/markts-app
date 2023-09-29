import styled from "styled-components/native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import FeatherIcons from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacityProps } from "react-native";
import { ITask } from "../../../../interfaces/Tasks";
import { useNavigation } from "@react-navigation/native";
interface StyledCardViewProps extends TouchableOpacityProps {
  backgroundColor?: string;
}

interface ICardsProps {
  tasksData: ITask[];
}

const StyledContentView = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
  align-items: center;
`;

const StyledCardView: React.FC<StyledCardViewProps> = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  border-radius: 16px;
  background-color: ${({ backgroundColor }) => backgroundColor || `#FFF`};
  padding: 8px;
`;

const StyledQtyText = styled.Text`
  font-family: "JostRegular";
  font-size: 16px;
  color: #fff;
  text-align: right;
`;

const StyledTitleText = styled.Text`
  font-family: "JostMedium";
  font-size: 16px;
  color: #fff;
  text-align: center;
`;

export const Cards: React.FC<ICardsProps> = ({ tasksData }) => {
  const navigation = useNavigation();
  const categoryCounts: { [category: string]: number } = {
    school: 0,
    work: 0,
    shop: 0,
    reading: 0,
    workOut: 0,
    others: 0,
  };

  tasksData.forEach((task) => {
    const category = task.category;
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  const handleNavigate = () => {
    navigation.navigate("PendingList" as never);
  };

  return (
    <StyledContentView>
      <StyledCardView backgroundColor={"#2A8899"} onPress={handleNavigate}>
        <StyledQtyText>{categoryCounts.school}</StyledQtyText>
        <Ionicons
          name="school"
          size={32}
          color={"white"}
          style={{ alignSelf: "center" }}
        />
        <StyledTitleText>Estudos</StyledTitleText>
      </StyledCardView>

      <StyledCardView backgroundColor={"#5EB0D2"} onPress={handleNavigate}>
        <StyledQtyText>{categoryCounts.work}</StyledQtyText>
        <Ionicons
          name="briefcase-sharp"
          size={32}
          color={"white"}
          style={{ alignSelf: "center" }}
        />
        <StyledTitleText>Trabalho</StyledTitleText>
      </StyledCardView>

      <StyledCardView backgroundColor={"#BE8972"} onPress={handleNavigate}>
        <StyledQtyText>{categoryCounts.shop}</StyledQtyText>
        <FeatherIcons
          name="shopping-cart"
          size={32}
          color={"white"}
          style={{ alignSelf: "center" }}
        />
        <StyledTitleText>Compras</StyledTitleText>
      </StyledCardView>

      <StyledCardView backgroundColor={"#646FD4"} onPress={handleNavigate}>
        <StyledQtyText>{categoryCounts.reading}</StyledQtyText>
        <MaterialIcons
          name="menu-book"
          size={32}
          color={"white"}
          style={{ alignSelf: "center" }}
        />
        <StyledTitleText>Leitura</StyledTitleText>
      </StyledCardView>

      <StyledCardView backgroundColor={"#83BC74"} onPress={handleNavigate}>
        <StyledQtyText>{categoryCounts.workOut}</StyledQtyText>
        <MaterialIcons
          name="directions-run"
          size={32}
          color={"white"}
          style={{ alignSelf: "center" }}
        />
        <StyledTitleText>Treino</StyledTitleText>
      </StyledCardView>

      <StyledCardView backgroundColor={"#6a6d86"} onPress={handleNavigate}>
        <StyledQtyText>{categoryCounts.others}</StyledQtyText>
        <MaterialIcons
          name="devices-other"
          size={32}
          color={"white"}
          style={{ alignSelf: "center" }}
        />
        <StyledTitleText>Outros</StyledTitleText>
      </StyledCardView>
    </StyledContentView>
  );
};

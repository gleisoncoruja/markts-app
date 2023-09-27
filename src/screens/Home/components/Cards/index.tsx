import styled from "styled-components/native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import FeatherIcons from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ViewProps, View } from "react-native";

interface StyledCardViewProps extends ViewProps {
  backgroundColor?: string;
}

const StyledContentView = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
  align-items: center;
`;

const StyledCardView: React.FC<StyledCardViewProps> = styled.View`
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

export const Cards: React.FC = () => {
  return (
    <StyledContentView>
      <StyledCardView backgroundColor={"#2A8899"}>
        <StyledQtyText>5</StyledQtyText>
        <Ionicons
          name="school"
          size={32}
          color={"white"}
          style={{ alignSelf: "center" }}
        />
        <StyledTitleText>Estudos</StyledTitleText>
      </StyledCardView>

      <StyledCardView backgroundColor={"#5EB0D2"}>
        <StyledQtyText>5</StyledQtyText>
        <Ionicons
          name="briefcase-sharp"
          size={32}
          color={"white"}
          style={{ alignSelf: "center" }}
        />
        <StyledTitleText>Trabalho</StyledTitleText>
      </StyledCardView>

      <StyledCardView backgroundColor={"#BE8972"}>
        <StyledQtyText>5</StyledQtyText>
        <FeatherIcons
          name="shopping-cart"
          size={32}
          color={"white"}
          style={{ alignSelf: "center" }}
        />
        <StyledTitleText>Compras</StyledTitleText>
      </StyledCardView>

      <StyledCardView backgroundColor={"#646FD4"}>
        <StyledQtyText>5</StyledQtyText>
        <MaterialIcons
          name="menu-book"
          size={32}
          color={"white"}
          style={{ alignSelf: "center" }}
        />
        <StyledTitleText>Leitura</StyledTitleText>
      </StyledCardView>

      <StyledCardView backgroundColor={"#83BC74"}>
        <StyledQtyText>5</StyledQtyText>
        <MaterialIcons
          name="directions-run"
          size={32}
          color={"white"}
          style={{ alignSelf: "center" }}
        />
        <StyledTitleText>Treino</StyledTitleText>
      </StyledCardView>

      <StyledCardView backgroundColor={"#6a6d86"}>
        <StyledQtyText>5</StyledQtyText>
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

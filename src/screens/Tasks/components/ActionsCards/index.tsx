import styled from "styled-components/native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacityProps } from "react-native";

interface IActionCardsProps {
  handleOpenDateChange: () => void;
  handleOpenTimeFromChange: () => void;
  handleOpenTimeToChange: () => void;
  date: string;
  timeFrom: string;
  timeTo: string;
}

interface StyledCardViewProps extends TouchableOpacityProps {
  backgroundColor?: string;
}
const StyledContentView = styled.View`
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
  justify-content: space-between;
`;

const StyledTitleText = styled.Text`
  font-family: "JostRegular";
  font-size: 12px;
  color: #fff;
  text-align: center;
`;

const StyledValueText = styled.Text`
  font-family: "JostMedium";
  font-size: 12px;
  color: #fff;
  text-align: center;
`;

export const ActionCards: React.FC<IActionCardsProps> = ({
  handleOpenDateChange,
  handleOpenTimeFromChange,
  handleOpenTimeToChange,
  date,
  timeFrom,
  timeTo,
}) => {
  return (
    <StyledContentView>
      <StyledCardView
        backgroundColor={"#2A8899"}
        onPress={handleOpenDateChange}
      >
        <StyledTitleText>Data</StyledTitleText>
        <MaterialCommunityIcons
          name="calendar-month-outline"
          size={36}
          color={"white"}
          style={{ alignSelf: "center" }}
        />
        <StyledValueText>{date}</StyledValueText>
      </StyledCardView>

      <StyledCardView
        backgroundColor={"#5EB0D2"}
        onPress={handleOpenTimeFromChange}
      >
        <StyledTitleText>Horário Inicio</StyledTitleText>
        <MaterialCommunityIcons
          name="clock-time-eight-outline"
          size={36}
          color={"white"}
          style={{ alignSelf: "center" }}
        />
        <StyledValueText>{timeFrom}</StyledValueText>
      </StyledCardView>

      <StyledCardView
        backgroundColor={"#BE8972"}
        onPress={handleOpenTimeToChange}
      >
        <StyledTitleText>Horário Fim</StyledTitleText>

        <MaterialCommunityIcons
          name="clock-time-five-outline"
          size={36}
          color={"white"}
          style={{ alignSelf: "center" }}
        />
        <StyledValueText>{timeTo}</StyledValueText>
      </StyledCardView>
    </StyledContentView>
  );
};

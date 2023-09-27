import styled from "styled-components/native";
import React from "react";
import {
  ViewProps,
  TextProps,
  TouchableOpacityProps,
  TouchableOpacity,
} from "react-native";

interface FilterContentProps {
  selectedFilter: string;
  handlePress: (period: string) => void;
}

interface StyledTouchableOpacityProps extends TouchableOpacityProps {
  isSelected: boolean;
}

interface StyledTextProps extends TextProps {
  isSelected: boolean;
}

const StyledView = styled.View`
  flex-direction: row;
  margin: 42px 16px;
  padding: 8px;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
`;

const StyledTouchableOpacityView: React.FC<StyledTouchableOpacityProps> = styled.TouchableOpacity`
  flex: 1;
  border-radius: 14px;
  padding: 2px 16px;
  border: 1px;
  border-color: #646fd4;
  background-color: ${({ isSelected }) => (isSelected ? "#646fd4" : "#FFF")};
  align-items: center;
  justify-content: center;
`;

const StyledText: React.FC<StyledTextProps> = styled.Text`
  font-family: "JostRegular";
  color: ${({ isSelected }) => (!isSelected ? "#7d7d7d" : "#FFF")};
  font-size: 16px;
`;

export const FilterContent: React.FC<FilterContentProps> = ({
  selectedFilter,
  handlePress,
}) => {
  return (
    <StyledView>
      <StyledTouchableOpacityView
        isSelected={selectedFilter === "today"}
        onPress={() => handlePress("today")}
      >
        <StyledText isSelected={selectedFilter === "today"}>Hoje</StyledText>
      </StyledTouchableOpacityView>

      <StyledTouchableOpacityView
        isSelected={selectedFilter === "week"}
        onPress={() => handlePress("week")}
      >
        <StyledText isSelected={selectedFilter === "week"}>Semana</StyledText>
      </StyledTouchableOpacityView>

      <StyledTouchableOpacityView
        isSelected={selectedFilter === "month"}
        onPress={() => handlePress("month")}
      >
        <StyledText isSelected={selectedFilter === "month"}>Mês</StyledText>
      </StyledTouchableOpacityView>
    </StyledView>
  );
};

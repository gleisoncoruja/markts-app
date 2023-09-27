import styled from "styled-components/native";
import React from "react";

const StyledView = styled.View`
  flex-direction: row;
  margin: 42px 16px;
  padding: 8px;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
`;

const StyledEllipseView = styled.View`
  flex: 1;
  border-radius: 14px;
  padding: 2px 16px;
  border: 1px;
  border-color: #646fd4;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-family: "JostRegular";
  color: #7d7d7d;
  font-size: 16px;
`;

export const FilterContent: React.FC = () => {
  return (
    <StyledView>
      <StyledEllipseView>
        <StyledText>Hoje</StyledText>
      </StyledEllipseView>
      <StyledEllipseView>
        <StyledText>Semana</StyledText>
      </StyledEllipseView>
      <StyledEllipseView>
        <StyledText>Mês</StyledText>
      </StyledEllipseView>
    </StyledView>
  );
};

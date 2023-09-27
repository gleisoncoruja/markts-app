import styled from "styled-components/native";
import React from "react";

type InfoTextProps = {
  taskQty: number;
  period: string;
};

const StyledInfoText = styled.Text`
  margin: 0;
  padding: 0;
  font-family: "JostSemiBold";
  font-size: 24px;
  color: #363636;
  text-align: center;
`;

const StyledTasksQtyText = styled.Text`
  margin: 0;
  padding: 0;
  font-family: "JostSemiBold";
  font-size: 24px;
  color: #fff;
  text-align: center;
`;

export const InfoText: React.FC<InfoTextProps> = ({ taskQty, period }) => {
  const textQty = taskQty !== 1 ? `${taskQty} tarefas` : `${taskQty} tarefa`;
  const periodText = {
    today: "hoje",
    week: "na semana",
    month: "no mês",
  }[period];
  return (
    <StyledInfoText>
      Você tem <StyledTasksQtyText>{textQty}</StyledTasksQtyText> {periodText}!
    </StyledInfoText>
  );
};

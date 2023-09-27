import styled from "styled-components/native";
import React from "react";

const StyledText = styled.Text`
  margin: 0;
  padding: 0;
  font-family: "JostMedium";
  font-size: 12px;
  color: #363636;
  text-align: center;
`;

export const DateTimeText = () => {
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return <StyledText>{formattedDate}</StyledText>;
};

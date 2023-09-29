import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";
import { MainContainer } from "../Container";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const BackDrop: React.FC = () => {
  return (
    <MainContainer>
      <Container>
        <ActivityIndicator size="large" color="#83BC74" />
      </Container>
    </MainContainer>
  );
};

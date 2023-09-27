import styled from "styled-components/native";
import React, { ReactNode } from "react";

const bgLeft = require("../../assets/background/ellipse2.png");
const bgRight = require("../../assets/background/ellipse3.png");

type ContainerProps = {
  children: ReactNode;
};

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  gap: 16px;
`;

const BackGroundLeft = styled.Image`
  position: absolute;
  height: 300px;
  width: 100%;
  left: -100px;
`;

const BackGroundRight = styled.Image`
  position: absolute;
  height: 350px;
  width: 100%;
  left: 70px;
`;

export const MainContainer: React.FC<ContainerProps> = ({ children }) => {
  return (
    <StyledSafeAreaView>
      <BackGroundLeft source={bgLeft} resizeMode="contain" />
      <BackGroundRight source={bgRight} resizeMode="contain" />
      {children}
    </StyledSafeAreaView>
  );
};

import styled from "styled-components/native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { TextInputProps } from "react-native";

const StyledView = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 17px 40px;
  background-color: #fff;
  border-radius: 12px;
  padding: 16px 8px;
  gap: 8px;
`;

const StyledInput = styled.TextInput`
  flex: 1;
  font-size: 18px;
  background-color: transparent;
`;

export const Search: React.FC<TextInputProps> = ({ placeholder, ...rest }) => {
  return (
    <StyledView>
      <Icon name="search" size={24} color="#888888" />
      <StyledInput placeholder={placeholder} {...rest} />
    </StyledView>
  );
};

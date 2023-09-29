import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface IFilterButtonProps {
  onPress: () => void;
}

const Content = styled.View`
  align-items: flex-end;
  padding-right: 16px;
`;

export const FilterButton: React.FC<IFilterButtonProps> = ({ onPress }) => {
  return (
    <Content>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name="filter" size={42} color={"white"} />
      </TouchableOpacity>
    </Content>
  );
};

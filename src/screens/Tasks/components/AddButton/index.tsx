import React from "react";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface IAddButtonProps {
  onPress: () => void;
}

const ButtonAddContent = styled.View`
  justify-content: center;
  align-items: center;
`;

const StyledButtonAdd = styled.TouchableOpacity`
  background-color: #646fd4;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const AddButton: React.FC<IAddButtonProps> = ({ onPress }) => {
  return (
    <ButtonAddContent>
      <StyledButtonAdd onPress={onPress} style={{ borderRadius: 50 }}>
        <Ionicons name="add" size={48} color={"white"} />
      </StyledButtonAdd>
    </ButtonAddContent>
  );
};

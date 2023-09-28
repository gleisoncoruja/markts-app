import React, { ReactNode } from "react";
import { ScrollView, Pressable, Modal as StyledModal } from "react-native";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface IModalProps {
  modalVisible: boolean;
  onRequestClose: () => void;
  children: ReactNode;
}

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

const ModalView = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 8px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

const CloseContent = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

export const Modal: React.FC<IModalProps> = ({
  modalVisible,
  onRequestClose,
  children,
}) => {
  return (
    <StyledModal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}
    >
      <CenteredView>
        <ModalView>
          <CloseContent>
            <Pressable onPress={onRequestClose}>
              <Ionicons name="close" size={36} color={"#353535"} />
            </Pressable>
          </CloseContent>
          {children}
        </ModalView>
      </CenteredView>
    </StyledModal>
  );
};

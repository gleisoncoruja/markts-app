import React, { useState } from "react";
import styled from "styled-components/native";
import { View, TextInput, Button, Platform, Text } from "react-native";
import { TextInput as PaperTextInput } from "react-native-paper";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";
import { ActionCards } from "../../ActionsCards";
import { Picker } from "@react-native-picker/picker";

interface Option {
  value: string;
  label: string;
}

const Container = styled.View`
  padding: 8px;
  gap: 16px;
  min-width: 300px;
`;

export const CreateTask: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [timeFrom, setTimeFrom] = useState(new Date());
  const [timeTo, setTimeTo] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimeFromPicker, setShowTimeFromPicker] = useState(false);
  const [showTimeToPicker, setShowTimeToPicker] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    "school"
  );

  const options = [
    { value: "school", label: "Estudos" },
    { value: "work", label: "Trabalho" },
    { value: "shop", label: "Compras" },
    { value: "reading", label: "Leitura" },
    { value: "workOut", label: "Treino" },
    { value: "others", label: "Outros" },
  ];
  const handlePickerChange = (itemValue: string | undefined) => {
    setSelectedOption(itemValue);
  };

  const handleSubmit = () => {
    // Faça algo com os valores dos campos, como enviar para um servidor
    console.log("Title:", title);
    console.log("Description:", description);
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (selectedDate) {
      const currentDate = selectedDate || date;
      setShowDatePicker(false); // Fecha o seletor após a seleção
      setDate(currentDate);
    } else {
      setShowDatePicker(false); // Fecha o seletor se o usuário cancelar
    }
  };

  const handleTimeFromChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (selectedDate) {
      const currentDate = selectedDate || date;
      setShowTimeFromPicker(false); // Fecha o seletor após a seleção
      setTimeFrom(currentDate);
    } else {
      setShowTimeFromPicker(false); // Fecha o seletor se o usuário cancelar
    }
  };

  const handleTimeToChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (selectedDate) {
      if (selectedDate < timeFrom) {
        Toast.show({
          type: "error",
          text1: "Horário de termino inválido",
          text2: "selecione um horário maior que o de início",
        });
        setShowTimeToPicker(false);
        return;
      }
      const currentDate = selectedDate || date;
      setShowTimeToPicker(false); // Fecha o seletor após a seleção
      setTimeTo(currentDate);
    } else {
      setShowTimeToPicker(false); // Fecha o seletor se o usuário cancelar
    }
  };

  return (
    <Container>
      <PaperTextInput
        label="Título"
        value={title}
        style={{
          backgroundColor: "#fff",
        }}
        onChangeText={(text) => setTitle(text)}
      />
      <ActionCards
        handleOpenDateChange={() => setShowDatePicker(true)}
        handleOpenTimeFromChange={() => setShowTimeFromPicker(true)}
        handleOpenTimeToChange={() => setShowTimeToPicker(true)}
        date={date.toLocaleDateString()}
        timeFrom={timeFrom.toLocaleTimeString()}
        timeTo={timeTo.toLocaleTimeString()}
      />

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
        />
      )}

      {showTimeFromPicker && (
        <DateTimePicker
          value={timeFrom}
          mode="time"
          display="spinner"
          onChange={handleTimeFromChange}
        />
      )}

      {showTimeToPicker && (
        <DateTimePicker
          value={timeTo}
          mode="time"
          display="spinner"
          onChange={handleTimeToChange}
        />
      )}

      <Text>Categoria:</Text>
      <Picker selectedValue={selectedOption} onValueChange={handlePickerChange}>
        <Picker.Item label="Selecione uma categoria" value={"school"} />
        {options.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>

      <PaperTextInput
        label="Descrição"
        value={description}
        multiline={true}
        numberOfLines={5}
        onChangeText={(text) => setDescription(text)}
      />
      <Button title="salvar" onPress={handleSubmit} />
    </Container>
  );
};

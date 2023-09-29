import React, { useState } from "react";
import styled from "styled-components/native";
import { Button, Text } from "react-native";
import { TextInput as PaperTextInput } from "react-native-paper";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";
import { ActionCards } from "../../ActionsCards";
import { Picker } from "@react-native-picker/picker";
import { dbService } from "../../../../../db";
import { ITask } from "../../../../../interfaces/Tasks";

interface IEditTaskProps {
  reloadData: () => void;
  taskData?: ITask;
}

const Container = styled.View`
  padding: 8px;
  gap: 16px;
  min-width: 300px;
`;

export const EditTask: React.FC<IEditTaskProps> = ({
  reloadData,
  taskData,
}) => {
  const [title, setTitle] = useState(taskData?.title || "");
  const [description, setDescription] = useState(taskData?.description || "");
  const [date, setDate] = useState(
    taskData?.date ? new Date(taskData.date) : new Date()
  );
  const [timeFrom, setTimeFrom] = useState(() => {
    const taskDate = new Date();
    const time = taskData?.timeFrom.split(":");
    const hour = Number(time?.[0]);
    const min = Number(time?.[1]);
    const sec = Number(time?.[2]);
    time && taskDate.setHours(hour, min, sec);
    return taskDate;
  });
  const [timeTo, setTimeTo] = useState(() => {
    const taskDate = new Date();
    const time = taskData?.timeTo.split(":");
    const hour = Number(time?.[0]);
    const min = Number(time?.[1]);
    const sec = Number(time?.[2]);
    time && taskDate.setHours(hour, min, sec);
    return taskDate;
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimeFromPicker, setShowTimeFromPicker] = useState(false);
  const [showTimeToPicker, setShowTimeToPicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    taskData?.category || "school"
  );

  const categories = [
    { value: "school", label: "Estudos" },
    { value: "work", label: "Trabalho" },
    { value: "shop", label: "Compras" },
    { value: "reading", label: "Leitura" },
    { value: "workOut", label: "Treino" },
    { value: "others", label: "Outros" },
  ];

  const handlePickerChange = (itemValue: string) => {
    setSelectedCategory(itemValue);
  };

  const handleSubmit = async (isComplete?: number) => {
    try {
      await dbService.updateTask({
        id: taskData?.id,
        title,
        description,
        category: selectedCategory,
        date: date.toISOString().split("T")[0],
        timeFrom: timeFrom.toLocaleTimeString(),
        timeTo: timeTo.toLocaleTimeString(),
        isComplete: isComplete || 0,
      });
      Toast.show({
        type: "success",
        text1: "Tarefa editada com sucesso!",
      });
      reloadData();
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao editar tarefa",
        text2: "Tente novamente mais tarde",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await dbService.deleteTask(taskData?.id!);
      Toast.show({
        type: "success",
        text1: "Tarefa excluída com sucesso!",
      });
      reloadData();
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao excluir tarefa",
        text2: "Tente novamente mais tarde",
      });
    }
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (selectedDate) {
      const currentDate = selectedDate || date;
      setShowDatePicker(false);
      setDate(currentDate);
    } else {
      setShowDatePicker(false);
    }
  };

  const handleTimeFromChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (selectedDate) {
      const currentDate = selectedDate || date;
      setShowTimeFromPicker(false);
      setTimeFrom(currentDate);
    } else {
      setShowTimeFromPicker(false);
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
      setShowTimeToPicker(false);
      setTimeTo(currentDate);
    } else {
      setShowTimeToPicker(false);
    }
  };

  const disableSaveButton = !title || !description || timeFrom > timeTo;

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
      <Picker
        selectedValue={selectedCategory}
        onValueChange={handlePickerChange}
      >
        <Picker.Item label="Selecione uma categoria" value={"school"} />
        {categories.map((option) => (
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

      {!taskData?.isComplete ? (
        <>
          <Button
            title="Concluir"
            onPress={() => handleSubmit(1)}
            disabled={disableSaveButton}
            color={"#83BC74"}
          />

          <Button title="Excluir" onPress={handleDelete} color={"#a10505"} />
          <Button
            title="Salvar Edição"
            onPress={() => handleSubmit(0)}
            disabled={disableSaveButton}
          />
        </>
      ) : null}
    </Container>
  );
};

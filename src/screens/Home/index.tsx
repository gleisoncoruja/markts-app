import React, { useEffect, useState } from "react";
import { MainContainer } from "../../components/Container";
import { MainTitle } from "../../components/Title";
import { HomeInfoContent } from "./components/InfoContent";
import { InfoText } from "./components/InfoText";
import { DateTimeText } from "./components/DateText";
import { FilterContent } from "./components/FilterContent";
import { Cards } from "./components/Cards";
import { dbService } from "../../db";
import { ITask } from "../../interfaces/Tasks";
import { RefreshControl, ScrollView } from "react-native";
import Toast from "react-native-toast-message";

export const HomeScreen = () => {
  const [tasksData, setTasksData] = useState<ITask[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("today");
  const [refreshing, setRefreshing] = useState(false);

  const getTasks = async () => {
    try {
      const data = await dbService.getTasksByPeriod(selectedFilter);
      setTasksData(data);
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao buscar tarefas",
      });
    } finally {
      setRefreshing(false);
    }
  };

  const handleFilterClick = (period: string) => {
    setSelectedFilter(period);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, [selectedFilter]);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <MainContainer>
        <MainTitle>Markts Tasks</MainTitle>
        <HomeInfoContent>
          <InfoText taskQty={tasksData.length} period={selectedFilter} />
          <DateTimeText />
        </HomeInfoContent>

        <FilterContent
          selectedFilter={selectedFilter}
          handlePress={handleFilterClick}
        />
        <Cards tasksData={tasksData} />
      </MainContainer>
    </ScrollView>
  );
};

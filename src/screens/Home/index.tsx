import React, { useEffect, useState } from "react";
import { MainContainer } from "../../components/Container";
import { Search } from "../../components/Search";
import { MainTitle } from "../../components/Title";
import { HomeInfoContent } from "./components/InfoContent";
import { InfoText } from "./components/InfoText";
import { DateTimeText } from "./components/DateText";
import { FilterContent } from "./components/FilterContent";
import { Cards } from "./components/Cards";
import { dbQuery } from "../../db";
import { ITask } from "../../interfaces/Tasks";

export const HomeScreen = () => {
  const [tasksData, setTasksData] = useState<ITask[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("today");

  const getTasks = async () => {
    try {
      const data = await dbQuery.getTasksByPeriod(selectedFilter);
      setTasksData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterClick = (period: string) => {
    setSelectedFilter(period);
  };

  useEffect(() => {
    getTasks();
  }, [selectedFilter]);
  return (
    <MainContainer>
      <MainTitle>Markts Tasks</MainTitle>
      <HomeInfoContent>
        <InfoText taskQty={tasksData.length} period={selectedFilter} />
        <DateTimeText />
      </HomeInfoContent>
      <Search placeholder="Procurar tarefa" />
      <FilterContent
        selectedFilter={selectedFilter}
        handlePress={handleFilterClick}
      />
      <Cards tasksData={tasksData} />
    </MainContainer>
  );
};

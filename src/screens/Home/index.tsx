import React from "react";
import { MainContainer } from "../../components/Container";
import { Search } from "../../components/Search";
import { MainTitle } from "../../components/Title";
import { HomeInfoContent } from "./components/InfoContent";
import { InfoText } from "./components/InfoText";
import { DateTimeText } from "./components/DateText";
import { FilterContent } from "./components/FilterContent";
import { Cards } from "./components/Cards";

export const HomeScreen = () => {
  return (
    <MainContainer>
      <MainTitle>Markts Tasks</MainTitle>
      <HomeInfoContent>
        <InfoText taskQty={0} />
        <DateTimeText />
      </HomeInfoContent>
      <Search placeholder="Procurar tarefa" />
      <FilterContent />
      <Cards />
    </MainContainer>
  );
};

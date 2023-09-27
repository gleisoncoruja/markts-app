import * as SQLite from "expo-sqlite";
import { ITask } from "../interfaces/Tasks";

export const db = SQLite.openDatabase("marktsTasks.db");

export const openDataBase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, date DATE, timeFrom TIME, timeTo TIME, category TEXT, isComplete INTEGER)"
    );
  });
};

const getTasksByPeriod = (period: string): Promise<ITask[]> => {
  return new Promise<ITask[]>((resolve, reject) => {
    const currentDate = new Date();
    let startDate, endDate;

    const formatWithLeadingZero = (value: number) => {
      return value < 10 ? `0${value}` : `${value}`;
    };

    if (period === "today") {
      const formattedCurrentDate = `${currentDate.getFullYear()}-${formatWithLeadingZero(
        currentDate.getMonth() + 1
      )}-${formatWithLeadingZero(currentDate.getDate())}`;
      startDate = formattedCurrentDate; // Data de hoje
      endDate = startDate; // Data de hoje
    } else if (period === "week") {
      // Calcula a data de início da semana (domingo) e o final da semana (sábado)
      const firstDayOfWeek = new Date(currentDate);
      firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const lastDayOfWeek = new Date(currentDate);
      lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

      const formattedFirstDayOfWeek = `${firstDayOfWeek.getFullYear()}-${formatWithLeadingZero(
        firstDayOfWeek.getMonth() + 1
      )}-${formatWithLeadingZero(firstDayOfWeek.getDate())}`;
      const formattedLastDayOfWeek = `${lastDayOfWeek.getFullYear()}-${formatWithLeadingZero(
        lastDayOfWeek.getMonth() + 1
      )}-${formatWithLeadingZero(lastDayOfWeek.getDate())}`;

      startDate = formattedFirstDayOfWeek;
      endDate = formattedLastDayOfWeek;
    } else if (period === "month") {
      // Calcula a data de início do mês e o final do mês
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );

      const formattedFirstDayOfMonth = `${firstDayOfMonth.getFullYear()}-${formatWithLeadingZero(
        firstDayOfMonth.getMonth() + 1
      )}-${formatWithLeadingZero(firstDayOfMonth.getDate())}`;
      const formattedLastDayOfMonth = `${lastDayOfMonth.getFullYear()}-${formatWithLeadingZero(
        lastDayOfMonth.getMonth() + 1
      )}-${formatWithLeadingZero(lastDayOfMonth.getDate())}`;

      startDate = formattedFirstDayOfMonth;
      endDate = formattedLastDayOfMonth;
    }

    if (startDate && endDate) {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "SELECT * FROM tasks WHERE isComplete = 0 AND date BETWEEN ? AND ?",
            [startDate!, endDate!],
            (_, { rows }) => {
              const tasks: ITask[] = rows._array; // Converte os resultados para o tipo ITask
              resolve(tasks); // Resolve a Promise com os dados
            }
          );
        },
        (error) => {
          // Lide com o erro e retorne false (ou qualquer outro valor) se necessário
          console.error("Erro ao executar a transação SQL:", error);
          return false;
        },
        () => {
          // Transação bem-sucedida
          return true; // Retorne true se necessário
        }
      );
    } else {
      reject("startDate ou endDate não definidos"); // Rejeita a Promise se startDate ou endDate estiverem indefinidos
    }
  });
};

const addTask = ({
  title,
  description,
  date,
  timeFrom,
  timeTo,
  category,
}: ITask): Promise<number> => {
  return new Promise<number>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO tasks (title, description, date, timeFrom, timeTo, category, isComplete) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [title, description, date, timeFrom, timeTo, category, 0],
          (_, result) => {
            const insertId = result.insertId as number; // Certifica-se de que insertId seja um número
            console.log(`Tarefa adicionada com ID: ${insertId}`);
            resolve(insertId); // Resolve a Promise com o ID da tarefa inserida
          },
          (_, error) => {
            console.error("Erro ao adicionar a tarefa: ", error);
            reject(error); // Rejeita a Promise com o erro
            return true;
          }
        );
      },
      (error) => {
        console.error("Erro na transação SQL: ", error);
        reject(error); // Rejeita a Promise com o erro da transação
      }
    );
  });
};

export const dbQuery = {
  getTasksByPeriod,
  addTask,
};

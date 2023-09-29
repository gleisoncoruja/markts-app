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
      startDate = formattedCurrentDate;
      endDate = startDate;
    } else if (period === "week") {
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
              const tasks: ITask[] = rows._array;
              resolve(tasks);
            }
          );
        },
        (error) => {
          console.error("Erro ao executar a transação SQL:", error);
          return false;
        },
        () => {
          return true;
        }
      );
    } else {
      reject("startDate ou endDate não definidos");
    }
  });
};

const getTasks = (): Promise<ITask[]> => {
  return new Promise<ITask[]>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT * FROM tasks ORDER BY isComplete ASC, date ASC",
          [],
          (_, { rows }) => {
            const tasks: ITask[] = rows._array;
            resolve(tasks);
          },
          (_, error) => {
            console.error("Erro ao executar a transação SQL:", error);
            reject(error);
            return false;
          }
        );
      },
      (error) => {
        console.error("Erro ao iniciar a transação SQL:", error);
        reject(error);
        return false;
      },
      () => {}
    );
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
            const insertId = result.insertId as number;
            resolve(insertId);
          },
          (_, error) => {
            console.error("Erro ao adicionar a tarefa: ", error);
            reject(error);
            return true;
          }
        );
      },
      (error) => {
        console.error("Erro na transação SQL: ", error);
        reject(error);
      }
    );
  });
};

const updateTask = ({
  id,
  title,
  description,
  date,
  timeFrom,
  timeTo,
  category,
  isComplete,
}: ITask): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "UPDATE tasks SET title = ?, description = ?, date = ?, timeFrom = ?, timeTo = ?, category = ?, isComplete = ? WHERE id = ?",
          [
            title,
            description,
            date,
            timeFrom,
            timeTo,
            category,
            isComplete!,
            id!,
          ],
          (_, result) => {
            resolve();
          },
          (_, error) => {
            console.error("Erro ao atualizar a tarefa: ", error);
            reject(error);
            return true;
          }
        );
      },
      (error) => {
        console.error("Erro na transação SQL: ", error);
        reject(error);
      }
    );
  });
};

const deleteTask = (taskId: number): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "DELETE FROM tasks WHERE id = ?",
          [taskId],
          (_, result) => {
            resolve();
          },
          (_, error) => {
            reject(error);
            return true;
          }
        );
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const dbService = {
  getTasksByPeriod,
  addTask,
  getTasks,
  updateTask,
  deleteTask,
};

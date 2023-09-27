export interface ITask {
  id?: number;
  title: string;
  description: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  category: string;
  isComplete?: number;
}

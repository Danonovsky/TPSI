import { Person } from "./person";

export interface Meeting {
    id: number;
    userId: number;
    person: Person;
    title: string;
    description: string;
    isDone: boolean;
    date: Date;
}
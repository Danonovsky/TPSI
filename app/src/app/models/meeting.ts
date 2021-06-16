import { Person } from "./person";

export interface Meeting {
    id: string;
    userId: string;
    person: Person;
    title: string;
    description: string;
    isDone: boolean;
    date: Date;
}
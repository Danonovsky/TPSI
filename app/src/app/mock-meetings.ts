import { Meeting } from './models/meeting';

export let meetings: Meeting[] = [
    {
        id: 1,
        userId: 1,
        person: { id: 1, name: 'Super person' },
        title: 'Title',
        description: 'Description',
        isDone: false,
        date: new Date(Date.now())
    },
    {
        id: 2,
        userId: 1,
        person: { id: 1, name: 'Super person' },
        title: 'Title',
        description: 'Description',
        isDone: true,
        date: new Date("2021-6-7")
    }
];
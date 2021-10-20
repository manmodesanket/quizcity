import { Quiz } from "./quiz.type";

export const allQuizzes: Array<Quiz> = [
  {
    id: "ebdd93a2-97a3-4ef5-b8db-0e50e2831977",
    title: "The Office",
    imageUrl:
      "https://www.themoviedb.org/t/p/original/vNpuAxGTl9HsUbHqam3E9CzqCvX.jpg",
    totalScore: 20,
    questions: [
      {
        id: "0200aa14-5d75-4a66-8b1b-85d516e504ce",
        question: "First Question?",
        points: 10,
        negativePoints: 5,
        options: [
          {
            id: "f098b3d8-0080-40d0-bb34-7be85310a06f",
            content: `Option 1`,
            isAnswer: false,
          },
          {
            id: "6550799e-232a-4d64-8a6d-22f5665e0409",
            content: `Option 2`,
            isAnswer: true,
          },
          {
            id: "9f4d88cf-6bf1-45d9-a75d-442f882310cd",
            content: `Option 3`,
            isAnswer: false,
          },
        ],
      },

      {
        id: "eadc854f-5d80-4f7b-a3f2-44f39deab200",
        question: "Second Question?",
        points: 10,
        negativePoints: 5,
        options: [
          {
            id: "30d6b3ac-09e4-4be8-b1c5-bdb3df7b4e58",
            content: `Option 1`,
            isAnswer: false,
          },
          {
            id: "cb5b38ca-8036-48e1-8ebd-58be67a11521",
            content: `Option 2`,
            isAnswer: false,
          },
          {
            id: "9f4d88cf-6bf1-45d9-a75d-442f882310cd",
            content: `Option 3`,
            isAnswer: true,
          },
        ],
      },
    ],
  },
  {
    id: "fffa23a7-4d8c-4f09-8a63-5e1bc63ee7ec",
    title: "Seinfeld",
    imageUrl:
      "https://www.themoviedb.org/t/p/original/yT25tKubPm2PGE8pbDUzWjroWNH.jpg",
    totalScore: 20,
    questions: [
      {
        id: "0200aa14-5d75-4a66-8b1b-85d516e504ce",
        question: "First Question?",
        points: 10,
        negativePoints: 5,
        options: [
          {
            id: "f098b3d8-0080-40d0-bb34-7be85310a06f",
            content: `Option 1`,
            isAnswer: false,
          },
          {
            id: "7dd74db4-b71e-4404-87e8-eec35685d3b4",
            content: `Option 2`,
            isAnswer: true,
          },
          {
            id: "9278cb36-320b-48c8-963f-7d7a3e036db4",
            content: `Option 3`,
            isAnswer: false,
          },
        ],
      },
    ],
  },
];

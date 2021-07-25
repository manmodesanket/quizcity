import { Quiz } from "./quiz.type";

export const allQuizzes: Array<Quiz> = [
  {
    id: "ebdd93a2-97a3-4ef5-b8db-0e50e2831977",
    title: "The Office",
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
            id: "9f4d88cf-6bf1-45d9-a75d-442f882310cd",
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
    ],
  },
];

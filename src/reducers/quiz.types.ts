import { Quiz } from "../data/quiz.type";

export type QUIZ_STATE = {
  allQuizzes: Array<Quiz> | null;
};

export type ACTION =
  | { type: "RESET_STATE"; payload: { quizId: string } }
  | { type: "INITIALIZE_ALL_QUIZZES"; payload: { allQuizzes: Array<Quiz> } };

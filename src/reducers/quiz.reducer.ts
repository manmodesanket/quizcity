import { getAllQuizzes } from "../utils/quiz";
import { ACTION, QUIZ_STATE } from "./quiz.types";

export const quizInitialState: QUIZ_STATE = {
  allQuizzes: null,
};

export const quizReducer = (state: QUIZ_STATE, action: ACTION): QUIZ_STATE => {
  switch (action.type) {
    case "INITIALIZE_ALL_QUIZZES":
      return {
        ...state,
        allQuizzes: getAllQuizzes(),
      };

    default:
      return state;
  }
};

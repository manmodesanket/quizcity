import { getAllQuizzes } from "../utils/quiz";
import { ACTION, QUIZ_STATE } from "./quiz.types";
import * as REDUCER_CONSTANTS from "../constants/reducer";

export const quizInitialState: QUIZ_STATE = {
  allQuizzes: null,
};

export const quizReducer = (state: QUIZ_STATE, action: ACTION): QUIZ_STATE => {
  switch (action.type) {
    case REDUCER_CONSTANTS.INITIALIZE_ALL_QUIZES:
      return {
        ...state,
        allQuizzes: getAllQuizzes(),
      };

    case REDUCER_CONSTANTS.INITIALIZE_QUIZ:
      return {
        ...state,
        allQuizzes: action.payload.data,
      };

    default:
      return state;
  }
};

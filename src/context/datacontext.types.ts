import { QUIZ_STATE } from "../reducers/quiz.types";

export type DATA_CONTEXT = {
  state: QUIZ_STATE;
  dispatch: React.Dispatch<any>;
  firebase: Object;
  loading: Boolean;
};

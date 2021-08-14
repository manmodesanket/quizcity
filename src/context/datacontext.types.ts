import { QUIZ_STATE } from "../reducers/quiz.types";

export type User = {
  displayName: string;
  email: string;
};

export type Result = [string, number];

export type DATA_CONTEXT = {
  state: QUIZ_STATE;
  dispatch: React.Dispatch<any>;
  profile: User | null | undefined;
  logout: () => void;
  loading: Boolean;
  results: Result[] | undefined;
};

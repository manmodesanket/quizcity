import {
  createContext,
  FunctionComponent,
  useEffect,
  useContext,
  useReducer,
} from "react";
import { quizReducer, quizInitialState } from "../reducers/quiz.reducer";
import { getAllQuizesFromFirebase } from "../utils/quiz";
import { DATA_CONTEXT } from "./datacontext.types";

const DataContext = createContext<DATA_CONTEXT>({
  state: quizInitialState,
  dispatch: () => null,
  firebase: () => null,
});

export const useData = () => useContext(DataContext);

export const DataProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, quizInitialState);

  const initAllQuizzes = async () => {
    let data = await getAllQuizesFromFirebase();
    dispatch({
      type: "INITIALIZE_ALL_QUIZZES_FROM_FIREBASE",
      payload: { data },
    });
  };

  useEffect(() => {
    initAllQuizzes();
  }, []);

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
        firebase: window.firebase,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

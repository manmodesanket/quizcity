import {
  createContext,
  FunctionComponent,
  useEffect,
  useContext,
  useReducer,
  useState,
} from "react";
import { quizReducer, quizInitialState } from "../reducers/quiz.reducer";
import { getAllQuizesFromFirebase } from "../utils/quiz";
import { DATA_CONTEXT, Result, User } from "./datacontext.types";
import * as REDUCER_CONSTANTS from "../constants/reducer";

const DataContext = createContext<DATA_CONTEXT>({} as DATA_CONTEXT);

export const useData = () => useContext(DataContext);

export const DataProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, quizInitialState);
  const [results, setResults] = useState<Result[]>();
  const [loadingData, setLoadingData] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const listener = window.firebase.auth().onAuthStateChanged((user: any) => {
      if (user != null) {
        let newUser: User = {
          displayName: user.displayName,
          email: user.email,
        };
        setUser(newUser);
        setLoadingAuth(false);
      } else {
        setUser(null);
        setLoadingAuth(false);
      }
    });
    return () => listener();
  }, []);

  useEffect(() => {
    async function getData(): Promise<void> {
      if (user != null) {
        let db = window.firebase.firestore();
        let userId = user.displayName;
        let data = await db
          .collection("quiz-result")
          .doc(userId)
          .get()
          .then((doc: any) => doc.data());
        const dataMap: Result[] = Object.entries(data);
        setResults(dataMap);
      }
    }
    getData();
  }, [user]);

  function logout(): void {
    window.firebase.auth().signOut();
    setUser(null);
  }

  const initAllQuizzes = async (): Promise<void> => {
    let data = await getAllQuizesFromFirebase();
    dispatch({
      type: REDUCER_CONSTANTS.INITIALIZE_QUIZ,
      payload: { data },
    });
    setLoadingData(false);
  };

  useEffect(() => {
    initAllQuizzes();
  }, []);

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
        profile: user,
        logout,
        results,
        loading: loadingData && loadingAuth,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

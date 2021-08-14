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
import { DATA_CONTEXT, User } from "./datacontext.types";

const DataContext = createContext<DATA_CONTEXT>({} as DATA_CONTEXT);

export const useData = () => useContext(DataContext);

export const DataProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, quizInitialState);
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

  function logout(): void {
    setUser(null);
  }

  const initAllQuizzes = async () => {
    let data = await getAllQuizesFromFirebase();
    dispatch({
      type: "INITIALIZE_ALL_QUIZZES_FROM_FIREBASE",
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
        loading: loadingData && loadingAuth,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

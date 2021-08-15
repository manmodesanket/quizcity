import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Timer } from "../components";
import Navbar from "../components/navbar/navbar";
import { Time } from "../components/timer/timer.types";
import { useData } from "../context/datacontext";
import { emptyQuiz } from "../data/quiz.type";

type answer = {
  questionId: string;
  optionId: string;
};

function QuizPage() {
  const urlParam: any = useParams();
  let history = useHistory();
  const {
    state: { allQuizzes },
    loading,
  } = useData();

  const id = urlParam.quizId;
  const [count, setCount] = useState(0);
  const [quiz, setQuiz] = useState(emptyQuiz);
  const [answers, setAnswers] = useState<Array<answer>>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [timeUp, setTimeUp] = useState(false);
  const minSec: Time = { minutes: 0, seconds: 10 };

  useEffect(() => {
    if (allQuizzes !== null && allQuizzes.length > 0) {
      const quiz = allQuizzes?.find((item) => item.id === id)!;
      setQuiz(quiz);
    }
  }, [id, allQuizzes]);

  useEffect(() => {
    const answer = answers.find(
      (item) => item.questionId === quiz.questions[count].id
    )!;
    setSelectedOption(answer?.optionId);
  }, [count, answers, quiz.questions]);

  const updateOption = (action: string) => {
    if (count + 1 < quiz.questions.length && action === "INC") {
      setCount(count + 1);
    } else if (count > 0 && action === "DESC") {
      setCount(count - 1);
    }
  };

  const updateAnswer = (questionId: string, optionId: string) => {
    const answerObj: answer = { questionId, optionId };
    let newAnswersArray = answers.filter(
      (item) => item.questionId !== quiz.questions[count].id
    )!;
    newAnswersArray = [...newAnswersArray, answerObj];
    setAnswers(newAnswersArray);
  };

  if (timeUp) {
    return (
      <div className="mx-auto px-4 sm:px-80 flex flex-col bg-gray-800 min-h-screen text-gray-100">
        <h2 className="mx-auto text-xl mb-4">Time is up</h2>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => history.push("/result", { quiz, answers })}
        >
          Finish Test
        </button>
      </div>
    );
  }

  return !(quiz === emptyQuiz) ? (
    <div className="mx-auto px-4 sm:px-80 flex flex-col bg-gray-800 min-h-screen text-gray-100">
      <h1 className="text-4xl text-center mt-4 font-bold">{quiz.title}</h1>
      <Timer minSec={minSec} setTimeUp={setTimeUp} />
      <div>
        <div className="w-full flex justify-between mt-8 p-4">
          <div className="font-bold text-lg rounded">
            {count + 1}. {quiz.questions[count].question}
          </div>
          <div className="font-bold">
            Points: {quiz.questions[count].points}
          </div>
        </div>

        <ul>
          {quiz.questions[count].options.map((option) => (
            <li
              className={`mb-4 text-center w-full p-4 rounded-xl bg-gray-700 cursor-pointer font-bold ${
                selectedOption === option.id
                  ? "bg-green-600"
                  : "hover:bg-green-800"
              }`}
              key={option.id}
              onClick={() => updateAnswer(quiz.questions[count].id, option.id)}
            >
              {option.content}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between">
        {count > 0 && (
          <button
            className="bg-white hover:bg-blue-200 rounded border-2 border-blue-500 text-blue-500 font-bold py-2 px-4 rounded"
            onClick={() => updateOption("DESC")}
          >
            Prev
          </button>
        )}
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => history.push("/result", { quiz, answers })}
        >
          Finish Test
        </button>
        {count + 1 < quiz.questions.length && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => updateOption("INC")}
          >
            Next
          </button>
        )}
      </div>
    </div>
  ) : (
    <div>
      {loading && (
        <div className="mx-auto mt-4 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      )}
    </div>
  );
}

export default QuizPage;

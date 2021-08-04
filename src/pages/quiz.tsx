import { useState, useEffect, SetStateAction } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useData } from "../context/datacontext";
import { emptyQuiz, Question, Quiz } from "../data/quiz.type";
import { quizInitialState } from "../reducers/quiz.reducer";

type answer = {
  questionId: string;
  optionId: string;
};

function QuizPage() {
  const urlParam: any = useParams();
  let history = useHistory();
  const {
    state: { allQuizzes },
  } = useData();

  const id = urlParam.quizId;
  const [count, setCount] = useState(0);
  const [quiz, setQuiz] = useState(emptyQuiz);
  const [answers, setAnswers] = useState<Array<answer>>([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const quiz = allQuizzes?.find((item) => item.id === id)!;
    setQuiz(quiz);
  }, [urlParam]);

  useEffect(() => {
    const answer = answers.find(
      (item) => item.questionId === quiz.questions[count].id
    )!;
    setSelectedOption(answer?.optionId);
  }, [count, answers]);

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

  return quiz.title ? (
    <div className="mx-auto px-5 sm:px-40 flex flex-col">
      <h1 className="text-4xl text-center mt-4 font-bold">{quiz.title}</h1>
      <div>
        <div className="w-full flex justify-between mt-8">
          <div>
            {" "}
            Question: {count + 1}/{quiz.questions.length}
          </div>
          <div>Points: 5</div>
        </div>
        <div className="my-4 font-bold text-lg bg-yellow-400 rounded p-4">
          {quiz.questions[count].question}
        </div>
        <ul>
          {quiz.questions[count].options.map((option) => (
            <li
              className={`mb-4 text-center w-full p-4 border-2 rounded-xl cursor-pointer font-bold ${
                selectedOption === option.id
                  ? "bg-green-300 border-green-300"
                  : "hover:bg-green-600"
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
        <button
          className="bg-white hover:bg-blue-200 rounded border-2 border-blue-500 text-blue-500 font-bold py-2 px-4 rounded"
          onClick={() => updateOption("DESC")}
        >
          Prev
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => history.push("/result", { quiz, answers })}
        >
          Finish Test
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => updateOption("INC")}
        >
          Next
        </button>
      </div>
    </div>
  ) : (
    <div>Hello</div>
  );
}

export default QuizPage;

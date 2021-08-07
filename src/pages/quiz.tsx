import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
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
  } = useData();

  const id = urlParam.quizId;
  const [count, setCount] = useState(0);
  const [quiz, setQuiz] = useState(emptyQuiz);
  const [answers, setAnswers] = useState<Array<answer>>([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const quiz = allQuizzes?.find((item) => item.id === id)!;
    setQuiz(quiz);
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

  return quiz.title ? (
    <div className="mx-auto px-4 sm:px-80 flex flex-col bg-gray-800 min-h-screen text-gray-100">
      <h1 className="text-4xl text-center mt-4 font-bold">{quiz.title}</h1>
      <div>
        <div className="w-full flex justify-between mt-8 p-4">
          <div className="font-bold text-lg rounded">
            {count + 1}. {quiz.questions[count].question}
          </div>
          <div className="font-bold">Points: 5</div>
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

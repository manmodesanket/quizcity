import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FinishButton,
  NextButton,
  PrevButton,
  QuestionComponent,
  Timer,
} from "../components";
import { Time } from "../components/timer/timer.types";
import { useData } from "../context/datacontext";
import { Answer, emptyQuiz } from "../data/quiz.type";

function QuizPage() {
  const urlParam: any = useParams();
  const {
    state: { allQuizzes },
    loading,
  } = useData();

  const id = urlParam.quizId;
  const [count, setCount] = useState(0);
  const [quiz, setQuiz] = useState(emptyQuiz);
  const [answers, setAnswers] = useState<Array<Answer>>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [timeUp, setTimeUp] = useState(false);
  const minSec: Time = { minutes: 1, seconds: 0 };

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
    const answerObj: Answer = { questionId, optionId };
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
        <FinishButton quiz={quiz} answers={answers} />
      </div>
    );
  }

  return !(quiz === emptyQuiz) ? (
    <main className="mx-auto px-4 sm:px-80 flex flex-col bg-gray-800 min-h-screen text-gray-100">
      <section className="text-4xl text-center mt-4 font-bold">
        {quiz.title}
      </section>
      <Timer minSec={minSec} setTimeUp={setTimeUp} />
      <QuestionComponent
        question={quiz.questions[count]}
        count={count}
        selectedOption={selectedOption}
        updateAnswer={updateAnswer}
      />
      <section className="flex justify-between">
        {count > 0 && <PrevButton updateOption={updateOption} />}
        <FinishButton quiz={quiz} answers={answers} />
        {count + 1 < quiz.questions.length && (
          <NextButton updateOption={updateOption} />
        )}
      </section>
    </main>
  ) : (
    <div>
      {loading && (
        <div className="mx-auto mt-4 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      )}
    </div>
  );
}

export default QuizPage;

import React from "react";
import { useData } from "../../context/datacontext";
import QuizCard from "./quizcard";

const QuizList: React.FC = () => {
  const {
    state: { allQuizzes },
    loading,
  } = useData();

  return (
    <main className="mx-auto sm:px-40 bg-gray-800 min-h-screen text-gray-100">
      <section className="flex flex-wrap mx-auto container mx-auto">
        {loading && (
          <div className="mx-auto mt-4 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        )}
        {allQuizzes?.map((quizItem) => (
          <QuizCard key={quizItem.id} item={quizItem} />
        ))}
      </section>
    </main>
  );
};

export default QuizList;

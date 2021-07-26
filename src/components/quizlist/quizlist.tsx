import React from "react";
import { Quiz } from "../../data/quiz.type";
import { Link } from "react-router-dom";
import { useData } from "../../context/datacontext";
import { isTemplateMiddle } from "typescript";

const QuizCard: React.FC<{ item: Quiz }> = ({ item }) => {
  return (
    <Link to={`/quiz/${item.id}`} className="w-full sm:w-1/2 lg:w-1/4 mb-3 p-3">
      <div className="flex flex-col justify-between w-full h-full rounded overflow-hidden shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none cursor-pointer">
        <div className="w-full bg-gray-200">
          <img className="w-full" src={item.imageUrl} alt={item.title} />
        </div>
        <div className="mx-auto">
          <div className="flex justify-between items-center mb-2 text-xl font-bold">
            {item.title}
          </div>
        </div>
      </div>
    </Link>
  );
};

const QuizList: React.FC = () => {
  const {
    state: { allQuizzes },
  } = useData();
  return (
    <div className="flex flex-wrap mb-4 mx-auto container mx-auto px-4">
      {allQuizzes?.map((quizItem) => (
        <QuizCard key={quizItem.id} item={quizItem} />
      ))}
    </div>
  );
};

export default QuizList;

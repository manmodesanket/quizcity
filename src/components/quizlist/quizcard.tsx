import { Link } from "react-router-dom";
import { Quiz } from "../../data/quiz.type";

const QuizCard: React.FC<{ item: Quiz }> = ({ item }) => {
  return (
    <Link to={`/quiz/${item.id}`} className="w-full sm:w-1/2 lg:w-1/4 p-3 mb-3">
      <div className="flex flex-col justify-between w-full h-full rounded overflow-hidden shadow-lg hover:shadow-2xl hover:ring-2 focus:outline-none cursor-pointer">
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

export default QuizCard;

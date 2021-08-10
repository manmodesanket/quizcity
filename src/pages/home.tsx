import { QuizList } from "../components";
import Navbar from "../components/navbar/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="mx-auto px-4 sm:px-40 bg-gray-800 min-h-screen text-gray-100">
        <QuizList />
      </div>
    </div>
  );
}

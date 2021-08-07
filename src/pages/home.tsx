import { Header } from "../components";
import { QuizList } from "../components";

export default function Home() {
  return (
    <div className="bg-gray-800 min-h-screen text-gray-100">
      <Header title={"Quiz City"} />
      <QuizList />
    </div>
  );
}

import { Header } from "../components";
import { QuizList } from "../components";

export default function Home() {
  return (
    <div>
      <Header title={"Sitcom Quiz"} />
      <QuizList />
    </div>
  );
}

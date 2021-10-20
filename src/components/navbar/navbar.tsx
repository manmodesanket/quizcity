import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

export default function Navbar() {
  return (
    <nav className="w-full sticky top-0 bg-gray-600 text-gray-200">
      <div className="px-4 sm:px-80 mx-auto flex justify-between items-center">
        <Link to={ROUTES.ROUTE_HOME} className="text-link">
          {" "}
          <h1 className="text-3xl font-bold">QuizCity</h1>
        </Link>
        <div className="w-1/2 sm:w-1/4 flex justify-between">
          <Link to={ROUTES.ROUTE_HOME} className="text-link">
            <p
              className={`sm:px-2 sm:py-4 sm:block font-semibold text-lg text-gray-200 cursor-pointer`}
            >
              Home
            </p>
          </Link>
          <Link to={ROUTES.ROUTE_ACCOUNT} className="text-link">
            <p
              className={`sm:px-2 sm:py-4 sm:block font-semibold text-lg text-gray-200 cursor-pointer`}
            >
              Account
            </p>
          </Link>
        </div>
      </div>
    </nav>
  );
}

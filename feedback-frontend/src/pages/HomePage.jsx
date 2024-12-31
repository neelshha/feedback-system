import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Feedback System</h1>
      <Link to="/feedback" className="px-4 py-2 bg-blue-500 text-white rounded">
        Provide Feedback
      </Link>
    </div>
  );
}

export default HomePage;
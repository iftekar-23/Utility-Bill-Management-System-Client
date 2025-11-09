
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
   
        <title>404 Not Found - UBM System</title>
   
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="mb-4 text-lg">Oops! Page not found.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;

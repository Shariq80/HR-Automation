import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to HR Management App</h1>
        <p className="mb-4">Your comprehensive solution for managing HR tasks efficiently.</p>
        <Link href="/login">
          <a className="bg-blue-500 text-white px-4 py-2 rounded">Log In</a>
        </Link>
      </div>
    </div>
  );
}
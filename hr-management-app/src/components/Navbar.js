"use client";

import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'next/navigation';

export default function Navbar() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="text-lg font-bold text-white">HR Management App</a>
        </Link>
        <ul className="flex items-center space-x-4">
          {loading && (
            <li>Loading...</li>
          )}
          {!loading && user && (
            <>
              <li>
                <Link href="/dashboard">
                  <a className="text-gray-300 hover:text-white">Dashboard</a>
                </Link>
              </li>
              <li>
                <Link href="/job/create">
                  <a className="text-gray-300 hover:text-white">Create Job</a>
                </Link>
              </li>
              <li>
                <Link href="/admin">
                  <a className="text-gray-300 hover:text-white">Admin</a>
                </Link>
              </li>
              <li>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          )}
          {!loading && !user && (
            <li>
              <Link href="/login">
                <a className="text-gray-300 hover:text-white">Login</a>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
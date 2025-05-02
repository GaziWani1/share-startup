import { auth, signOut, signIn } from '@/auth';
import Link from 'next/link';
import React from 'react';

const Navbar = async () => {
  const session = await auth();
  console.log(session);

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-gray-800 font-semibold">
          Share-<span className="text-red-400">startUp</span>
        </Link>
        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}
              >
                <button type="submit">Logout</button>
              </form>
              <Link href="/startup/create">
                <span>create</span>
              </Link>
              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={async () => {
                  'use server';
                  await signIn('github');
                }}
              >
                <span>Login</span>
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

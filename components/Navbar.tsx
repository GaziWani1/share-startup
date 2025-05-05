import Link from 'next/link';
import { auth, signOut, signIn } from '@/auth';
import { BadgePlus, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link className=" font-semibold text-xl" href="/">
          Share-<span className="text-red-400">startup</span>
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden  bg-slate-800 px-3 py-2 cursor-pointer font-semibold rounded text-white">
                  Create
                </span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              <form
                action={async () => {
                  'use server';

                  await signOut({ redirectTo: '/' });
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden bg-[#EE2B69] px-3 py-2 cursor-pointer font-semibold rounded text-white ">
                    Logout
                  </span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ''}
                    alt={session?.user?.name || ''}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                'use server';

                await signIn('github');
              }}
            >
              <button
                className="bg-[#EE2B69] px-3 py-2 cursor-pointer font-semibold rounded text-white"
                type="submit"
              >
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

import { auth } from '@/auth';
import { StartupCardSkeleton } from '@/components/StartUpCard';
import UserStartups from '@/components/UserStartups';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  const id = (await params).id;

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

  if (!user) return notFound();

  return (
    <>
      <section className="w-full pb-10  pt-20 px-6 max-w-7xl mx-auto lg:flex-row flex-col flex gap-10">
        <div className="w-80 px-6 pb-6 pt-20 flex flex-col justify-center items-center bg-[#EE2B69] border-[5px] border-black shadow-100 rounded-[30px] relative z-0 h-fit max-lg:w-full">
          <div className="w-11/12 bg-white border-[5px] border-black rounded-[20px] px-5 py-3 absolute -top-9 after:absolute after:content-[''] after:-top-1 after:right-0 after:-skew-y-6 after:bg-black after:-z-[1] after:rounded-[20px] after:w-full after:h-[60px] before:absolute before:content-[''] before:-bottom-1 before:left-0 before:-skew-y-6 before:w-full before:h-[60px] before:bg-black before:-z-[1] before:rounded-[20px] shadow-100">
            <h1 className="text-[20px] text-black uppercase text-center line-clamp-1">
              {user.name}
            </h1>
          </div>
          <Image
            className="rounded-full bg-black p-1"
            src={user?.image}
            alt={user?.name}
            width={220}
            height={220}
          />
          <p className=" font-semibold mt-7 text-[25px] text-white text-center">
            @{user?.username}
          </p>
          <p className="mt-q1 text-white  text-[14px] font-normal">
            {user?.bio}
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-5 lg:mt-5">
          <p className="font-bold text-[30px]">
            {session?.id === id ? 'Your' : 'All'} startups
          </p>
          <ul className="grid sm:grid-cols-2 gap-5">
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default page;

import Image from 'next/image';

import { UTILITIES } from '../constants';
import SearchForm from '@/components/SearchForm';
import StartUpCard from '@/components/StartUpCard';

const posts = [
  {
    _createdAt: new Date(),
    views: 55,
    author: {
      _id: 1,
      name: 'Elon Mask',
    },
    _id: 1,
    description: 'This is a description',
    image:
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D',
    category: 'Robots',
    title: 'We Robots',
  },
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  return (
    <>
      <section className="w-full bg-[#EE2B69] min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6">
        <h1 className="uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">
          Pitch Your Startup <br />
          Contact With Entrepreneurs
        </h1>
        <p className="font-medium text-[20px] text-white max-w-2xl text-center break-word">
          Submit Ideas , Vote On Pitches , and Get Noticed in Virtual
          Competitions
        </p>
        <SearchForm query={query} />
      </section>
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <p className="text-xl font-semibold">
          {query ? `Search Results For The Following ${query}` : 'All StartUps'}
        </p>
        <ul className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.length > 0 ? (
            posts.map((post: StartUpCardType, i: number) => (
              <StartUpCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="text-black-100 text-sm font-normal">
              No StartUps found
            </p>
          )}
        </ul>
      </section>
    </>
  );
}

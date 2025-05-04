import { cn, formateDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { Author, Startup } from '@/sanity.types';
import { Skeleton } from './ui/skeleton';

export type StartUpCardType = Omit<Startup, 'author'> & { author?: Author };

const StartUpCard = ({ post }: { post: StartUpCardType }) => {
  const { _createdAt, view, author, title, category, description, image, _id } =
    post;

  return (
    <li className="bg-white border-4 border-black p-6 rounded-2xl shadow-md hover:border-[#EE2B69] hover:shadow-lg hover:bg-pink-100 transition-all duration-300 hover:border-[]">
      {/* Top Info */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <p>{formateDate(_createdAt)}</p>
        <div className="flex items-center gap-2">
          <EyeIcon className="w-5 h-5 text-primary" />
          <span>{view}</span>
        </div>
      </div>

      {/* Author + Title */}
      <div className="flex justify-between items-center mt-4 gap-4">
        <div className="flex-1">
          <Link href={`/user/post/${author?._id}`}>
            <p className="text-gray-800 text-sm font-semibold line-clamp-1 hover:underline">
              {author?.name}
            </p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-lg font-bold text-black mt-1 hover:text-primary transition-colors duration-200">
              {title}
            </h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image || ''}
            alt={`${author?.name}'s avatar`}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        </Link>
      </div>

      {/* Description + Image */}
      <Link href={`/startup/${_id}`}>
        <p className="text-base text-gray-700 mt-4 line-clamp-2 break-words">
          {description}
        </p>
        <img
          src={image}
          alt="Startup cover"
          className="w-full h-40 mt-3 rounded-lg object-cover"
        />
      </Link>

      {/* Category + Button */}
      <div className="flex justify-between items-center mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-base font-medium text-gray-900 hover:underline">
            {category}
          </p>
        </Link>
        <Button className="bg-black text-white px-5 py-2 rounded-full text-base font-medium">
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn('skeleton', index)}>
        <Skeleton className="w-full h-96 rounded-[22px] bg-zinc-400" />
      </li>
    ))}
  </>
);
export default StartUpCard;

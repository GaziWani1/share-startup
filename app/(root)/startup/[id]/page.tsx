import { formateDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import markdownit from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import { updateViews } from '@/lib/actions';
import StartUpCard, { StartUpCardType } from '@/components/StartUpCard';

import ReactMarkdown from 'react-markdown';

const StartUpDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: 'editor-picks-new',
    }),
  ]);
  await updateViews(id);

  if (!post) return notFound();
  return (
    <>
      <section className="w-full pattern bg-[#EE2B69] min-h-[400px] pattern flex justify-center items-center flex-col py-10 px-6">
        <h1 className="bg-[#FBE843] px-6 py-3 font-work-sans font-bold rounded-sm uppercase relative before:content-[''] before:absolute before:top-2 before:left-2 before:border-t-[10px] before:border-t-black before:border-r-[10px] before:border-r-transparent after:content-[''] after:absolute after:bottom-2 after:right-2 after:border-b-[10px] after:border-b-black after:border-l-[10px] after:border-l-transparent">
          {formateDate(post?._createdAt)}
        </h1>
        <h1 className="uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">
          {post?.title}
        </h1>
        <p className="font-medium text-[20px] text-white max-w-2xl text-center break-word">
          {post?.description}
        </p>
      </section>
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <img
          src={post?.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />
        <div className="space-y-5 mt-10 max-wl-4xl mx-auto">
          <div className="flex items-center w-full justify-between gap-5">
            <Link
              href={`/user/${post?.author?._id}`}
              className="flex gap-2 items-center"
            >
              <Image
                src={post?.author?.image}
                alt="avatr"
                width={50}
                height={50}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="font-medium text-[20px] text-black">
                  {post?.author?.name}
                </p>
                <p className="font-medium text-[16px] text-black-300">
                  @{post?.author?.username}
                </p>
              </div>
            </Link>
            <p className="font-medium text-[16px] bg-[#FFE8F0] px-4 py-2 rounded-full">
              {post?.category}
            </p>
          </div>
          <h1 className="text-[30px] font-bold text-blac">Pitch Details</h1>
          {post?.pitch ? (
            <ReactMarkdown
              components={{
                h1: (props) => (
                  <h1
                    className="text-3xl font-bold text-gray-800 mb-4"
                    {...props}
                  />
                ),
                h2: (props) => (
                  <h2
                    className="text-2xl font-semibold text-gray-800 mb-3"
                    {...props}
                  />
                ),
                h3: (props) => (
                  <h3
                    className="text-xl font-semibold text-gray-700 mb-2"
                    {...props}
                  />
                ),
                h4: (props) => (
                  <h4
                    className="text-lg font-medium text-gray-700 mb-2"
                    {...props}
                  />
                ),
                p: (props) => (
                  <p
                    className="text-base text-gray-700 leading-relaxed mb-4"
                    {...props}
                  />
                ),
                ul: (props) => (
                  <ul
                    className="list-disc list-inside text-gray-700 mb-4"
                    {...props}
                  />
                ),
                ol: (props) => (
                  <ol
                    className="list-decimal list-inside text-gray-700 mb-4"
                    {...props}
                  />
                ),
                li: (props) => <li className="mb-1 ml-4" {...props} />,
                blockquote: (props) => (
                  <blockquote
                    className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4"
                    {...props}
                  />
                ),
                code: (props) => (
                  <code
                    className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800"
                    {...props}
                  />
                ),
                pre: (props) => (
                  <pre
                    className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-4"
                    {...props}
                  />
                ),
                a: (props) => (
                  <a className="text-blue-600 hover:underline" {...props} />
                ),
                img: (props) => (
                  <img className="my-4 rounded-lg max-w-full" {...props} />
                ),
                strong: (props) => (
                  <strong className="font-semibold text-gray-800" {...props} />
                ),
                em: (props) => (
                  <em className="italic text-gray-700" {...props} />
                ),
                hr: () => <hr className="my-6 border-gray-300" />,
              }}
            >
              {post?.pitch}
            </ReactMarkdown>
          ) : (
            <p className="text-black-100 text-sm font-normal">
              No details found
            </p>
          )}
        </div>
        <hr className="divider my-4" />

        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-[30px] font-semibold">Editor Picks</p>

            <ul className="mt-7 grid sm:grid-cols-2 gap-5">
              {editorPosts.map((post: StartUpCardType, i: number) => (
                <StartUpCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense
          fallback={
            <Skeleton className=" bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3" />
          }
        >
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default StartUpDetails;

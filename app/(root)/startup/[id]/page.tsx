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
const md = markdownit();

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
  const parsedContent = md.render(post?.pitch || '');
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
          {parsedContent ? (
            <article
              className=" prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
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

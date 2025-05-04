import React from 'react';
import Ping from './Ping';
import { client } from '@/sanity/lib/client';
import { writeClient } from '@/sanity/lib/write-client';
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import { formateViews } from '@/lib/utils';
import { after } from 'node:test';

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({
      useCdn: true,
    })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit()
  );

  return (
    <div className="flex justify-end rounded items-center bg-[#FFE8F0] mt-5 fixed bottom-3 right-3">
      <div className=" absolute -top-2  right-2">
        <Ping />
      </div>
      <p className="font-medium text-[16px] bg-[#EE2B69]-100 px-4 py-2 rounded-lg capitalize">
        <span className="text-black"> {formateViews(totalViews)}</span>
      </p>
    </div>
  );
};

export default View;

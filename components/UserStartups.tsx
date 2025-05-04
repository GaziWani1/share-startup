import { client } from '@/sanity/lib/client';
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries';
import React from 'react';
import StartUpCard, { StartUpCardType } from './StartUpCard';

const UserStartups = async ({ id }: { id: string }) => {
  const startUps = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });

  return (
    <>
      {startUps.length > 0 ? (
        startUps.map((startup: StartUpCardType) => (
          <StartUpCard key={startup._id} post={startup} />
        ))
      ) : (
        <p>No Posts Yet</p>
      )}
    </>
  );
};

export default UserStartups;

'use server';

import { auth } from '@/auth';
import { generateSlug, parseServerActionResponse } from './utils';
import { writeClient } from '@/sanity/lib/write-client';

export const createPitch = async (
  state: any,
  form?: FormData,
  pitch?: string
) => {
  const session = await auth();
  if (!session) {
    return parseServerActionResponse({
      error: 'Not signed in',
      status: 'Error',
    });
  }

  if (!form) {
    return parseServerActionResponse({
      error: 'Form data is missing',
      status: 'Error',
    });
  }

  try {
    // Convert FormData to object
    const entries = Array.from(form.entries()).reduce(
      (acc: Record<string, any>, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {}
    );

    const { title, description, category, link } = entries;

    const slug = generateSlug(title);

    const startUp = {
      _type: 'startup',
      title,
      description,
      category,
      image: link,
      slug: {
        _type: 'slug',
        current: slug,
      },
      author: {
        _type: 'reference',
        _ref: session.id,
      },
      pitch,
    };

    const result = await writeClient.create(startUp);

    return parseServerActionResponse({
      ...result,
      error: '',
      status: 'SUCCESS',
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: (error as Error).message || 'Unknown error',
      status: 'Error',
    });
  }
};

export const updateViews = async (startupId: string) => {
  try {
    const result = await writeClient
      .patch(startupId)
      .setIfMissing({ views: 0 }) // ensure views exists
      .inc({ views: 1 }) // increment
      .commit();

    return { success: true, views: result.views };
  } catch (error) {
    console.error('Views update failed:', error);
    return { success: false, error: error.message };
  }
};

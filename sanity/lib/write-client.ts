import 'server-only';
import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, token } from '../env';

console.log(projectId, apiVersion, dataset, projectId, token);

if (!token) {
  throw new Error(
    'Sanity write token is missing. Please set it in your environment variables.'
  );
}

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

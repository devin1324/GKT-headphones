import imageUrlBuilder from '@sanity/image-url';
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: '5j7vnb7w',
  dataset: 'production',
  apiVersion: '2022-12-22',
  useCdn: true,
  token: process.env.PUBLIC_SANITY_DEV_KEY,
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

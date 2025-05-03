import { defineQuery } from 'next-sanity';

export const STARTUPS_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug.current)] | order(_createdAt desc){
  _id , 
  title ,
    slug,
    author -> {
      _id , name , image , bio    },
  slug ,
    views,
  _createdAt  ,
    category,
    image
}`);

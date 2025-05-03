import { defineQuery } from 'next-sanity';

export const STARTUPS_QUERY = defineQuery(`
  *[
    _type == "startup" &&
    defined(slug.current) &&
    (
      !defined($search) ||
      title match $search ||
      category match $search ||
      author->name match $search
    )
  ] | order(_createdAt desc) {
    _id,
    title,
    slug,
    author -> {
      _id,
      name,
      image,
      bio
    },
    view,
    _createdAt,
    description,
    category,
    image
  }
`);

export const STARTUPS_DETAIL_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id,
  title,
  slug,
  author->{
    _id,
    name,
    username,
    image,
    bio
  },
  view,
  _createdAt,
  category,
  description,
  image,
    pitch
}
`);

export const STARTUPS_QUERY_VIEWS = defineQuery(`
  *[_type == "startup" && _id == $id][0] {
    _id,
    view
  }
`);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
  *[_type == "author" && _id == $id][0] {
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
  }
  `);

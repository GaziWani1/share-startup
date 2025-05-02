import React from 'react';
import Form from 'next/form';

import FormReset from './FormReset';
import { Search } from 'lucide-react';
import { UTILITIES } from '@/app/constants';

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form
      action="/"
      scroll={false}
      className={`${UTILITIES.searchForm} search-form`}
    >
      <input
        name="query"
        defaultValue={query}
        placeholder="Search Startups"
        className={UTILITIES.searchInput}
      />
      <div className="flex gap-2">
        {query && <FormReset />}
        <button type="submit" className={`text-white ${UTILITIES.searchBtn}`}>
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;

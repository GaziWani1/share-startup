'use client';

import Link from 'next/link';

import { X } from 'lucide-react';
import { UTILITIES } from '@/app/constants';

const FormReset = () => {
  const reset = () => {
    const form = document.querySelector('.search-form') as HTMLFormElement;
    if (form) form.reset();
  };
  return (
    <button type="reset" onClick={reset}>
      <Link href="/" className={` text-white ${UTILITIES.searchBtn}`}>
        <X className="size-5" />
      </Link>
    </button>
  );
};

export default FormReset;

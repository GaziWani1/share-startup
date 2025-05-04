'use client';

import React, { useActionState, useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { z } from 'zod';
import { formSchema } from '@/lib/validation';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createPitch } from '@/lib/actions';

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState<string>('');
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        link: formData.get('link') as string,
        pitch,
      };

      await formSchema.parseAsync(formValues); // Validate

      const result = await createPitch(prevState, formData, pitch);

      if (result?.status === 'SUCCESS') {
        toast.success('Your startup pitch has been created successfully');
        router.push(`/startup/${result._id}`);
      } else {
        toast.error(result?.error || 'Failed to create pitch');
      }

      return result;
    } catch (error) {
      console.log(error);

      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as Record<string, string>);
        toast.error('Please check your inputs and try again');
        return {
          error: 'Validation failed',
          status: 'ERROR',
        };
      }

      toast.error('An unexpected error occurred');
      return {
        error: 'Unexpected error occurred',
        status: 'ERROR',
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: '',
    status: 'INITIAL',
  });

  return (
    <form
      action={formAction}
      className="max-w-2xl mx-auto bg-white my-10 space-y-8 px-6"
    >
      {/* Title Field */}
      <div>
        <label
          htmlFor="title"
          className="font-bold text-[18px] text-black uppercase"
        >
          Title
        </label>
        <Input
          id="title"
          name="title"
          required
          placeholder="Start Up Title"
          className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300"
        />
        {errors.title && (
          <p className="text-red-500 mt-2 ml-5">{errors.title}</p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <label
          htmlFor="description"
          className="font-bold text-[18px] text-black uppercase"
        >
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          required
          placeholder="Description"
          className="border-[3px] border-black p-5 text-[18px] text-black font-semibold rounded-[20px] mt-3 placeholder:text-black-300"
        />
        {errors.description && (
          <p className="text-red-500 mt-2 ml-5">{errors.description}</p>
        )}
      </div>

      {/* Category Field */}
      <div>
        <label
          htmlFor="category"
          className="font-bold text-[18px] text-black uppercase"
        >
          Category
        </label>
        <Input
          id="category"
          name="category"
          required
          placeholder="Start Category (tech, health, education...)"
          className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300"
        />
        {errors.category && (
          <p className="text-red-500 mt-2 ml-5">{errors.category}</p>
        )}
      </div>

      {/* Image Link Field */}
      <div>
        <label
          htmlFor="link"
          className="font-bold text-[18px] text-black uppercase"
        >
          Image Url
        </label>
        <Input
          id="link"
          name="link"
          required
          placeholder="Startup Image URL"
          className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300"
        />
        {errors.link && <p className="text-red-500 mt-2 ml-5">{errors.link}</p>}
      </div>

      {/* Pitch Field */}
      <div data-color-mode="light">
        <label
          htmlFor="pitch"
          className="font-bold text-[18px] text-black uppercase"
        >
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={setPitch}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: 'hidden' }}
          textareaProps={{
            placeholder:
              'Briefly describe your idea and what problem it solves',
          }}
          previewOptions={{
            disallowedElements: ['style'],
          }}
        />
        {errors.pitch && (
          <p className="text-red-500 mt-2 ml-5">{errors.pitch}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        disabled={isPending}
        type="submit"
        className="bg-[#EE2B69] border-[4px] border-black rounded-full p-5 min-h-[70px] w-full font-bold text-[18px]"
      >
        {isPending ? 'Submitting...' : 'Submit Your Pitch'}
        <Send className="size-6 text-white ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;

'use client';

import { useState } from 'react';
import { db, storage } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { createSlug } from '../utilits/slug-generate';


export function CreateJournal() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [description, setDescription] = useState('');
  const [slug,setSlug] = useState('')

  const handleCreateJournal = async (e) => {
    e.preventDefault();

    if (!title || !author || !coverImage || !pdf || !description) {
      alert('Please fill all fields');
      return;
    }

    try {
      // Upload cover image
      const coverImageRef = ref(storage, `images/${coverImage.name}`);
      await uploadBytes(coverImageRef, coverImage);
      const imageUrl = await getDownloadURL(coverImageRef);

      // Upload PDF
      const pdfRef = ref(storage, `pdfs/${pdf.name}`);
      await uploadBytes(pdfRef, pdf);
      const pdfUrl = await getDownloadURL(pdfRef);

      // Save data to Firestore
      await addDoc(collection(db, 'journals'), {
        title,
        author,
        imageUrl,
        pdfUrl,
        description,
        slug: createSlug(title),
        createdAt: new Date().getTime(),
      });

      alert('Your Journal was created');
    } catch (e) {
      alert('An error has occurred: ' + e.message);
      console.error(e);
    }
  };

  return (
    <div className='mx-auto'>
      <form onSubmit={handleCreateJournal}>
        <div className="space-y-12 container">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                  Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="janesmith"
                      autoComplete="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="author" className="block text-sm font-medium leading-6 text-gray-900">
                  Author
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="author"
                      name="author"
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="jane smith"
                      autoComplete="author"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences description yourself.</p>
              </div>

              <div className="col-span-full">
                <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                  Cover Image
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="file-upload" className="block text-sm font-medium leading-6 text-gray-900">
                  Submit your Journal
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => setPdf(e.target.files[0])}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PDF or DOCX not more than 20MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateJournal;
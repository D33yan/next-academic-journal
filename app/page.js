'use client';
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { createSlug } from "./utilits/slug-generate";
import AboutSection from "./about-section/page";
import JournalCards from "@/components/Journals";
import { Footer } from "@/components/footer";
import SkeletonLoader from "@/components/SkeletonLoader";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const getJournals = async () => {
  const alljournals = [];
  const querySnapshot = await getDocs(collection(db, "journals"));

  querySnapshot.forEach((doc) => {
    alljournals.push({ ...doc.data(), id: doc.id });
  });

  return alljournals;
};

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center my-4">
      <ul className="inline-flex -space-x-px">
        {pageNumbers.map(number => (
          <li key={number}>
            <a
              onClick={() => paginate(number)}
              href="#"
              className={`px-3 py-2 border border-gray-800 rounded bg-gray-600 text-gray-500 hover:bg-gray-800 ${currentPage === number ? 'bg-gray-900' : ''}`}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // You can adjust the number of items per page

  useEffect(() => {
    const fetchJournals = async () => {
      const journals = await getJournals();
      setPosts(journals);
      setFilteredPosts(journals);
      setLoading(false);
    };

    fetchJournals();
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    const slug = createSlug(searchValue);
    const filtered = posts.filter(post => createSlug(post.title).includes(slug));
    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to the first page on search
  };

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="px-2 py-5 mx-auto w-full bg-gray-900">
          <div className="flex flex-wrap -m-1">
            <div
              className="relative w-full h-[100vh] md:h-96 lg:h-[500px] bg-cover bg-center rounded-xl bg-opacity-85"
              style={{ backgroundImage: "url(/journalhome.jpg)" }}
            >
              <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
              <div className="relative z-10 flex items-center justify-center h-full">
                <h1
                  className="bg-gradient-to-r from-cyan-300 via-teal-600 border-0 to-cyan-300 bg-clip-text text-transparent text-3xl md:text-5xl lg:text-6xl font-bold font-serif mb-5 shadow-inner"
                >
                  Let's Get Started
                </h1>
                <a
                  href="/create-journal"
                  className="absolute font-bold font-serif mt-32 rounded-3xl z-10 md:p-2 md:mt-28 md:text-lg text-xl p-3 sm:p-3 sm:text-xshover:animate-pulse text-white bg-gradient-to-r from-neutral-900 via-teal-900 to-cyan-950 border-cyan-500 hover:to-black duration-75 hover:text-slate-100 py-1 px-2 sm:mt-16 hover:animate-pulse hover:duration-1000 ease-in-out"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
           <div className="mt-6 relative flex items-center">
            <input
              type="text"
              placeholder="Search for a journal..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-72 p-2  bg-gray-800 text-white rounded-3xl shadow-lg focus:ring-gray-700 focus:border-gray-700 sm:text-sm"
            />
            <button
              className="p-2 mx-1 rounded-3xl bg-teal-900 text-white font-bold"
              onClick={() => handleSearch({ target: { value: searchTerm } })}
            >
              <MagnifyingGlassIcon className="h-5 w-5 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
        {loading ? <SkeletonLoader /> : <JournalCards journals={currentItems} />}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredPosts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <AboutSection />
      </section>
      <Footer />
    </>
  );
}

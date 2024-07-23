import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { CreateJournal } from "./create-journal/page";
import AboutSection from "./about-section/page";
import JournalCards from "@/components/Journals";

const getJournals = async () => {
  const alljournals = [];
  const querySnapshot = await getDocs(collection(db, "journals"));

  querySnapshot.forEach((doc) => {
    alljournals.push(doc.data());
  });

  return alljournals;
};




export default async function Home() {
  const posts = await getJournals();
  //console.log(posts);
  return (
    <>
      <section className="text-gray-600 body-font ">
        <div className=" px-2 py-5 mx-auto w-full bg-gray-800">
          <div className="flex flex-wrap -m-1">
            <div
              className="relative w-full h-[100vh] md:h-96 lg:h-[500px] bg-cover  rounded-xl bg-opacity-85 "
              style={{ backgroundImage: "url(/journalhome.jpg)" }}
            >
              <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
              <div className="relative z-10 flex items-center justify-center h-full">
                <h1
                  className=" bg-gradient-to-r from-cyan-300 via-teal-600
         border-0 to-cyan-300 bg-clip-text text-transparent text-3xl md:text-5xl lg:text-6xl font-bold font-serif mb-5 shadow-inner "
                >
                  Lets Get started
                </h1>
                <a
                href="/create-journal"
                  className="absolute  font-bold font-serif mt-32  rounded-3xl z-10 md:p-2 md:mt-28 md:text-lg  text-xl p-3  sm:p-3 sm:text-xshover:animate-pulse text-white bg-gradient-to-r from-neutral-900 via-teal-900 to-cyan-950
         border-[1px] border-cyan-500 hover:to-black duration-75 hover:text-slate-100  py-1 px-2 sm:mt-16 hover:animate-pulse  hover:duration-1000 ease-in-out
                    "
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      <AboutSection/>
      <JournalCards/>
      </section>
    </>
  );
}

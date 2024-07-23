import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const getPostBySlug = async () => {
 
  return (
    <div className="container px-5 py-24 mx-auto">
      <div className="max-w-2xl mx-auto">
        <img src={post.image} alt="Blog Post Image" className="w-full" />
        <h1 className="text-3xl font-bold mt-4">{post.title}</h1>
        <div
          className="mt-4 prose lg:prose-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>
    </div>
  );
}

'use client';

import Image from "next/image";
import useStore from "@/app/CustomHooks/useStore";
import noImg from '/public/no-image.jpg'

export default function BlogPost({ params }) {
  const {blogs} = useStore();
  const blogsData = blogs.data || [];
  const filteredBlogs = blogsData.filter(blog => String(blog.id) === String(params.id));


  return (
    <div className="w-[95%] mx-auto pb-5 pt-4">
      {filteredBlogs.length > 0 ? (
        filteredBlogs.map((blog) => (
          <div key={blog.id}>
           
            <Image
              src={blog.image || noImg}
              alt={blog.title}
              width={800}
              height={200}
              className="w-full lg:h-[60vh] md:h-[45vh] h-[30vh] object-cover rounded-md mb-6"
            />
            <div className="w-10/12 mx-auto">
            <h1 className="lg:text-3xl text-2xl  text-black font-bold md:mt-10 my-4">{blog.title}</h1>
             <div
              className="md:text-lg text-gray-700 mb-5 font-bangla"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
            </div>
         
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No blog data found.</p>
      )}
    </div>
  );
}

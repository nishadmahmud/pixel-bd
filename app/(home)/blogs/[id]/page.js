'use client';

import Image from "next/image";
import useStore from "@/app/CustomHooks/useStore";
import noImg from "/public/no-image.jpg";

export default function BlogPost({ params }) {
  const { blogs } = useStore();
  const blogsData = blogs?.data || [];
  const filteredBlogs = blogsData.filter(
    (blog) => String(blog.id) === String(params.id)
  );

  if (filteredBlogs.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">No blog data found.</p>
    );
  }

  const blog = filteredBlogs[0];

  return (
    <div className="md:w-9/12 w-10/12 mx-auto py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start justify-between">
        {/* LEFT SIDE: Blog Text */}
        <div className="order-2 lg:order-1">
          <h1 className="lg:text-4xl text-2xl poppins text-black font-semibold mb-6">
            {blog.title}
          </h1>

          <div
            className="md:text-lg text-gray-700 poppins leading-relaxed max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />
        </div>

        {/* RIGHT SIDE: Sticky Image */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-24">
          <Image
            src={blog.image || noImg}
            alt={blog.title}
            width={800}
            height={800}
            className="w-60 md:w-96 object-cover rounded-xl shadow-md"
          />
        </div>
      </div>
    </div>
  );
}

'use client';
import Image from "next/image";
import Link from "next/link";
import useStore from "@/app/CustomHooks/useStore";

export default function Page() {
  const { blogs } = useStore();


  return (
    <div className="w-10/12 md:w-9/12 mx-auto pb-8 pt-4">
      <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16">
        {/* Blog posts grid */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:w-8/12">
          {blogs?.data && blogs.data.length > 0 ? (
            blogs.data.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg overflow-hidden w-full shadow-sm"
              >
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={300}
                  height={400}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                />
                <div className="p-4 text-black">
                  <h2 className="text-lg md:text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{post.date}</span>
                    <Link href={`/blogs/${post.id}`} className="text-blue-600 hover:underline">
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No blog posts available.</p>
          )}
        </div>

        {/* Recent posts sidebar */}
        <div className="lg:w-4/12 rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl md:text-2xl font-bold text-gray-900">Recent Posts</h2>
          <div className="divide-y divide-gray-100">
            {blogs?.data && blogs.data.length > 0 ? (
              blogs.data.map((post, index) => (
                <div key={index}>
                  <Link
                    href={`/blogs/${post.id}`}
                    className="flex items-start gap-4 py-4 transition-colors hover:bg-gray-50"
                  >
                    <Image
                      width={50}
                      height={50}
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="h-16 w-16 rounded-lg object-cover"
                      loading="lazy"
                    />
                    <h3 className="text-sm font-medium leading-snug text-gray-900">
                      {post.title}
                    </h3>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No recent posts</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

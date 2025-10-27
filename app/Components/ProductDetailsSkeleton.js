export default function ProductSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Breadcrumb Skeleton */}
      <div className="mb-6 flex items-center space-x-2 text-sm">
        <div className="h-4 w-10 animate-pulse rounded bg-gray-300"></div>
        <div className="h-4 w-4 animate-pulse rounded bg-gray-300"></div>
        <div className="h-4 w-20 animate-pulse rounded bg-gray-300"></div>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Side - Image Gallery */}
          <div>
            {/* Main Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-white p-6 shadow-sm">
              <div className="h-full w-full animate-pulse rounded-lg bg-gray-300"></div>
              <div className="absolute top-4 right-4 h-6 w-20 animate-pulse rounded-full bg-gray-300"></div>
            </div>

            {/* Thumbnails */}
            <div className="mt-4 flex items-center justify-center gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-20 w-16 overflow-hidden rounded-lg bg-white p-2 shadow-sm"
                >
                  <div className="h-full w-full animate-pulse rounded bg-gray-300"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6">
            {/* Brand */}
            <div className="flex items-center justify-between">
              <div className="h-6 w-16 animate-pulse rounded bg-gray-300"></div>
              <div className="h-6 w-6 animate-pulse rounded-full bg-gray-300"></div>
            </div>

            {/* Product Title */}
            <div className="h-8 w-2/3 animate-pulse rounded bg-gray-300"></div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <div className="h-8 w-32 animate-pulse rounded bg-gray-300"></div>
              <div className="h-6 w-24 animate-pulse rounded bg-gray-300"></div>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <div className="h-5 w-24 animate-pulse rounded bg-gray-300"></div>
              <div className="h-4 w-40 animate-pulse rounded bg-gray-200"></div>
              <div className="h-4 w-36 animate-pulse rounded bg-gray-200"></div>
              <div className="h-4 w-28 animate-pulse rounded bg-gray-200"></div>
              <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
            </div>

            {/* Color Selection */}
            <div className="space-y-2">
              <div className="h-5 w-28 animate-pulse rounded bg-gray-300"></div>
              <div className="flex gap-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 animate-pulse rounded-full bg-gray-300"
                  ></div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="w-full h-12 animate-pulse rounded-lg bg-gray-300"></div>
              <div className="w-full h-12 animate-pulse rounded-lg bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

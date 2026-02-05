return (
  <div className="w-full min-h-dvh lg:mb-10 relative">
    {/* Mobile header */}
    <ProductInfoMobile product={product.product} />

    <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-10 -mt-6 lg:mt-0">
      {/* Left Arrow */}
      {product.prevProduct.id !== null && (
        <div className="hidden md:block absolute top-24 -left-6 lg:-left-14 z-10 lg:hover:scale-105 transition-all hover:bg-[#259fd332] rounded-md shadow-xl group bg-white">
          <button
            onClick={() => handleProductIdChange("left")}
            className="h-28 w-8 flex justify-center items-center hover:-translate-x-0.5 transition-all"
          >
            <ArrowLeft strokeWidth="3" className="text-[#9a8c98]" />
          </button>
          <div className="absolute text-sm px-2 py-1 rounded top-0 right-full mr-2 hidden group-hover:flex transition justify-center items-center h-full w-fit">
            <div className="bg-gray-100 text-xs text-center px-4 py-2">
              <h2 className="font-semibold text-[#9a8c98] text-nowrap">
                {product.prevProduct.count}.{" "}
                <span className="text-wrap">
                  {formatName(product.prevProduct.name)}
                </span>
              </h2>
            </div>
          </div>
        </div>
      )}

      {/* Right Arrow */}
      {product.nextProduct.id !== null && (
        <div className="hidden md:block absolute top-24 -right-6 lg:-right-14 z-10 lg:hover:scale-105 transition-all hover:bg-[#259fd332] rounded-md shadow-xl group bg-white">
          <button
            onClick={() => handleProductIdChange("right")}
            className="h-28 w-8 flex justify-center items-center hover:translate-x-0.5 transition-all"
          >
            <ArrowRight strokeWidth="3" className="text-[#9a8c98]" />
          </button>
          <div className="absolute text-sm px-2 py-1 rounded top-0 left-full ml-2 hidden group-hover:flex transition justify-center items-center h-full w-fit">
            <div className="bg-gray-100 text-xs text-center px-4 py-2">
              <h2 className="font-semibold text-[#9a8c98] text-nowrap">
                {product.nextProduct.count + 2}.{" "}
                <span className="text-wrap">
                  {formatName(product.nextProduct.name)}
                </span>
              </h2>
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP: Header like PDF */}
      <div className="hidden md:block bg-white">
        <ProductInfo
          product={product.product}
          handleProductIdChange={handleProductIdChange}
          leftId={product.prevProduct.id}
        />
      </div>

      {/* Table FULL WIDTH under header */}
      <div className="mt-6">
        <ProductTable product={product.product} />
      </div>
    </div>
  </div>
);

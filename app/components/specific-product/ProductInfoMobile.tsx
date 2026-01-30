import React from 'react'

function ProductInfo({product}: any) {
  return (
    <div className="border-b-2 border-[#1d779e] px-2 relative pb-2 hidden md:block lg:hidden ">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-[#9a8c98] absolute bottom-2 left-10 leading-4">
            {product?.info}
          </h2>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-[#4a4e69] leading-6">
            {product?.name}
          </h2>
          <h2 className="text-sm font-semibold tracking-tight text-[#9a8c98] leading-3">
            {product?.subName}
          </h2>
        </div>
        {product?.addOn && (
          <div className="text-right absolute right-10 bottom-2">
            <h2 className="text-[12px] font-semibold tracking-tight text-[#9a8c98] leading-2">
              {product?.addOn[1]}
            </h2>
            <h2 className="text-xs font-bold tracking-tight text-[#4A4E69] uppercase">
              {product?.addOn[0]}
            </h2>
          </div>
        )}
      </div>
  )
}

export default ProductInfo

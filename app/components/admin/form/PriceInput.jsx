function PriceInput({ setProduct, objectId, product }) {
  

  function handlePriceChange(e) {
    const value = e.target.value;
    const ids = product.ids;

    const newObj = { ...ids[objectId], price: value };
    setProduct((prev) => ({
      ...prev,
      ids: prev.ids.map((item, index) =>
        index === objectId ? newObj : item
      ),
    }));
  }

  return (
    <div className="w-full flex justify-between items-center border-b pt-2 pb-2">
      <h2 className="text-[#4a4e69] font-semibold capitalize text-md">
        Price:
      </h2>
      <div className="flex items-center">
        <div>
          <input
            type="text"
            name="price"
            required
            className="border mb-1 border-[#9a8c98] rounded-md text-[#4a4e69] focus:outline-none ps-4 h-7 placeholder:text-sm ml-4"
            placeholder="Price"
            onChange={(e) => handlePriceChange(e)}
            defaultValue={product.ids[objectId].price}
          />
        </div>
      </div>
    </div>
  );
}

export default PriceInput;

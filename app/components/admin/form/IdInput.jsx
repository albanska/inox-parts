function IdInput({ setProduct, product, objectId }) {
  function handleOnChange(e) {
    const value = e.target.value;
    const ids = product.ids;

    const newObj = { ...ids[objectId], productId: value };
    setProduct((prev) => ({
      ...prev,
      ids: prev.ids.map((item, index) => (index === objectId ? newObj : item)),
    }));
  }
  return (
    <div className="w-full flex justify-between items-center border-b pt-2 pb-2">
      <label
        htmlFor={"productId"}
        className="text-[#4a4e69] font-semibold capitalize text-md"
      >
        Id:
      </label>

      <input
        type="text"
        name={"productId"}
        required
        className="ml-3 border border-[#9a8c98] rounded-md text-[#4a4e69] focus:outline-none ps-4 h-7 placeholder:text-sm"
        placeholder="21.200"
        onChange={(e) => handleOnChange(e)}
        value={product.ids[objectId].productId}
      />
    </div>
  );
}

export default IdInput;

function AddOnInput({ setProduct, product }) {
  function addAddOn() {
    setProduct((prev) => ({...prev, addOn: [...prev.addOn, ""]}))
  }

  function removeAddOn() {
    const newArr = [...product.addOn];
    newArr.pop();

    setProduct((prev) => ({...prev, addOn: newArr}))
  }

  function handleAddOnChange(e, id) {
    const value = e.target.value;
  
    setProduct((prev) => {
      const updatedAddOns = [...prev.addOn];
      updatedAddOns[id] = value;
  
      return {
        ...prev,
        addOn: updatedAddOns,
      };
    });
  }
  return (
    <div>
      <div className="w-full flex justify-between items-center relative pt-2 border-b pb-2">
        <label htmlFor="addOn" className="text-[#4a4e69] font-semibold">
          Add on:
        </label>
        <div className="flex flex-col gap-1">
          {product.addOn.map((addOn, idx) => (
            <input
              key={idx}
              type="text"
              name="addOn"
              required
              className="border border-[#9a8c98] rounded-md text-[#4a4e69] focus:outline-none ps-4 h-7"
              placeholder="3-teilig"
              onChange={(e) => handleAddOnChange(e, idx)}
              defaultValue={addOn}
            />
          ))}
          <div className=" flex justify-center items-center gap-2">
            <button
              className="border size-8 cursor-pointer rounded-lg opacity-50 hover:opacity-100 transition-all text-2xl"
              type="button"
              onClick={addAddOn}
            >
              +
            </button>
            {product.addOn.length > 0 && (
              <button
                className="border size-8 cursor-pointer rounded-lg opacity-50 hover:opacity-100 transition-all text-2xl"
                type="button"
                onClick={removeAddOn}
              >
                -
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddOnInput;

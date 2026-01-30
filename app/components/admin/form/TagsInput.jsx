function TagsInput({ setProduct, objectId, product }) {
  function handleOnChange(name, e) {
    const value = e.target.value;
    const ids = product.ids;

    const newObj = { ...ids[objectId], [name]: value };

    setProduct((prev) => ({
      ...prev,
      ids: prev.ids.map((item, index) => (index === objectId ? newObj : item)),
    }));
  }

  return (
    <div className="w-full border-b pt-2 pb-2">
      {Object.entries(product.ids[objectId]).map(([key, value]) => {
        if (key === "productId") return null;
        if (key === "price") return null;

        const titleMap = {
          typ: "typ",
          mm0: "Ø MM",
          lange: "länge mm",
          breite: "breite mm",
          hohe: "höhe mm",
        };

        return (
          <div
            className="flex justify-between items-center pt-1 pb-1 relative"
            key={key}
          >
            <label
              htmlFor={key}
              className="text-[#4a4e69] font-semibold capitalize text-md text-nowrap"
            >
              {titleMap[key] || key}:
            </label>
            <div className="flex items-center">
              <input
                type="text"
                name={key}
                required
                value={value}
                className="border border-[#9a8c98] rounded-md text-[#4a4e69] focus:outline-none ps-4 h-7 placeholder:text-sm placeholder:capitalize ml-4"
                placeholder={`${titleMap[key] || key}`}
                onChange={(e) => handleOnChange(key, e)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TagsInput;

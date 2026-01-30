function SelectPrice({selectedPrice, setProduct}) {
  function handleChangeType(type) {
    setProduct((prev) => ({ ...prev, priceOption: type }));
  }
  return (
    <div className="w-full flex justify-center items-center gap-4 mt-2">
      <button
        className={`${
          selectedPrice === "stk"
            ? "border-0 text-white bg-[#259ed3] scale-105"
            : "border cursor-pointer opacity-50 hover:opacity-100 transition-all "
        } rounded-lg text-sm flex-1/2 tracking-wider font-bold`}
        type="button"
        onClick={() => handleChangeType("stk")}
      >
        STK.
      </button>
      <button
        className={`${
          selectedPrice === "m"
            ? "border-0 text-white bg-[#259ed3] scale-105"
            : "border cursor-pointer opacity-50 hover:opacity-100 transition-all "
        } rounded-lg text-sm flex-1/2 tracking-wider font-bold`}
        type="button"
        onClick={() => handleChangeType("m")}
      >
        M.
      </button>
    </div>
  );
}

export default SelectPrice;

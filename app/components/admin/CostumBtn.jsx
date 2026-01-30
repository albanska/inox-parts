function CostumBtn({ isActive, text, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${
        isActive
          ? "border-0 text-white bg-[#259ed3] scale-105"
          : "border  opacity-50 hover:opacity-100 transition-all"
      } rounded-lg text-sm tracking-wider font-bold w-[90px] capitalize cursor-pointer`}
    >
      {text}
    </button>
  );
}

export default CostumBtn;

function CostumInput({ name, placeholder, type = "input", handleOnChange, value }) {

  return (
    <div className="w-full flex justify-between items-center border-b pt-2 pb-2">
      <label htmlFor={name} className="text-[#4a4e69] font-semibold capitalize text-md">
        {name}:
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          id={name}
          className="ml-3 border border-[#9a8c98] rounded-md text-[#4a4e69] focus:outline-none ps-4 placeholder:text-sm"
          placeholder={placeholder}
          onChange={(e) => handleOnChange(e, name)}
          value={value}
        ></textarea>
      ) : (
        <input
          type="text"
          name={name}
          required
          className="ml-3 border border-[#9a8c98] rounded-md text-[#4a4e69] focus:outline-none ps-4 h-7 placeholder:text-sm"
          placeholder={placeholder}
          onChange={(e) => handleOnChange(e, name)}
          defaultValue={value}
        />
      )}
    </div>
  );
}

export default CostumInput;

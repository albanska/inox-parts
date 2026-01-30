import CostumBtn from "../CostumBtn";

const types = [
  {
    title: "typ",
    subTitle: "type",
    placeholder: "rectangle",
    valueName: "typ",
  },
  { title: "Ø MM", subTitle: "Ø MM", placeholder: "218", valueName: "mm0" },
  {
    title: "länge mm",
    subTitle: "longueur mm",
    placeholder: "150",
    valueName: "lange",
  },
  {
    title: "breite mm",
    subTitle: "largeur mm",
    placeholder: "150",
    valueName: "breite",
  },
  {
    title: "höhe mm",
    subTitle: "hauteur mm",
    placeholder: "70 x 130",
    valueName: "hohe",
  },
];

function SelectType({ product, setProduct }) {
  function toggleType(type) {
    const fieldExists = product.ids[0]?.hasOwnProperty(type.valueName);

    if (fieldExists) {
      // Remove field from all objects in ids
      setProduct((prev) => ({
        ...prev,
        ids: prev.ids.map((obj) => {
          const { [type.valueName]: _, ...rest } = obj;
          return rest;
        }),
      }));
    } else {
      // Add field to all objects in ids
      setProduct((prev) => ({
        ...prev,
        ids: prev.ids.map((obj) => ({
          ...obj,
          [type.valueName]: "", // default empty value
        })),
      }));
    }
  }

  return (
    <div className="border-t mt-2 pt-2 flex flex-wrap justify-center items-center gap-1">
      {types.map((item, idx) => {
        const isActive = product.ids[0]?.hasOwnProperty(item.valueName);

        return (
          <CostumBtn
            key={idx}
            text={item.title}
            value={item.valueName}
            isActive={isActive}
            onClick={() => toggleType(item)}
          />
        );
      })}
    </div>
  );
}

export default SelectType;

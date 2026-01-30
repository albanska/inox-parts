"use client";
import IdInput from "./IdInput";
import AddOnInput from "./AddOnInput";
import PriceInput from "./PriceInput";
import TagsInput from "./TagsInput";
import SelectPrice from "./SelectPrice";
import SelectType from "./SelectType";
import { insertDataBasedOnId } from "@/lib/server/insertData";
import { useRouter } from "next/navigation";
import { addData } from "@/lib/server/addData";
import CostumInput from "./CostumInput";
import { Minus, Plus } from "lucide-react";

function Form({ product, setProduct, isPreview, isEdit, id }) {
  const router = useRouter();
  function handleOnChange(e, name) {
    const value = e.target.value;

    setProduct((prev) => ({ ...prev, [name]: value }));
  }

  function addIds() {
    setProduct((prev) => {
      const firstObject = prev.ids[0] || {};

      // Start with default fields
      const baseStructure = {
        productId: "",
        price: "",
      };

      // Merge with fields from first object
      const newObject = {
        ...baseStructure,
        ...Object.keys(firstObject).reduce((acc, key) => {
          acc[key] = "";
          return acc;
        }, {}),
      };

      return {
        ...prev,
        ids: [...prev.ids, newObject],
      };
    });
  }

  function removeIds() {
    const newArr = [...product.ids];

    newArr.pop();

    setProduct((prev) => ({ ...prev, ids: newArr }));
  }

  async function addProduct(data) {
    const tagMap = {
      productId: { title: "produkt nr.", subTitle: "Numéro de produit" },
      typ: { title: "typ", subTitle: "type" },
      mm0: { title: "Ø MM", subTitle: "Ø MM" },
      lange: { title: "länge mm", subTitle: "longueur mm" },
      breite: { title: "breite mm", subTitle: "largeur mm" },
      hohe: { title: "höhe mm", subTitle: "hauteur mm" },
      price: {
        title: `preis pro ${
          data.priceOption === "stk" ? data.priceOption : "m"
        }.`,
        subTitle: `prix par ${data.priceOption === "stk" ? "pcs" : "m"}.`,
      },
    };

    const availableKeys = Object.keys(tagMap).filter((key) =>
      data.ids[0]?.hasOwnProperty(key)
    );

    const fixedData = {
      name: data.name,
      subName: data.description,
      info: data.info,
      addOn: data.addOn,
      img: data.img,
      tags: availableKeys.map((key) => tagMap[key]),
      ids: data.ids.map((item) =>
        availableKeys.map((key) =>
          key === "price" ? `CHF ${item[key]}` : item[key]
        )
      ),
    };

    if (isEdit) {
      const isFinished = await insertDataBasedOnId(id, fixedData);

      if (!isFinished) {
        router.push("/admin");
      }
    } else {
      const isFinished = await addData(fixedData);

      if (!isFinished) {
        router.push("/admin");
      }
    }
  }

  return (
    <div
      className={`h-screen flex items-center  flex-col relative pt-10 flex-1/2  overflow-scroll`}
    >
      <div className="mb-2 my-10 absolute right-12 top-0 shadow-xl hover:scale-105 transition-all">
        <button
          type="button"
          className="w-[80px] cursor-pointer rounded-md bg-white"
          onClick={() => addProduct(product)}
        >
          {isEdit ? "Change" : "Add"}
        </button>
      </div>
      <div className="w-full mb-10">
        <form
          className={`flex gap-4 ${
            isPreview
              ? "px-10 flex-col items-center py-10 scroll h-screen flex-nowrap"
              : "flex-wrap justify-center"
          } `}
        >
          <div
            className={`w-full flex justify-center ${
              isPreview ? "flex-col-reverse gap-2 items-center" : ""
            }`}
          >
            <div className="p-4 flex flex-col bg-white shadow-xl rounded-md w-fit h-fit ">
              <>
                <CostumInput
                  name={"name"}
                  placeholder={"Kiesrahmen"}
                  handleOnChange={handleOnChange}
                  value={product.name}
                />
                <CostumInput
                  name={"description"}
                  placeholder={"Cadres Pour Gravier Type Réglable"}
                  type="textarea"
                  handleOnChange={handleOnChange}
                  value={product.description}
                />
                <CostumInput
                  name={"info"}
                  placeholder={"CrNi-Stahl"}
                  handleOnChange={handleOnChange}
                  value={product.info}
                />
                <AddOnInput setProduct={setProduct} product={product} />
                <SelectPrice
                  selectedPrice={product.priceOption}
                  setProduct={setProduct}
                />
                <SelectType product={product} setProduct={setProduct} />
              </>
            </div>
          </div>

          <div>
            <div className="flex gap-2 flex-wrap justify-center">
              {product.ids.map((id, idx) => {
                return (
                  <div
                    className="p-4 flex flex-col rounded-md w-fit h-fit bg-white shadow-xl"
                    key={idx}
                  >
                    <IdInput
                      objectId={idx}
                      product={product}
                      setProduct={setProduct}
                    />
                    <TagsInput
                      setProduct={setProduct}
                      objectId={idx}
                      product={product}
                    />
                    <PriceInput
                      setProduct={setProduct}
                      objectId={idx}
                      product={product}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <button
                className=" shadow-xl size-8 cursor-pointer rounded-lg hover:bg-white/100 transition-all text-2xl bg-white/50 overflow-hidden"
                type="button"
                onClick={addIds}
              >
                <Plus className="w-full h-full" />
              </button>
              {product.ids.length > 1 && (
                <button
                  className="shadow-xl size-8 cursor-pointer rounded-lg hover:bg-white/100 transition-all text-2xl bg-white/50"
                  type="button"
                  onClick={removeIds}
                >
                  <Minus className="w-full h-full" />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;

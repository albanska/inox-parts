export function transformProduct(product) {
  const tagMap = {
    "produkt nr.": "productId",
    "produkt nr": "productId",
    "art.-nr.": "productId",
    "art.-nr": "productId",
    "typ": "typ",
    "länge mm": "lange",
    "laenge mm": "lange",
    "breite mm": "breite",
    "höhe mm": "hohe",
    "hoehe mm": "hohe",
  };

  // ✅ SAFE: tags + ids always arrays
  const tags = Array.isArray(product?.tags) ? product.tags : [];
  const ids = Array.isArray(product?.ids) ? product.ids : [];

  const priceOptionTag = tags.find((tag) =>
    String(tag?.title || "").toLowerCase().includes("preis pro")
  );

  const transformedIds = ids.map((idArray) => {
    const mapped = {};

    tags.forEach((tag, idx) => {
      const title = String(tag?.title || "").toLowerCase().trim();
      const key = tagMap[title];

      const cell =
        Array.isArray(idArray) && idx < idArray.length ? idArray[idx] : "";

      if (title.startsWith("preis pro")) {
        mapped["price"] = String(cell).replace(/[^\d.,]/g, "").trim();
      } else if (key) {
        mapped[key] = cell;
      }
    });

    // fallback for productId if still missing
    if (!mapped.productId && Array.isArray(idArray) && idArray.length) {
      mapped.productId = idArray[0];
    }

    return mapped;
  });

  // ✅ SAFE unit parse
  let priceOption = "";
  if (priceOptionTag?.title) {
    const last = String(priceOptionTag.title).trim().split(" ").pop();
    priceOption = String(last || "").replace(".", "");
  }

  return {
    name: product?.name ?? "",
    description: product?.subName ?? "",
    info: product?.info ?? "",
    addOn: product?.addOn ?? "",
    img: product?.img ?? "",
    priceOption: priceOption || "m", // default
    ids: transformedIds, // array of objects
  };
}

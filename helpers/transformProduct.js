export function transformProduct(product) {
  // SAFE defaults
  const tags = Array.isArray(product?.tags) ? product.tags : [];
  const idsRaw = Array.isArray(product?.ids) ? product.ids : [];

  // map titujt -> keys
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

  // find unit: "preis pro m." / "preis pro stk."
  const priceOptionTag = tags.find((tag) =>
    String(tag?.title || "")
      .toLowerCase()
      .includes("preis pro")
  );

  // transform ids[][] -> ids[]
  const transformedIds = idsRaw.map((idArray) => {
    const mapped = {};

    tags.forEach((tag, idx) => {
      const title = String(tag?.title || "").toLowerCase().trim();
      const cell = Array.isArray(idArray) ? idArray[idx] : undefined;

      if (title.startsWith("preis pro")) {
        // keep only numbers
        mapped.price = String(cell ?? "")
          .replace(/[^\d.,]/g, "")
          .trim();
        return;
      }

      const key = tagMap[title];
      if (key) mapped[key] = cell ?? "";
    });

    // extra safety fallback if productId missing
    if (!mapped.productId) {
      // sometimes first column is the id
      if (Array.isArray(idArray) && idArray.length > 0) mapped.productId = idArray[0];
    }

    return mapped;
  });

  // extract unit (m / stk) safely
  let priceOption = "";
  if (priceOptionTag?.title) {
    const last = String(priceOptionTag.title).trim().split(" ").pop();
    priceOption = String(last || "").replace(".", "").toLowerCase(); // "m" or "stk"
  }

  return {
    name: product?.name ?? "",
    description: product?.subName ?? "",
    info: product?.info ?? "",
    addOn: product?.addOn ?? "",
    img: product?.img ?? "",
    priceOption: priceOption || "m",
    ids: transformedIds,
  };
}

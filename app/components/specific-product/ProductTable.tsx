import Image from "next/image";
import typ from "@/public/svgs/typ.svg";
import diam from "@/public/svgs/diam.svg";
import lange from "@/public/svgs/lange.svg";
import breite from "@/public/svgs/breite.svg";
import hohe from "@/public/svgs/hohe.svg";
import chf from "@/public/svgs/chf.svg";

function ProductTable({ product }: any) {
  if (!product?.tags || !product?.ids) {
    return <div className="p-4 text-gray-500">No product data available.</div>;
  }

  const tags = product.tags || [];
  const ids = product.ids || [];

  // Map tags to German and French labels
  const attributes = [
    { deLabel: "Art.-Nr.", frLabel: "N° d'art", key: "productId" },
    { deLabel: "Länge mm", frLabel: "Longueur mm", key: "lange" },
    { deLabel: "Breite mm", frLabel: "Largeur mm", key: "breite" },
    { deLabel: "Höhe mm", frLabel: "Hauteur mm", key: "hohe" },
    { deLabel: "Preis pro M.", frLabel: "Prix pro M.", key: "price" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          {/* Header row 1 (Deutsch) */}
          <tr className="bg-[#1f86d6] text-white">
            {attributes.map((attr, idx) => (
              <th
                key={`de-header-${idx}`}
                className="px-4 py-3 text-center font-semibold border border-gray-300"
              >
                {attr.deLabel}
              </th>
            ))}
          </tr>

          {/* Header row 2 (Français) */}
          <tr className="bg-[#4aa6e6] text-white">
            {attributes.map((attr, idx) => (
              <th
                key={`fr-header-${idx}`}
                className="px-4 py-3 text-center font-semibold border border-gray-300"
              >
                {attr.frLabel}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {ids.map((idRow: any, rowIdx: number) => {
            const articleId = Array.isArray(idRow) ? idRow[0] : "-";

            return (
              <tr
                key={`row-${rowIdx}`}
                className={rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                {attributes.map((attr, colIdx) => {
                  let value = "-";

                  if (attr.key === "productId") {
                    value = articleId;
                  } else if (attr.key === "price") {
                    // Price is usually the last column
                    value = Array.isArray(idRow) ? idRow[idRow.length - 1] : "-";
                  } else {
                    // Find the tag index based on key matching
                    const tagIdx = tags.findIndex((t: any) => {
                      const title = String(t?.title || "").toLowerCase();
                      return (
                        title.includes(attr.key) ||
                        (attr.key === "lange" && title.includes("länge")) ||
                        (attr.key === "hohe" && title.includes("höhe"))
                      );
                    });
                    
                    if (tagIdx >= 0 && Array.isArray(idRow) && tagIdx < idRow.length) {
                      value = idRow[tagIdx];
                    }
                  }

                  return (
                    <td
                      key={`cell-${rowIdx}-${colIdx}`}
                      className="px-4 py-3 text-center font-medium border border-gray-300"
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;

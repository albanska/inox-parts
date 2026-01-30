import getDataSupa from "@/lib/supabase-server/createSupaBaseClient";

export default async function getSpecificProduct(id) {
  const {data} = await getDataSupa()

  const arr = JSON.parse(data[0].data)


  const findProductIndex = arr.findIndex((item) =>
    item.ids.some((idArray) => idArray.includes(id))
  );

  const error = {
    id,
    status: "404",
  };

  if (findProductIndex === -1) return error;

  const product = arr[findProductIndex];

  const fullLength = arr.length;

  const prevProductId =
    findProductIndex > 0 ? arr[findProductIndex - 1].ids[0][0] : null;

  const nextProductId =
    findProductIndex + 1 < fullLength
      ? arr[findProductIndex + 1].ids[0][0]
      : null;

  return {
    product,
    prevProduct: {
      id: prevProductId,
      name: prevProductId ? arr[findProductIndex - 1].name : null,
      count: findProductIndex
    },
    nextProduct: {
      id: nextProductId,
      name: nextProductId ? arr[findProductIndex + 1].name : null,
      count: findProductIndex
    }
  }
}

"use server";

import { transformProduct } from "@/helpers/transformProduct";
import getDataSupa from "../supabase-server/createSupaBaseClient";

export async function getDataBasedOnId(id) {
  const { data } = await getDataSupa();
  const arr = JSON.parse(data[0].data);
  
  const index = arr.findIndex((product) =>
    product.ids.some((idArray) => idArray[0] === id)
  );

  if (index === -1) return null;
  return {
    index,
    product: transformProduct(arr[index]),
  };
}

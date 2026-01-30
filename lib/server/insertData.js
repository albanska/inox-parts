"use server";

import getDataSupa, {
  addDataSupa,
} from "../supabase-server/createSupaBaseClient";

export async function insertDataBasedOnId(index, data) {
  const { data: dt } = await getDataSupa();

  const arr = JSON.parse(dt[0].data);

  arr[index] = data;

  const result = await addDataSupa(dt[0].id, arr);

  if (result && result.error) {
    console.log("Error updating data:".result.error);
  }
}

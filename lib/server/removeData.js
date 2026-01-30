"use server";
import getDataSupa, {
  addDataSupa,
} from "../supabase-server/createSupaBaseClient";

export async function removeData(indexToRemove) {
  const { data } = await getDataSupa();
  const id = data[0].id;
  const arr = JSON.parse(data[0].data);
  arr.splice(indexToRemove, 1);

  const result = await addDataSupa(id, arr);

  if (result && result.error) {
    console.log(result.error);
  }
}

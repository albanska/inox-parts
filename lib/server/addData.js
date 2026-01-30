"use server";

import getDataSupa, { addDataSupa } from "../supabase-server/createSupaBaseClient";

export async function addData(data) {
  const { data: dt } = await getDataSupa();

  const id = dt[0].id;
  const arr = JSON.parse(dt[0].data);
  const newArr = [...arr, data];


  const addData = await addDataSupa(id, newArr)

  if(addData && addData.error) {
    console.log("Error adding data")
  }
}

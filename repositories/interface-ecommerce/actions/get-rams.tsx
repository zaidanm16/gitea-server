import { Ram } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/rams`;

const getRams = async (): Promise<Ram[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getRams;

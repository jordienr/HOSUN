import { APIType } from "@/app/api/[...route]/route";
import { hc } from "hono/client";

export const createAPI = () => {
  const client = hc<APIType>("");

  return client.api;
};

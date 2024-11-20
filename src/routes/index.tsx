import { RequestHandler } from "@builder.io/qwik-city";
export const onGet: RequestHandler = ({ redirect, url }) => {
  throw redirect(308, new URL("/countries", url).toString());
};

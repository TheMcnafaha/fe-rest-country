import { component$, Slot } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export type CountryResponse = {
  name: {
    common: string;
    official: string;
    nativeName: {
      [language: string]: { official: string; common: string };
    };
  };
  population: number;
  region: string;
  subregion: string;
  capital: string;
  flags: {
    svg: string;
  };
  tld: string;
  currencies: {
    [x: string]: { name: string };
  };
  languages: {
    [x: string]: string;
  };
  borders?: Array<string>;
  cca3: string;
};

export default component$(() => {
  return (
    <div class="bg-red-400 p-3">
      <Slot />
    </div>
  );
});

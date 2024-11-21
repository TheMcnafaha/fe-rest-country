import {
  component$,
  createContextId,
  Signal,
  Slot,
  useContextProvider,
} from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";

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

export const useAllCountries = routeLoader$(async ({ cacheControl }) => {
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 60,
  });

  const delay = (timeout: number) => {
    return new Promise((res) => setTimeout(res, timeout));
  };
  const queryString = "https://restcountries.com/v3.1/all";
  const res = await fetch(queryString);
  const data = await res.json();
  await delay(4_000);
  console.log("MyData " + Math.random());
  return data as Array<CountryResponse>;
});
export const AllCountriesContext =
  createContextId<Signal<CountryResponse[]>>("all.country-data");
export default component$(() => {
  const allCountriesSig = useAllCountries();

  useContextProvider(AllCountriesContext, allCountriesSig);
  return (
    <>
      <div class="flex flex-col items-center">
        <header class="  flex w-full justify-center bg-white px-3 py-6">
          <div class="flex w-full max-w-md   justify-between">
            <h1>Where in the world?</h1>
            <p>Dark Mode</p>
          </div>
        </header>
        <main class="py-3 ">
          <div class=" flex max-w-md flex-col items-center">
            <Slot />
          </div>
        </main>
      </div>
    </>
  );
});

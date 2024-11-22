import {
  component$,
  createContextId,
  Resource,
  Signal,
  Slot,
} from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import { ContextWrapper } from "~/components/countries/context-wrapper";

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

export const useAllCountries = routeLoader$(() => {
  return async () => {
    const queryString = "https://restcountries.com/v3.1/all";
    const res = await fetch(queryString);
    const data = await res.json();
    return data as Array<CountryResponse>;
  };
});
export const AllCountriesContext =
  createContextId<Signal<CountryResponse[]>>("all.country-data");
export default component$(() => {
  const allCountriesSig = useAllCountries();
  return (
    <div class="bg-red-400 p-3">
      <Resource
        value={allCountriesSig}
        onResolved={(data) => {
          return (
            <ContextWrapper context={data}>
              <Slot />
            </ContextWrapper>
          );
        }}
      />{" "}
    </div>
  );
});

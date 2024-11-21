import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { RenderCountries } from "~/components/countries/render-countries";

export type CountryResponse = {
  name: {
    common: string;
    official: string;
    native: string;
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
};

export const useAllCountries = routeLoader$(async () => {
  const queryString = "https://restcountries.com/v3.1/all";
  const res = await fetch(queryString);
  const data = await res.json();
  return data as Array<CountryResponse>;
});
export default component$(() => {
  const allCountriesSig = useAllCountries();
  return (
    <div class="">
      <RenderCountries countries={allCountriesSig.value} />
    </div>
  );
});

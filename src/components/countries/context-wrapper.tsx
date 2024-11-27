import {
  type Signal,
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import { type CountryResponse } from "~/routes/layout";

export const SearchStringContext =
  createContextId<Signal<string>>("search.strg");
export const AllCountriesContext =
  createContextId<Signal<CountryResponse[]>>("all.country-data");
export const ContextWrapper = component$(() => {
  const allCountriesSig = useSignal<CountryResponse[]>([]);
  const searchStrgSig = useSignal("");
  useTask$(async () => {
    let json;

    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,region,subregion,capital,tld,languages,borders,cca3,currencies",
      );
      json = (await response.json()) as CountryResponse[];
    } catch (error) {
      if (error instanceof SyntaxError) {
        // Unexpected token < in JSON
        console.log("There was a SyntaxError", error);
      } else {
        console.log("There was an error", error);
      }
    }

    if (json) {
      const date = new Date();
      console.log("QUERYING: ", date.toLocaleTimeString());
      json.sort((a, b) => {
        const nameA = a.name.common.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.common.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      allCountriesSig.value = json;
    }
  });
  useContextProvider(SearchStringContext, searchStrgSig);
  useContextProvider(AllCountriesContext, allCountriesSig);
  return (
    <div class="p-4">
      <Slot />
    </div>
  );
});

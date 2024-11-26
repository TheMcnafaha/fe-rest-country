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

export const AllCountriesContext =
  createContextId<Signal<CountryResponse[]>>("all.country-data");
export const ContextWrapper = component$(() => {
  const allCountriesSig = useSignal<CountryResponse[]>([]);
  useTask$(async () => {
    let json;

    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,region,subregion,capital,tld,languages,borders,cca3,currencies",
      );
      json = await response.json();
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
      allCountriesSig.value = json;
    }
  });
  useContextProvider(AllCountriesContext, allCountriesSig);
  return (
    <div class="p-4">
      <Slot />
    </div>
  );
});

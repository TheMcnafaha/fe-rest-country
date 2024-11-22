import {
  Signal,
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import { CountryResponse } from "~/routes/layout";

export const AllCountriesContext =
  createContextId<Signal<CountryResponse[]>>("all.country-data");
export const ContextWrapper = component$(() => {
  const allCountriesSig = useSignal<CountryResponse[]>([]);
  useTask$(async () => {
    const queryString = "https://restcountries.com/v3.1/all";
    const res = await fetch(queryString);
    const data = await res.json();
    console.log("all data: ", data);
    allCountriesSig.value = data;
  });
  useContextProvider(AllCountriesContext, allCountriesSig);
  return (
    <div class="bg-blue-500 p-4">
      <Slot />
    </div>
  );
});

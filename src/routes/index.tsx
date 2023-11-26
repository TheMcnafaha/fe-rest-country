import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import {
  routeLoader$,
  type DocumentHead,
  routeAction$,
} from "@builder.io/qwik-city";
import { CountrySelect } from "~/components/country-select/country-select";
import { type TypeNation } from "~/components/simple-nation/simple-nation";
import { SearchBar } from "~/components/search-bar/search-bar";
import { SimpleNations } from "~/components/simple-nations/simple-nations";
import type { QueryResponse } from "./countries/[country]";
type FailedResponse = {
  status: number;
  message: string;
};
export const useSearchCountry = routeAction$(async (props, { fail }) => {
  const response = await fetch(
    "https://restcountries.com/v3.1/name/" + props.query,
  );
  const magic = (await response.json()) as QueryResponse | FailedResponse;
  const isErrObj = Object.keys(magic).length == 2;
  if (isErrObj) {
    return fail(404, { message: "Country not found :(" });
  }
  const bewitched = magic as QueryResponse;
  return { id: bewitched[0].cca3 };
});
export const useDefaultContries = routeLoader$(async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const magic = (await response.json()) as QueryResponse;
  const nations: TypeNation[] = [];
  for (let index = 0; index < magic.length; index++) {
    const element = {
      common_name: magic[index].name.common,
      region: magic[index].region,
      capital: magic[index].capital,
      population: magic[index].population.toLocaleString("en-US"),
      flag: magic[index].flags.svg,
      official_name: magic[index].name.official,
      id: magic[index].cca3,
    } as TypeNation;
    nations.push(element);
  }
  nations.sort((a, b) => {
    return a.common_name.localeCompare(b.common_name);
  });
  return nations;
});
export default component$(() => {
  const help = useDefaultContries();
  const searchStrg = useSignal("");
  const filteredNations = help.value.filter((nation) => {
    if (searchStrg.value === "") {
      return true;
    }
    const regions = /^(Africa)|(Asia)|(Americas)|(Europe)|(Oceania)$/;
    const isRegion = regions.test(searchStrg.value);
    if (isRegion) {
      return nation.region === searchStrg.value;
    }
    const size = searchStrg.value.length;
    const search = searchStrg.value.toLowerCase();
    const isCommonName =
      nation.common_name.toLowerCase().substring(0, size) === search;
    const isOfficialName =
      nation.official_name.toLowerCase().substring(0, size) === search;
    const isId = nation.id.toLowerCase().substring(0, size) === search;
    return isCommonName || isOfficialName || isId;
  });
  useTask$(async ({ track }) => {
    track(() => {
      searchStrg.value;
    });
  });
  return (
    <>
      <div class="w-full justify-between lg:flex">
        <SearchBar inputSignal={searchStrg} />
        <CountrySelect inputSignal={searchStrg} />
      </div>
      <div class="flex  flex-col items-center px-4 lg:px-0">
        <div class="w-full">
          <SimpleNations nations={filteredNations}></SimpleNations>
        </div>
      </div>
    </>
  );
});

// <SimpleNation nation={help} />
export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};

import {
  component$,
  useOnDocument,
  $,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import {
  routeLoader$,
  type DocumentHead,
  Form,
  routeAction$,
  useNavigate,
} from "@builder.io/qwik-city";
import { CountrySelect } from "~/components/country-select/country-select";
import { type TypeNation } from "~/components/simple-nation/simple-nation";
import { SearchBar } from "~/components/search-bar/search-bar";
import { SimpleNations } from "~/components/simple-nations/simple-nations";
import type { QueryResponse } from "./countries/[country]";
const defaults = ["DEU", "USA", "BRA", "ISL", "AFG", "ALA", "ALB", "DZA"];
type FailedResponse = {
  status: number;
  message: string;
};
type SvgInHtml = HTMLElement & SVGElement;
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
  const query = defaults.reduce((p, c) => {
    return p + "," + c;
  });
  const response = await fetch(
    "https://restcountries.com/v3.1/alpha?codes=" + query,
  );
  const magic = await response.json();
  const nations: TypeNation[] = [];
  for (let index = 0; index < defaults.length; index++) {
    const element = {
      common_name: magic[index].name.common,
      region: magic[index].region,
      capital: magic[index].capital[0],
      population: magic[index].population,
      flag: magic[index].flags.svg,
      official_name: magic[index].name.official,
      id: magic[index].cca3,
    } as TypeNation;
    nations.push(element);
  }

  return nations;
});
export default component$(() => {
  const help = useDefaultContries();
  const searchBar = useSearchCountry();
  const getSearch = useNavigate();
  const nations = useSignal<undefined | TypeNation[]>(undefined);
  const isArr = nations.value !== undefined;
  const trigger = useSignal(false);
  if (searchBar.value?.id) {
    getSearch(`/countries/${searchBar.value.id}`);
  }

  useOnDocument(
    "load",
    $(async () => {
      localStorage.setItem("working", "success");
      const local = localStorage.getItem("nations");
      if (local === null) {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = (await res.json()) as QueryResponse;
        const correct: TypeNation[] = data.map((e) => {
          return {
            common_name: e.name.common,
            id: e.cca3,
            official_name: e.name.official,
            region: e.region,
            capital: e.capital,
            population: e.population,
            flag: e.flags.svg,
          };
        });
        nations.value = correct;
        localStorage.setItem("nations", JSON.stringify(correct));
      } else {
        // const magic = await JSON.parse(local);
        if (nations.value === undefined) {
          nations.value = JSON.parse(local);
        }
      }
      trigger.value = !trigger.value;
    }),
  );
  useTask$(({ track }) => {
    track(() => trigger.value);
  });
  return (
    <>
      <Form action={searchBar}>
        <SearchBar />
        {searchBar.value?.failed && <p>{searchBar.value.message}</p>}
      </Form>
      <CountrySelect />
      <div class="flex  flex-col items-center px-4 lg:px-0">
        <div class="w-full">
          <SimpleNations nations={help.value}></SimpleNations>
        </div>
        <h1>Hi 👋</h1>
        <p>
          Can't wait to see what you build with qwik!
          <br />
          Happy coding.
        </p>
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

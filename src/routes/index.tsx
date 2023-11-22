import { component$ } from "@builder.io/qwik";
import {
  routeLoader$,
  type DocumentHead,
  Form,
  routeAction$,
  useNavigate,
} from "@builder.io/qwik-city";
import { CountrySelect } from "~/components/country-select/country-select";
import {
  SimpleNation,
  type TypeNation,
} from "~/components/simple-nation/simple-nation";
import { SearchBar } from "~/components/search-bar/search-bar";
import { SimpleNations } from "~/components/simple-nations/simple-nations";
import type { QueryResponse } from "./countries/[country]";
const defaults = ["DEU", "USA", "BRA", "ISL", "AFG", "ALA", "ALB", "DZA"];
type FailedResponse = {
  status: number;
  message: string;
};
export const useSearchCountry = routeAction$(async (props, { fail }) => {
  console.log("me server is le data ", props);
  const response = await fetch(
    "https://restcountries.com/v3.1/name/" + props.query,
  );
  const magic = (await response.json()) as QueryResponse | FailedResponse;
  const isErrObj = Object.keys(magic).length == 2;
  if (isErrObj) {
    console.log("you suck ", magic);
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
  console.log("hlp ", help.value);
  if (searchBar.value?.id) {
    getSearch(`/countries/${searchBar.value.id}`);
  }
  // console.log(JSON.stringify(help));

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
          <SimpleNation nation={help.value[0]} />
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

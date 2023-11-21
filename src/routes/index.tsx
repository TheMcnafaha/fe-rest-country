import { component$ } from "@builder.io/qwik";
import {
  routeLoader$,
  type DocumentHead,
  Form,
  routeAction$,
} from "@builder.io/qwik-city";
import { CountrySelect } from "~/components/country-select/country-select";
import {
  SimpleNation,
  TypeNation,
} from "~/components/simple-nation/simple-nation";
import { SearchBar } from "~/components/search-bar/search-bar";
import { SimpleNations } from "~/components/simple-nations/simple-nations";
const defaults = ["DEU", "USA", "BRA", "ISL", "AFG", "ALA", "ALB", "DZA"];
export const useSearchCountry = routeAction$(async (props) => {
  console.log("me server is le data ", props);
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
  console.log("hlp ", help.value);

  // console.log(JSON.stringify(help));

  return (
    <>
      <div class="flex  flex-col items-center px-4">
        <Form action={searchBar}>
          <SearchBar />
        </Form>
        <CountrySelect />
        <div class="">
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

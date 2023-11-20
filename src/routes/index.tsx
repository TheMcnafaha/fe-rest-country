import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { CountrySelect } from "~/components/country-select/country-select";
import {
  SimpleNation,
  TypeNation,
} from "~/components/simple-nation/simple-nation";
import { SearchBar } from "~/components/search-bar/search-bar";
import { SimpleNations } from "~/components/simple-nations/simple-nations";
// ["DEU", "USA", "BRA", "ISL", "AFG", "ALA", "ALB", "DZA"]
const defaults = ["DEU", "USA"];
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
    };
    nations.push(element);
  }

  return nations;
});
export default component$(() => {
  const help = useDefaultContries();
  console.log("hlp ", help.value);

  // console.log(JSON.stringify(help));

  return (
    <>
      <div class="flex max-w-[300px] flex-col items-center px-4">
        <SearchBar />
        <CountrySelect />
        <div class="-z-20">
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

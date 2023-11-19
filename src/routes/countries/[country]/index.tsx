import { component$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
type Nation = {
  common_name: string;
  region: string;
  capital: string;
  population: number;
  flag: string;
};
export const useCountryAPI = routeLoader$(async (requestEvent) => {
  // This code runs only on the server, after every navigation
  const res = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${requestEvent.params.country}`,
  );
  const country = await res.json();
  const nation: Nation = {
    common_name: country[0].name.common,
    region: country[0].region,
    capital: country[0].capital[0],
    population: country[0].population,
    flag: country[0].flags.svg,
  };
  return nation as Nation;
});
export default component$(() => {
  const id = useLocation().params.country;
  const country = useCountryAPI();
  const nation = country.value;
  return (
    <>
      <div>New route works. Check this out: {id}</div>
      <h2>{country.value.common_name}</h2>
      <ul>
        {Object.keys(nation).map((item) => (
          <li key={item} class="text-xl">
            {item}: {nation[item as keyof Nation]}{" "}
          </li>
        ))}
      </ul>
    </>
  );
});

import { component$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
type Nation = {
  common_name: string;
  region: string;
  capital: string;
  population: number;
  flag: string;
};
type LinkNation = {
  id: string;
  common_name: string;
};
type ExtendedNation = {
  official_name: string;
  native_name: string;
  sub_region: string;
  capital: string;
  population: number;
  flag: string;
  tld: string;
  currencies: string;
  languages: string[];
  border_nations: LinkNation[];
};
export const useCountryAPI = routeLoader$(async (requestEvent) => {
  // This code runs only on the server, after every navigation
  const res = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${requestEvent.params.country}`,
  );
  const country = await res.json();
  const single = country[0];
  const nativeKey = Object.keys(single.name.nativeName)[0];
  const currenciesKey = Object.keys(single.currencies);
  const allCurrencies = currenciesKey.reduce((total, key) => {
    return total + single.currencies[key].name + ",";
  }, "");
  const allBorders = single.borders;
  const magic = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${allBorders}`,
  );
  const done = (await magic.json()) as Nation[];
  const allLinkNations: LinkNation[] = done.map((nation) => {
    return {
      id: nation.cca3,
      common_name: nation.name.common,
    };
  });
  console.log("im magiv ", magic);
  console.log("im done ", done);
  console.log("im all ", allLinkNations);

  const nation: ExtendedNation = {
    official_name: country[0].name.official,
    native_name: single.name.nativeName[nativeKey].official,
    sub_region: country[0].subregion,
    capital: country[0].capital[0],
    population: country[0].population,
    flag: country[0].flags.svg,
    tld: single.tld,
    currencies: allCurrencies,
    border_nations: allBorders,
  };
  return nation as Nation;
});
export default component$(() => {
  const id = useLocation().params.country;
  const country = useCountryAPI();
  const nation = country.value;
  console.log("my fav nation ", nation);

  return (
    <>
      <div>New route works. Check this out: {id}</div>
      <h2>{country.value.common_name}</h2>
      <img src={nation.flag} alt="" />
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

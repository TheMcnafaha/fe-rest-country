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
  region: string;
  sub_region: string;
  capital: string;
  population: number;
  flag: string;
  tld: string;
  currencies: string;
  languages: string;
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
  const langKeys = Object.keys(single.languages);
  const currenciesKeys = Object.keys(single.currencies);
  const allLangs = langKeys.map((key) => {
    return single.languages[key];
  });
  const allCurrencies = currenciesKeys.map((key) => {
    return single.currencies[key].name;
  });
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
  function toSentence(input: string[]) {
    if (input.length === 1) {
      return input[0];
    }
    return input.reduce((p, c) => {
      return p + ", " + c;
    });
  }
  console.log("im magiv ", magic);
  console.log("im done ", done);
  console.log("im all ", allLinkNations);

  const nation: ExtendedNation = {
    official_name: country[0].name.official,
    native_name: single.name.nativeName[nativeKey].official,
    sub_region: country[0].subregion,
    region: single.region,
    capital: country[0].capital[0],
    population: country[0].population,
    flag: country[0].flags.svg,
    tld: single.tld,
    currencies: toSentence(allCurrencies),
    border_nations: allLinkNations,
    languages: toSentence(allLangs),
  };
  return nation;
});
export default component$(() => {
  const id = useLocation().params.country;
  const country = useCountryAPI();
  const nation = country.value;
  const firstDescription = [
    "native_name",
    "population",
    "region",
    "sub_region",
    "capital",
  ] as const;
  const secondDescription = ["tld", "currencies", "languages"] as const;
  console.log("my fav nation ", nation);

  return (
    <>
      <div>New route works. Check this out: {id}</div>
      <h2>{nation.official_name}</h2>
      <img src={nation.flag} alt="" />
      <ul>
        {firstDescription.map((key) => {
          return (
            <li>
              {key}: {nation[key]}
            </li>
          );
        })}
      </ul>
      <ul>
        {secondDescription.map((key) => {
          return (
            <li>
              {key}: {nation[key]}
            </li>
          );
        })}
      </ul>
      <h3>Border Countries:</h3>
      <ul>
        {nation.border_nations.map((nation) => {
          return (
            <a href={`/countries/${nation.id}`}>
              {" "}
              <li>{nation.common_name}</li>
            </a>
          );
        })}
      </ul>
      {/* 
      <ul>
        {Object.keys(nation).map((item) => (
          <li key={item} class="text-xl">
            {item}: {nation[item as keyof Nation]}{" "}
          </li>
        ))}
      </ul> */}
    </>
  );
});

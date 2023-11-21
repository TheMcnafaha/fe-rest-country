import { component$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import { BackButton } from "~/components/back-button/back-button";
export type QueryObj = {
  name: {
    common: string;
    official: string;
    nativeName: { [key: string]: { official: string } };
  };
  region: string;
  subregion: string;
  languages: { [key: string]: string };
  capital: Array<string>;
  population: number;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  tld: Array<string>;
  cca3: string;
  currencies: { [key: string]: { name: string; symbol: string } };
  borders: Array<string>;
};
export type QueryResponse = Array<QueryObj>;
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
  const country = (await res.json()) as QueryResponse;
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
  const done = (await magic.json()) as QueryResponse;
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
    tld: single.tld[0],
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
  const fDTitle = [
    "Native Name",
    "Population",
    "Region",
    "Sub Region",
    "Capital",
  ];

  const sDTitle = ["Top Level Domain", "Currencies", "Languages"];
  const secondDescription = ["tld", "currencies", "languages"] as const;
  console.log("my fav nation ", nation);

  return (
    <>
      <div class="flex max-w-xs flex-col gap-4 p-4">
        <BackButton />
        <img src={nation.flag} alt="" />
        <h2 class="font-extrabold">{nation.official_name}</h2>
        <ul>
          {firstDescription.map((key, index) => {
            return (
              <li>
                <span class="font-semibold">{fDTitle[index]}</span>:{" "}
                {nation[key]}
              </li>
            );
          })}
        </ul>
        <ul>
          {secondDescription.map((key, index) => {
            return (
              <li>
                <span class="font-semibold">{sDTitle[index]}</span>:{" "}
                {nation[key]}
              </li>
            );
          })}
        </ul>
        <div class="mt-3">
          <h4 class="mb-3 font-semibold">Border Countries:</h4>
          <ul class="flex flex-wrap gap-4">
            {nation.border_nations.map((nation) => {
              return (
                <a
                  href={`/countries/${nation.id}`}
                  class="justify-center rounded-sm bg-[white] px-3 py-1 drop-shadow-md"
                >
                  {" "}
                  <li>{nation.common_name}</li>
                </a>
              );
            })}
          </ul>
        </div>
        {/* 
      <ul>
        {Object.keys(nation).map((item) => (
          <li key={item} class="text-xl">
            {item}: {nation[item as keyof Nation]}{" "}
          </li>
        ))}
      </ul> */}
      </div>
    </>
  );
});

import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
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
  capital: string;
  population: number;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  tld: Array<string>;
  cca3: string;
  currencies: { [key: string]: { name: string; symbol: string } };
  borders: Array<string> | undefined;
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
  population: string;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  tld: string;
  currencies: string;
  languages: string;
  border_nations: LinkNation[] | undefined;
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
  // sometimes we have a valid country that doesn't have borders :(
  // TODO: update TS type to accomadate this condition
  const allBorders = single.borders as undefined | string[];
  let allLinkNations: LinkNation[] = [];
  if (allBorders) {
    const magic = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${allBorders}`,
    );
    const done = (await magic.json()) as QueryResponse;
    allLinkNations = done.map((nation) => {
      return {
        id: nation.cca3,
        common_name: nation.name.common,
      };
    });
  }
  function toSentence(input: string[]) {
    if (input.length === 1) {
      return input[0];
    }
    return input.reduce((p, c) => {
      return p + ", " + c;
    });
  }

  const nation: ExtendedNation = {
    official_name: country[0].name.official,
    native_name: single.name.nativeName[nativeKey].official,
    sub_region: country[0].subregion,
    region: single.region,
    capital: country[0].capital[0],
    population: country[0].population.toLocaleString("en-US"),
    flags: country[0].flags,
    tld: single.tld[0],
    currencies: toSentence(allCurrencies),
    border_nations: allLinkNations,
    languages: toSentence(allLangs),
  };
  return nation;
});
export default component$(() => {
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

  return (
    <>
      <div class="mb-4  flex w-full  flex-col    items-center gap-4 self-center px-4 py-8">
        <div class="self-start">
          <BackButton />
        </div>
        <div class="lg:flex  lg:w-full lg:justify-between lg:gap-12">
          <div class="bg-dark-gray lg:flex lg:h-fit lg:w-1/2 ">
            <img
              src={nation.flags.svg}
              alt={`flag of ${nation.official_name}`}
              class="h-full w-full bg-dark-gray drop-shadow-sm  "
            />
          </div>
          <div class="lg:flex lg:w-1/2 lg:flex-col lg:justify-center">
            <h2 class="mb-10 mt-8 text-2xl font-extrabold lg:col-span-2 lg:mb-8 lg:mt-0 lg:text-4xl">
              {nation.official_name}
            </h2>
            <div>
              <div class=" mb-10 text-lg lg:mb-0 lg:flex lg:justify-between lg:gap-6 lg:text-lg">
                <ul class="mb-10 lg:mb-6 lg:w-1/2">
                  {firstDescription.map((key, index) => {
                    return (
                      <li key={index} class="mb-4">
                        <span class="font-semibold">{fDTitle[index]}</span>:{" "}
                        {nation[key]}
                      </li>
                    );
                  })}
                </ul>
                <ul class="mb-6">
                  {secondDescription.map((key, index) => {
                    return (
                      <li key={index} class="mb-4">
                        <span class="font-semibold">{sDTitle[index]}</span>:{" "}
                        {nation[key]}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div class="mt-3">
              <h4 class="mb-3 text-xl  font-semibold">Border Countries:</h4>
              <ul class="flex flex-wrap gap-4">
                {nation.border_nations !== undefined &&
                  nation.border_nations.map((nation) => {
                    return (
                      <a
                        key={nation.id}
                        href={`/countries/${nation.id}`}
                        class="justify-center rounded-sm bg-[white] px-3 py-1 drop-shadow-md dark:bg-dark-blue lg:text-lg"
                      >
                        {" "}
                        <li>{nation.common_name}</li>
                      </a>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
export const head: DocumentHead = {
  title: `Countries API`,
  meta: [
    {
      name: "description",
      content: "A frontend mentor challenge",
    },
  ],
};

import { component$ } from "@builder.io/qwik";
import { CountryResponse } from "~/routes/layout";

export type RenderCountriesProps = { countries: Array<CountryResponse> };
export const RenderCountries = component$<RenderCountriesProps>(
  ({ countries }) => {
    return (
      <div class="flex flex-col gap-8 px-3">
        {countries.map((country) => {
          return <SingleCountry country={country} />;
        })}
      </div>
    );
  },
);
type SingleCountryProps = {
  country: CountryResponse;
};
const SingleCountry = component$<SingleCountryProps>(({ country }) => {
  return (
    <article class="grid max-h-96 max-w-sm grid-rows-2 rounded-b-md bg-white ">
      <img
        class="h-full w-full rounded-t-md object-cover"
        src={country.flags.svg}
        alt={`flag of ${country.name.official}`}
      />
      <div class="pl-6 pt-6">
        <SPANav heading={country.name.official} cca3={country.cca3} />
        <Description heading="Population" text={country.population} />
        <Description heading="Region" text={country.region} />
        <Description heading="Capital" text={country.capital} />
      </div>
    </article>
  );
});

type DescriptionProps = {
  heading: string;
  text: string | number;
};
const Description = component$<DescriptionProps>(({ heading, text }) => {
  return (
    <p class="text-sm">
      <span class=" font-semibold">{heading}</span>: {text}
    </p>
  );
});

type SPANavProps = {
  heading: string;
  cca3: string;
};
const SPANav = component$<SPANavProps>(({ heading, cca3 }) => {
  return (
    <h3 class="mb-2 text-lg font-bold">
      <a href={`/countries/${cca3}`}>
        <span class=" font-bold">{heading}</span>
      </a>
    </h3>
  );
});

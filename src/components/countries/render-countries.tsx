import { component$ } from "@builder.io/qwik";
import { CountryResponse } from "~/routes/countries";

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
        <h3 class="text-lg font-bold">{country.name.official}</h3>
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

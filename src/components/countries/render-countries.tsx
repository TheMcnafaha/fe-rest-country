import { component$ } from "@builder.io/qwik";
import { Description } from "../description/description";
import { CountryResponse } from "~/routes/layout";
import { Link } from "@builder.io/qwik-city";

export type RenderCountriesProps = { countries: Array<CountryResponse> };
export const RenderCountries = component$<RenderCountriesProps>(
  ({ countries }) => {
    return (
      <div class="flex flex-col gap-8 px-3">
        {countries.map((country) => {
          return <SingleCountry key={country.cca3} country={country} />;
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
    <article class="grid h-96  max-w-sm grid-rows-2 rounded-b-md rounded-t-md bg-white ">
      <img
        class="h-full  rounded-t-md object-cover"
        loading="lazy"
        decoding="async"
        width={384}
        height={192}
        src={country.flags.svg}
        alt={`flag of ${country.name.official}`}
      />
      <div class="border-t-2 py-6 pl-6 pr-2">
        <SPANav heading={country.name.common} cca3={country.cca3} />
        <ul>
          <Description heading="Population" text={country.population} />
          <Description heading="Region" text={country.region} />
          <Description heading="Capital" text={country.capital} />
        </ul>
      </div>
    </article>
  );
});

type SPANavProps = {
  heading: string;
  cca3: string;
};
const SPANav = component$<SPANavProps>(({ heading, cca3 }) => {
  return (
    <h3 class="mb-2 text-lg font-bold">
      <Link href={`/countries/${cca3}`}>
        <span class=" font-bold">{heading}</span>
      </Link>
    </h3>
  );
});

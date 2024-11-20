import { component$ } from "@builder.io/qwik";
import { CountryResponse } from "~/routes/countries";

export type RenderCountriesProps = { countries: Array<CountryResponse> };
export const RenderCountries = component$<RenderCountriesProps>(
  ({ countries }) => {
    return (
      <div>
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
    <article>
      <h3>{country.name.official}</h3>
    </article>
  );
});

import { component$, useContext } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { Description } from "~/components/description/description";
import { AllCountriesContext } from "../layout";

export default component$(() => {
  const allCountriesSig = useContext(AllCountriesContext);
  const loc = useLocation();

  const country = allCountriesSig.value.find(
    (country) => country.cca3 === loc.params.cca3.toUpperCase(),
  );
  if (country === undefined) {
    return <BadCCA3 />;
  }
  const langs = Object.keys(country.name.nativeName);
  const allNativeNames = langs.map(
    (lang) => country.name.nativeName[lang].common,
  );
  const inlinedNativeNames = allNativeNames.reduce((p, n) => {
    return p.concat(", ", n);
  });
  const currs = Object.keys(country.currencies);
  const allCurrs = currs.map((curr) => country.currencies[curr].name);
  const inlinedCurrs = allCurrs.reduce((p, n) => {
    return p.concat(", ", n);
  });
  console.log(country.borders);

  return (
    <div>
      <img src={country.flags.svg} alt={`flag of ${country.name.common}`} />
      <h3>{country.name.common}</h3>
      <ul>
        <Description
          heading={allNativeNames.length === 1 ? "Native Name" : "Native Names"}
          text={inlinedNativeNames}
        />
        <Description heading="Population" text={country.population} />
        <Description heading="Region" text={country.region} />
        <Description heading="Sub Region" text={country.subregion} />
        <Description heading="Capital" text={country.capital} />
        <Description heading="Top Level Domain" text={country.tld} />
        <Description
          heading={allCurrs.length === 1 ? "Currency" : "Currencies"}
          text={inlinedCurrs}
        />
      </ul>
      <h4>Border Countries:</h4>
      {country.borders && (
        <ul class="flex gap-4">
          {country.borders.map((country) => (
            <li>{country}</li>
          ))}
        </ul>
      )}
    </div>
  );
});

const BadCCA3 = component$(() => {
  return (
    <div>
      <h1>Country could not be found</h1>
      <p>
        Either the cca3 code is invalid or the API for this country is down.
      </p>
    </div>
  );
});

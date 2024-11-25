import { component$, useContext } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { AllCountriesContext } from "~/components/countries/context-wrapper";
import { Description } from "~/components/description/description";

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
  const allLangs = langs.map((lang) => country.languages[lang]);
  const inlinedNativeNames = allNativeNames.reduce((p, n) => {
    return p.concat(", ", n);
  });
  const currs = Object.keys(country.currencies);
  const allCurrs = currs.map((curr) => country.currencies[curr].name);
  const inlinedCurrs = allCurrs.reduce((p, n) => {
    return p.concat(", ", n);
  });

  const inlinedLangs = allLangs.reduce((p, n) => {
    return p.concat(", ", n);
  });
  console.log(" COUNTREY: ", allLangs);
  return (
    <div class="flex flex-col gap-4 ">
      <div class="h-[220px] w-[320px]">
        <img
          class="h-full object-contain"
          loading="lazy"
          decoding="async"
          width={320}
          height={220}
          src={country.flags.svg}
          alt={`flag of ${country.name.official}`}
        />
      </div>
      <h3 class="text-2xl font-bold">{country.name.common}</h3>
      <ul class="w-[320px]">
        <Description
          heading={allNativeNames.length === 1 ? "Native Name" : "Native Names"}
          text={inlinedNativeNames}
        />
        <Description heading="Population" text={country.population} />
        <Description heading="Region" text={country.region} />
        <Description heading="Sub Region" text={country.subregion} />
        <Description class="mb-4" heading="Capital" text={country.capital} />
        <Description heading="Top Level Domain" text={country.tld} />
        <Description
          heading={allCurrs.length === 1 ? "Currency" : "Currencies"}
          text={inlinedCurrs}
        />
        <Description
          heading={allLangs.length === 1 ? "Language" : "Languages"}
          text={inlinedLangs}
        />
      </ul>
      <div>
        <h4 class="mb-1 font-semibold">Border Countries:</h4>
        {country.borders && (
          <ul class="flex flex-wrap gap-4">
            {country.borders.map((country) => (
              <li>
                <Link href={`/countries/${country}`}>{country}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
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

import { component$, useContext } from "@builder.io/qwik";
import {
  AllCountriesContext,
  SearchStringContext,
} from "~/components/countries/context-wrapper";
import { RenderCountries } from "~/components/countries/render-countries";
import { SearchBar } from "~/components/search-bar/search-bar";

export default component$(() => {
  const allCountriesSig = useContext(AllCountriesContext);
  const searchStrgSig = useContext(SearchStringContext);
  const appliedCountries =
    searchStrgSig.value === ""
      ? allCountriesSig.value
      : allCountriesSig.value.filter((country) => {
        const { value } = searchStrgSig;
        const searchLength = value.length;
        const validCC3 = country.cca3 === value.toUpperCase();
        const hasCommonName =
          country.name.common.slice(0, searchLength).toUpperCase() ===
          value.toUpperCase();
        const hasOfficialName =
          country.name.official.slice(0, searchLength).toUpperCase() ===
          value.toUpperCase();
        if (validCC3 || hasCommonName || hasOfficialName) {
          return country;
        }
      });
  return (
    <div class="flex flex-col gap-8">
      <SearchBar />
      <RenderCountries countries={appliedCountries} />
    </div>
  );
});

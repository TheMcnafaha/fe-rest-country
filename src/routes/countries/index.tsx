import { component$, useContext } from "@builder.io/qwik";
import { AllCountriesContext } from "~/components/countries/context-wrapper";
import { RenderCountries } from "~/components/countries/render-countries";

export default component$(() => {
  const allCountriesSig = useContext(AllCountriesContext);
  return (
    <div class="">
      <RenderCountries countries={allCountriesSig.value} />
    </div>
  );
});

import { component$, useContext } from "@builder.io/qwik";
import { RenderCountries } from "~/components/countries/render-countries";
import { AllCountriesContext } from "../layout";

export default component$(() => {
  const allCountriesSig = useContext(AllCountriesContext);
  return (
    <div class="">
      <RenderCountries countries={allCountriesSig.value} />
    </div>
  );
});

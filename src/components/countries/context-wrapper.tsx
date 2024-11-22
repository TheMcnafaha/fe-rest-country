import {
  Slot,
  component$,
  useContextProvider,
  useSignal,
} from "@builder.io/qwik";
import { AllCountriesContext } from "~/routes/countries/layout";
import { CountryResponse } from "~/routes/layout";

type ContextWrapperProps = {
  context: CountryResponse[];
};
export const ContextWrapper = component$<ContextWrapperProps>(({ context }) => {
  const allCountriesSig = useSignal(context);
  useContextProvider(AllCountriesContext, allCountriesSig);
  return (
    <div class="bg-blue-500 p-4">
      <Slot />
    </div>
  );
});

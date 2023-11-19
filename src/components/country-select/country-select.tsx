import { component$ } from "@builder.io/qwik";

export interface CountrySelectProps {}

export const CountrySelect = component$<CountrySelectProps>((props) => {
  return (
    <>
      <div>CountrySelect component works!</div>
      <select
        id="small"
        class="mb-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        <option selected>Filter by Region</option>
        <option value="US">Africa</option>
        <option value="CA">America</option>
        <option value="FR">Asia</option>
        <option value="DE">Europe</option>
        <option value="DE">Oceania</option>
      </select>
    </>
  );
});

import { component$ } from "@builder.io/qwik";
import { SelectRoot } from "../select-component/select-root";
import { SelectTrigger } from "../select-component/select-trigger";
import { SelectValue } from "../select-component/select-value";
import { SelectMarker } from "../select-component/select-marker";
import { SelectListBox } from "../select-component/select-listbox";
import { SelectOption } from "../select-component/select-option";
export interface CountrySelectProps {}
SelectRoot;
export const CountrySelect = component$<CountrySelectProps>((props) => {
  return (
    <>
      <div>CountrySelect component works!</div>
      <select
        id="small"
        class="mb-6 block w-full max-w-[200px] rounded-lg  border bg-[white] px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        <option selected>Filter by Region</option>
        <option value="US">Africa</option>
        <option value="CA">America</option>
        <option value="FR">Asia</option>
        <option value="DE">Europe</option>
        <option value="DE">Oceania</option>
      </select>

      <SelectRoot>
        <SelectTrigger class="flex items-center justify-between border-[1px] border-slate-200 p-4 dark:border-gray-600">
          <SelectValue placeholder="Home" />
          <SelectMarker class="h-6 w-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </SelectMarker>
        </SelectTrigger>
        <SelectListBox class="border-[1px] border-slate-200 bg-slate-100 dark:border-gray-600 dark:bg-gray-700">
          <SelectOption optionValue="Orders" class="p-4">
            Axe
          </SelectOption>
          <SelectOption optionValue="Orders" class="p-4">
            Ore
          </SelectOption>
          <SelectOption optionValue="Orders" class="p-4">
            ABBA💃👑
          </SelectOption>
          <SelectOption optionValue="Orders" class="p-4">
            Opts
          </SelectOption>
          <SelectOption optionValue="Orders" class="p-4">
            Await
          </SelectOption>
          <SelectOption optionValue="Orders" class="p-4">
            Order
          </SelectOption>
          <SelectOption optionValue="Orders" class="p-4">
            Abacus
          </SelectOption>
          <SelectOption optionValue="Orders" class="p-4">
            Octopi
          </SelectOption>
          <SelectOption optionValue="Orders" class="p-4">
            Cactus
          </SelectOption>
        </SelectListBox>
      </SelectRoot>
    </>
  );
});

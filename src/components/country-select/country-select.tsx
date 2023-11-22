import { component$ } from "@builder.io/qwik";
import { SelectRoot } from "../select-component/select-root";
import { SelectTrigger } from "../select-component/select-trigger";
import { SelectValue } from "../select-component/select-value";
import { SelectMarker } from "../select-component/select-marker";
import { SelectListBox } from "../select-component/select-listbox";
import { SelectOption } from "../select-component/select-option";
SelectRoot;
export const CountrySelect = component$(() => {
  return (
    <>
      <div class="z-30 flex w-full font-semibold">
        <SelectRoot class=" dark:bg-dark-blue flex w-1/2   justify-between self-start rounded-md bg-[white] px-3 py-2 drop-shadow-sm">
          <SelectTrigger class="flex w-full items-center justify-between text-sm ">
            <SelectValue placeholder="Filter by Region" class="mr-4" />
            <SelectMarker class="flex h-6 w-4 ">
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
          <SelectListBox class="dark:bg-dark-blue z-30 mt-4 w-full rounded-md bg-[white] drop-shadow-md">
            <SelectOption optionValue="Orders" class=" z-10 p-4">
              Africa
            </SelectOption>
            <SelectOption optionValue="Orders" class="p-4">
              America
            </SelectOption>
            <SelectOption optionValue="Orders" class="p-4">
              Asia
            </SelectOption>
            <SelectOption optionValue="Orders" class="p-4">
              Europe
            </SelectOption>
            <SelectOption optionValue="Orders" class="p-4">
              Oceania
            </SelectOption>
          </SelectListBox>
        </SelectRoot>
      </div>
    </>
  );
});

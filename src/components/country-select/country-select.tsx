import type { Signal } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { SelectRoot } from "../select-component/select-root";
import { SelectTrigger } from "../select-component/select-trigger";
import { SelectValue } from "../select-component/select-value";
import { SelectMarker } from "../select-component/select-marker";
import { SelectListBox } from "../select-component/select-listbox";
import { SelectOption } from "../select-component/select-option";
export interface CountrySelectProps {
  inputSignal: Signal<string>;
}
export const CountrySelect = component$<CountrySelectProps>(
  ({ inputSignal }) => {
    return (
      <>
        <div class="z-30 flex w-full font-semibold drop-shadow-md lg:w-fit">
          <SelectRoot class=" flex w-1/2 justify-between self-start  rounded-md bg-[white] px-3 py-2 drop-shadow-sm dark:bg-dark-blue lg:w-[10rem] lg:self-end">
            <SelectTrigger
              onFocus$={() => {
                const val = document.getElementById("regions")!.innerText;
                if (val !== "Filter by Region") {
                  inputSignal.value = val.trim();
                } else {
                  inputSignal.value = "";
                }
              }}
              class="flex w-full items-center justify-between text-sm "
            >
              <SelectValue
                id="regions"
                placeholder="Filter by Region"
                class="mr-4"
              />
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
            <SelectListBox class="z-30 mt-4 w-full rounded-md bg-[white] drop-shadow-md dark:bg-dark-blue">
              <SelectOption optionValue="Africa" class="p-4">
                Africa
              </SelectOption>
              <SelectOption optionValue="Americas" class="p-4">
                Americas
              </SelectOption>
              <SelectOption optionValue="Asia" class="p-4">
                Asia
              </SelectOption>
              <SelectOption optionValue="Europe" class="p-4">
                Europe
              </SelectOption>
              <SelectOption optionValue="Oceania" class="p-4">
                Oceania
              </SelectOption>
              <SelectOption optionValue="" class="p-4">
                All
              </SelectOption>
            </SelectListBox>
          </SelectRoot>
        </div>
      </>
    );
  },
);

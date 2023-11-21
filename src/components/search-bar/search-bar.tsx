import { component$ } from "@builder.io/qwik";

export interface SearchBarProps {}

export const SearchBar = component$<SearchBarProps>((props) => {
  return (
    <label
      for="site-search"
      class="mb-3  flex w-full rounded-md bg-[white] py-2 pl-4"
    >
      {" "}
      <img src="glass-31179.svg" alt="search" />
      <input
        class="w-full rounded-md bg-[white] py-1 pl-3 pr-12 text-sm"
        placeholder="Search for a country..."
        type="search"
        id="site-search"
        name="query"
      />
    </label>
  );
});

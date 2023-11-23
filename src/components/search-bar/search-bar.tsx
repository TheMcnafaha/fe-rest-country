import { component$ } from "@builder.io/qwik";
export const SearchBar = component$(() => {
  return (
    <label
      for="site-search"
      class="mb-3 flex  rounded-md bg-[white] py-2 pl-4 drop-shadow-sm dark:bg-dark-blue"
    >
      {" "}
      <img src="glass-31179.svg" height={15} width={15} alt="search" />
      <input
        class="w-full rounded-md bg-[white] py-1 pl-3 pr-12 text-sm outline-[white] dark:bg-dark-blue dark:text-light-gray"
        placeholder="Search for a country..."
        type="search"
        id="site-search"
        name="query"
      />
    </label>
  );
});

import { component$ } from "@builder.io/qwik";
export const SearchBar = component$(() => {
  return (
    <label
      for="site-search"
      class="dark:bg-dark-blue mb-3  flex rounded-md bg-[white] py-2 pl-4 drop-shadow-sm"
    >
      {" "}
      <img src="glass-31179.svg" height={15} width={15} alt="search" />
      <input
        class="dark:bg-dark-blue w-full rounded-md bg-[white] py-1 pl-3 pr-12 text-sm dark:text-light-gray"
        placeholder="Search for a country..."
        type="search"
        id="site-search"
        name="query"
      />
    </label>
  );
});

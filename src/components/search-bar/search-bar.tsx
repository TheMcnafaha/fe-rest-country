import { component$ } from "@builder.io/qwik";

export interface SearchBarProps {}

export const SearchBar = component$<SearchBarProps>((props) => {
  return (
    <div>
      <input
        placeholder="Search for a country"
        type="search"
        id="site-search"
        name="q"
      />
    </div>
  );
});

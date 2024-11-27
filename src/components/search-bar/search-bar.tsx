import { component$, useContext } from "@builder.io/qwik";
import { SearchStringContext } from "../countries/context-wrapper";

type SearchBarProps = {};
export const SearchBar = component$<SearchBarProps>(() => {
  const searchStrgSig = useContext(SearchStringContext);
  return (
    <div class="bg-red-400">
      <input
        type="text"
        class="w-full p-1"
        placeholder="search for a country"
        bind:value={searchStrgSig}
      />
    </div>
  );
});

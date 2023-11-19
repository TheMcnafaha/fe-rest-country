import { component$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
export type TypeNation = {
  common_name: string;
  region: string;
  capital: string;
  population: number;
  flag: string;
};

export interface SimpleNationProps {
  nation: TypeNation;
}
export const SimpleNation = component$<SimpleNationProps>(({ nation }) => {
  // const nation = country.value;
  return (
    <>
      <div>New route works. Check this out: </div>
      <h2>{nation.common_name}</h2>
      <img src={nation.flag} alt="" />
      <ul>
        {Object.keys(nation).map((item) => (
          <li key={item} class="text-xl">
            {item}: {nation[item as keyof TypeNation]}{" "}
          </li>
        ))}
      </ul>
    </>
  );
});

// <h2>{country.value.common_name}</h2>
// <img src={nation.flag} alt="" />
// <ul>
//   {Object.keys(nation).map((item) => (
//     <li key={item} class="text-xl">
//       {item}: {nation[item as keyof TypeNation]}{" "}
//     </li>
//   ))}
// </ul>

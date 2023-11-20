import { component$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
export type TypeNation = {
  common_name: string;
  official_name: string;
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
  const pointKeys = ["population", "region", "capital"];
  const imgAlt = `flag of ${nation.common_name}`;
  return (
    <div class=" my-4 flex max-w-[260px] flex-col items-center rounded-md bg-[white] pb-4 drop-shadow-sm">
      <img class="rounded-t-md" src={nation.flag} alt={imgAlt} />
      <div class=" p-4">
        <h3 class="my-2 font-bold">{nation.common_name}</h3>
        <ul class=" text-sm">
          {pointKeys.map((item) => (
            <li key={item} class=" mb-2">
              <span class="font-bold">{item}:</span>{" "}
              {nation[item as keyof TypeNation]}{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
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

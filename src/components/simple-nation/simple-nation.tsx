import { component$ } from "@builder.io/qwik";
export type TypeNation = {
  common_name: string;
  id: string;
  official_name: string;
  region: string;
  capital: string;
  population: string;
  flag: string;
};

export interface SimpleNationProps {
  nation: TypeNation;
}
export const SimpleNation = component$<SimpleNationProps>(({ nation }) => {
  // const nation = country.value;
  const pointKeys = ["population", "region", "capital"];
  return (
    <a
      href={`countries/${nation.id}`}
      class=" my-4 flex w-full max-w-[260px] flex-col items-center rounded-md bg-[white] pb-4 drop-shadow-sm dark:bg-dark-blue"
    >
      <div class="flex h-[150px] max-w-[250px] justify-center overflow-hidden bg-dark-gray">
        <img class="object-cover" src={nation.flag} alt="ggs" />
      </div>
      <div class=" self-start px-8 py-4">
        <h3 class="my-2 text-xl font-extrabold">{nation.common_name}</h3>
        <ul class=" ">
          {pointKeys.map((item) => (
            <li key={item} class=" mb-2">
              <span class="font-semibold">
                {item[0].toLocaleUpperCase() + item.substring(1)}:
              </span>{" "}
              {nation[item as keyof TypeNation]}{" "}
            </li>
          ))}
        </ul>
      </div>
    </a>
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

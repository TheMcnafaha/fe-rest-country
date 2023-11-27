import { component$ } from "@builder.io/qwik";
import type { TypeNation } from "../simple-nation/simple-nation";
import { SimpleNation } from "../simple-nation/simple-nation";
export interface SimpleNationsProps {
  nations: TypeNation[];
}
export const SimpleNations = component$<SimpleNationsProps>(({ nations }) => {
  return (
    <>
      <ul class="  lg:mt-8 lg:grid lg:w-full lg:grid-cols-4 lg:justify-items-stretch lg:gap-4">
        {nations.map((nation) => {
          return (
            <li
              key={nation.id}
              class="my-5 grid  w-full grid-cols-1 justify-items-center"
            >
              <SimpleNation key={nation.id} nation={nation} />
            </li>
          );
        })}
      </ul>
    </>
  );
});

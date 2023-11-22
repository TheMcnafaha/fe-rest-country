import { component$ } from "@builder.io/qwik";
import type { TypeNation } from "../simple-nation/simple-nation";
import { SimpleNation } from "../simple-nation/simple-nation";
export interface SimpleNationsProps {
  nations: TypeNation[];
}

export const SimpleNations = component$<SimpleNationsProps>(({ nations }) => {
  return (
    <>
      <ul class="lg:grid lg:w-full lg:grid-cols-4 lg:justify-items-stretch lg:gap-4">
        {nations.map((nation) => {
          return <SimpleNation key={nation.id} nation={nation} />;
        })}
      </ul>
    </>
  );
});

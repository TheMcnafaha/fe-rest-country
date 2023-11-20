import { Slot, component$ } from "@builder.io/qwik";
import { SimpleNation, TypeNation } from "../simple-nation/simple-nation";
export interface SimpleNationsProps {
  nations: TypeNation[];
}

export const SimpleNations = component$<SimpleNationsProps>(({ nations }) => {
  return (
    <>
      <ul>
        {nations.map((nation) => {
          return <SimpleNation nation={nation} />;
        })}
      </ul>
    </>
  );
});

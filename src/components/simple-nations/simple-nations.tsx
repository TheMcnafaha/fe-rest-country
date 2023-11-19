import { component$ } from "@builder.io/qwik";
import { SimpleNation } from "../nation/nation";
import type { TypeNation } from "../nation/nation";
export interface SimpleNationsProps {
  nations: TypeNation[];
}

export const SimpleNations = component$<SimpleNationsProps>(({ nations }) => {
  return (
    <ul>
      {nations.length}
      {nations.map((nation) => {
        return <SimpleNation nation={nation} />;
      })}
    </ul>
  );
});

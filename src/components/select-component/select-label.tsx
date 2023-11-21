import { component$, Slot } from "@builder.io/qwik";
import type { QwikIntrinsicElements } from "@builder.io/qwik";
export type SelectLabelProps = QwikIntrinsicElements["label"];

export const SelectLabel = component$((props: SelectLabelProps) => {
  return (
    <label {...props}>
      <Slot />
    </label>
  );
});

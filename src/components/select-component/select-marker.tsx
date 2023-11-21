import { component$, Slot } from "@builder.io/qwik";
import type { QwikIntrinsicElements } from "@builder.io/qwik";

export type SelectMarkerProps = QwikIntrinsicElements["span"];

export const SelectMarker = component$((props: SelectMarkerProps) => {
  return (
    <span aria-hidden="true" {...props}>
      <Slot />
    </span>
  );
});

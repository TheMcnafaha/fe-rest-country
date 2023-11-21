import { component$, useContext } from "@builder.io/qwik";
import SelectContextId from "./select-context-id";
import type { QwikIntrinsicElements } from "@builder.io/qwik";

export type SelectValueProps = {
  placeholder?: string;
} & QwikIntrinsicElements["span"];

export const SelectValue = component$(
  ({ placeholder, ...props }: SelectValueProps) => {
    const selectContext = useContext(SelectContextId);
    const value = selectContext.selectedOptionSig.value;
    return <span {...props}>{value ? value : placeholder}</span>;
  },
);

import { createContextId } from "@builder.io/qwik";
import type { SelectContext } from "./select-context.type";

const SelectContextId = createContextId<SelectContext>("select-root");

export default SelectContextId;

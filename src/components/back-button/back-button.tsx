import { component$ } from "@builder.io/qwik";

export const BackButton = component$(() => {
  return (
    <div
      class="mb-10"
      onClick$={() => {
        history.back();
      }}
    >
      <button class="flex items-center gap-2 rounded-sm bg-[white] px-5 py-1 drop-shadow-lg">
        <object data="/arrow-27323.svg" height={23} width={23}></object>
        Back
      </button>
    </div>
  );
});

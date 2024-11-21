import { component$ } from "@builder.io/qwik";

type DescriptionProps = {
  heading: string;
  text: string | number;
};
export const Description = component$<DescriptionProps>(({ heading, text }) => {
  return (
    <li class="text-sm">
      <span class=" font-semibold">{heading}</span>: {text}
    </li>
  );
});

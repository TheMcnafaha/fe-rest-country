import { type PropsOf, component$ } from "@builder.io/qwik";

type DescriptionProps = {
  heading: string;
  text: string | number;
} & PropsOf<"li">;
export const Description = component$<DescriptionProps>((props) => {
  const { heading, text } = props;
  return (
    <li class="text-sm" {...props}>
      <span class=" font-semibold">{heading}</span>: {text}
    </li>
  );
});

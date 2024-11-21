import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const loc = useLocation();
  console.log(loc.params.cca3);

  return <div>New route works.</div>;
});

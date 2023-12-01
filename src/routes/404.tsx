// routes/404.tsx
import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <h1>Im the 404 of /</h1>
      <p>This even has HMR!!!</p>
    </>
  );
});

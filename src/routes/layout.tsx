import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  return (
    <>
      <header class="mb-6 bg-[white] px-3 py-4">
        <div class="flex justify-between ">
          <a href="/">
            <h1 class="font-extrabold">Where in the world?</h1>
          </a>
          <p> Dark Mode</p>
        </div>
      </header>
      <main class="flex flex-col items-center">
        <Slot />
      </main>
    </>
  );
});

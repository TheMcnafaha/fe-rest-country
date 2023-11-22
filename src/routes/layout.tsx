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
      <header class=" dark:bg-dark-blue mb-6 flex justify-center bg-[white] px-3 py-4 drop-shadow ">
        <div class="flex w-full max-w-md  justify-between lg:max-w-5xl">
          <a href="/">
            <h1 class="font-extrabold">Where in the world?</h1>
          </a>
          <div
            class="flex cursor-pointer gap-3"
            onClick$={() => {
              console.log("change theme ", localStorage.theme);
              document.documentElement.classList.toggle("dark");
            }}
          >
            <span class="flex cursor-pointer items-center">
              <object
                class="block cursor-pointer"
                data="/moon.svg"
                height={20}
                width={20}
              ></object>
            </span>
            <button class="flex gap-2" onClick$={() => {}}>
              Dark Mode
            </button>
          </div>
        </div>
      </header>
      <main class="  flex flex-col items-center px-3">
        <div class=" flex w-full max-w-md  flex-col lg:max-w-5xl ">
          <Slot />
        </div>
      </main>
    </>
  );
});

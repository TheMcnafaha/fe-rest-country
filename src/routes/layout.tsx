import { component$, Slot } from "@builder.io/qwik";
import { Link, type RequestHandler } from "@builder.io/qwik-city";
import { ContextWrapper } from "~/components/countries/context-wrapper";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export type CountryResponse = {
  name: {
    common: string;
    official: string;
    nativeName: {
      [language: string]: { official: string; common: string };
    };
  };
  population: number;
  region: string;
  subregion: string;
  capital: string;
  flags: {
    svg: string;
  };
  tld: string;
  currencies: {
    [x: string]: { name: string };
  };
  languages: {
    [x: string]: string;
  };
  borders?: Array<string>;
  cca3: string;
};

export default component$(() => {
  return (
    <>
      <div class="flex flex-col items-center">
        <header class="  flex w-full justify-center bg-white px-3 py-6">
          <div class="flex w-full max-w-md   justify-between">
            <h1>
              <Link href="/countries"> Where in the world?</Link>
            </h1>
            <p>Dark Mode</p>
          </div>
        </header>
        <main class="py-3 ">
          <div class=" flex max-w-md flex-col items-center">
            <ContextWrapper>
              <Slot />
            </ContextWrapper>
          </div>{" "}
        </main>{" "}
      </div>
    </>
  );
});

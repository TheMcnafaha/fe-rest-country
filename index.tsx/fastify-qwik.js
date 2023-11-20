import { createQwikCity } from "@builder.io/qwik-city/middleware/node";
import fastifyStatic from "@fastify/static";
import qwikCityPlan from "@qwik-city-plan";
import fastifyPlugin from "fastify-plugin";

import render from "../entry.ssr";

const { router, notFound } = createQwikCity({ render, qwikCityPlan });

/** @returns {Promise<void>} */
const qwikPlugin = async (fastify, options) => {
    const { buildDir, distDir } = options;

    fastify.register(fastifyStatic, {
        root: buildDir,
        prefix: "/build",
        immutable: true,
        maxAge: "1y",
        decorateReply: false,
    });

    fastify.register(fastifyStatic, {
        root: distDir,
        redirect: false,
        decorateReply: false,
    });

    fastify.setNotFoundHandler(async (request, response) => {
        await router(request.raw, response.raw, (err) => fastify.log.error(err));
        await notFound(request.raw, response.raw, (err) => fastify.log.error(err));
    });
};

export default fastifyPlugin(qwikPlugin, { fastify: "4.x" });

/** @typedef {Object} FastifyQwikOptions
 * @property {string} distDir
 * @property {string} buildDir 
 */

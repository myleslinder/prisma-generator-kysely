#!/usr/bin/env node

import {
	generatorHandler,
	type GeneratorOptions,
} from "@prisma/generator-helper";

import { writeFile } from "fs/promises";
import { formatFile } from "~/formatFile";
import { transformDMMF } from "~/transformDMMF";
import { version } from "../package.json";
import { GENERATOR_PRETTY_NAME, OUTPUT_PATH } from "./constants";

generatorHandler({
	onManifest() {
		// logger.info(`${GENERATOR_NAME}:Registered`);
		return {
			version,
			defaultOutput: OUTPUT_PATH,
			prettyName: GENERATOR_PRETTY_NAME,
		};
	},
	onGenerate: async (options: GeneratorOptions) => {
		const outputPath = options.generator.output?.value ?? OUTPUT_PATH;
		// const config = options.generator.config;
		const dataSources = options.datasources;
		if (!dataSources.find((s) => s.activeProvider === "mysql")) {
			throw new Error("Only mysql is supported atm");
		}
		const output = transformDMMF(options.dmmf);
		await writeFile(outputPath, await formatFile(output));
	},
});

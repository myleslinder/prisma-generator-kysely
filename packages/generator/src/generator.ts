#!/usr/bin/env node
import {
	generatorHandler,
	type GeneratorOptions,
} from "@prisma/generator-helper";

import { transformDMMF } from "~/transformDMMF";
import { writeFormattedFile } from "~/writeFormattedFile";
import { version } from "../package.json";

// const GENERATOR_NAME = "prisma-generator-kysely";
const GENERATOR_PRETTY_NAME = "Kysely";
const OUTPUT_PATH = "./schema.kysely.ts";

generatorHandler({
	onManifest() {
		return {
			version,
			defaultOutput: OUTPUT_PATH,
			prettyName: GENERATOR_PRETTY_NAME,
		};
	},
	onGenerate: async (options: GeneratorOptions) => {
		const outputPath = options.generator.output?.value ?? OUTPUT_PATH;
		const output = transformDMMF(options.dmmf);
		await writeFormattedFile(outputPath, output);
	},
});

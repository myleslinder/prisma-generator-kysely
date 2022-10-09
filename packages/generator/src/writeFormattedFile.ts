import { mkdir, writeFile } from "fs/promises";
import { dirname } from "path";
import prettier from "prettier";
import { cwd } from "process";

const formatFile = async (content: string): Promise<string> => {
	const options = (await prettier.resolveConfig(cwd())) ?? {};

	const formatted = prettier.format(content, {
		...options,
		parser: "typescript",
	});

	return formatted;
};

export { formatFile };
export { writeFormattedFile };

const writeFormattedFile = async (writeLocation: string, content: string) => {
	await mkdir(dirname(writeLocation), {
		recursive: true,
	});

	await writeFile(writeLocation, await formatFile(content));
};

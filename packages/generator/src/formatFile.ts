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

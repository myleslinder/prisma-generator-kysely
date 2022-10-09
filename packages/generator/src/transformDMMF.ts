import type { DMMF } from "@prisma/generator-helper";
import { genPrelude } from "~/prelude";

const supportedDefaultFunctions = ["now", "autoincrement", "dbgenerated"];

function isScalarType(kind: DMMF.Field["kind"]) {
	return kind === "scalar";
}

function isEnumType(kind: DMMF.Field["kind"]): boolean {
	return kind === "enum";
}

const genEnum = ({ name, values }: DMMF.DatamodelEnum) => {
	const enumValues = values.map(({ name }) => `${name}="${name}"`).join(",\n");

	return `export enum ${name} { \n${enumValues}\n }`;
};

const dbScalarToTS = (type: DMMF.Field["type"]) => {
	if (type === "Json") return type;
	if (type === "DateTime") return `Timestamp`;
	if (["Int", "BigInt", "Float", "Decimal"].includes(type)) return `number`;
	if (type === "Bytes") return `string`;
	if (type === "Unsupported") return `never`;
	return type.toLowerCase();
};

const isSupportedDefault = (field: DMMF.Field) =>
	field.hasDefaultValue &&
	(typeof field.default !== "object" ||
		Array.isArray(field.default) ||
		supportedDefaultFunctions.includes(field.default?.name));

const genScalarColumn = (field: DMMF.Field) =>
	`${field.name}: ${
		isSupportedDefault(field)
			? `Generated<${dbScalarToTS(field.type)}>`
			: `${dbScalarToTS(field.type)}${
					!field.isRequired && !isSupportedDefault(field) ? " | null" : ""
			  }`
	};`;
const genEnumColumn = (field: DMMF.Field) =>
	`${field.name}${!isSupportedDefault(field) ? "?" : ""}: ${
		field.hasDefaultValue ? `Generated<${field.type}>` : field.type
	};`;

const genColumn = (field: DMMF.Field) => {
	if (isScalarType(field.kind)) return genScalarColumn(field);
	if (isEnumType(field.kind)) return genEnumColumn(field);
	return "";
};

const genTable = (modelInfo: DMMF.Model) =>
	`export interface ${modelInfo.dbName ?? modelInfo.name} {
        ${modelInfo.fields.map(genColumn).join("\n")}
    }
	${genTableExtracts(modelInfo)}`;

const genTableExtracts = (modelInfo: DMMF.Model) => {
	const tableName = modelInfo.dbName ?? modelInfo.name;
	console.log(...modelInfo.fields);
	return `
		export type ${tableName}Row = Selectable<${tableName}>
		export type Insertable${tableName}Row = Insertable<${tableName}>
		export type Updateable${tableName}Row = Updateable<${tableName}>
	`;
};

const genDb = (models: DMMF.Model[]) =>
	`export interface DB {
		${models
			.map(
				(model) =>
					`${model.dbName ?? model.name}: ${model.dbName ?? model.name};`,
			)
			.join("\n")}
	}`;

// TODO: filter out isUpdatedAt?
function transformDMMF(dmmf: DMMF.Document): string {
	const { models, enums } = dmmf.datamodel;

	const hasJson = models.some((m) => m.fields.some((f) => f.type === "Json"));
	const hasGenerated = models.some((m) =>
		m.fields.some((f) => f.hasDefaultValue),
	);

	const tsEnums = enums.map(genEnum).join("\n");
	const tsInterfaces = models.map(genTable).join("\n");

	return `${genPrelude({
		json: hasJson,
		generated: hasGenerated,
	})}${tsEnums}\n${tsInterfaces}\n${genDb(models)}`;
}

export { transformDMMF };

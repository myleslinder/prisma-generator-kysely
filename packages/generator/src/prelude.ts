type PreludeFlags = {
	json: boolean;
	generated: boolean;
};
const genPrelude = (flags: PreludeFlags) => `
    import type { GeneratedAlways, ColumnType, Selectable, Insertable, Updateable } from "kysely"

	${
		flags.generated
			? `type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
	? ColumnType<S, I | undefined, U>
	: ColumnType<T, T | undefined, T>;`
			: ""
	}

    type Timestamp = ColumnType<Date, Date | string, Date | string>;

	${
		flags.json
			? `type Json = ColumnType<JsonValue, string, string>;

	type JsonArray = JsonValue[];
	
	type JsonObject = {
		[K in string]?: JsonValue;
	};
	
	type JsonPrimitive = boolean | null | number | string;
	
	type JsonValue = JsonArray | JsonObject | JsonPrimitive;`
			: ""
	}

`;

export { genPrelude };

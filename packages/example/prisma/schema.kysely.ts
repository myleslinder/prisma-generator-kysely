import type {
	ColumnType,
	GeneratedAlways,
	Insertable,
	Selectable,
	Updateable,
} from "kysely";

type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
	? ColumnType<S, I | undefined, U>
	: ColumnType<T, T | undefined, T>;

type Timestamp = ColumnType<Date, Date | string, Date | string>;

type Json = ColumnType<JsonValue, string, string>;

type JsonArray = JsonValue[];

type JsonObject = {
	[K in string]?: JsonValue;
};

type JsonPrimitive = boolean | null | number | string;

type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export enum MembershipRole {
	ADMIN = "ADMIN",
	STANDARD = "STANDARD",
	LIMITED = "LIMITED",
}
export enum MembershipStatus {
	FREE = "FREE",
	PAID = "PAID",
}
export interface AuthAllowList {
	id: string;
	domain: string;
	createdAt: Generated<Timestamp>;
	updatedAt: Timestamp;
}

export type AuthAllowListRow = Selectable<AuthAllowList>;
export type InsertableAuthAllowListRow = Insertable<AuthAllowList>;
export type UpdateableAuthAllowListRow = Updateable<AuthAllowList>;

export interface User {
	id: string;
	publicId: string;
	email: string;
	emailVerified: Generated<Timestamp>;
	firstName: string;
	lastName: string;
	avatar: string | null;

	linkedinPublicId: string | null;
	someList: string | null;
	experience: Json | null;
	createdAt: Generated<Timestamp>;
	updatedAt: Timestamp;
}

export type UserRow = Selectable<User>;
export type InsertableUserRow = Insertable<User>;
export type UpdateableUserRow = Updateable<User>;

export interface Organization {
	id: string;
	publicId: string;
	name: string;
	industry: string;
	description: string;
	shortDescription: string;
	logo: string | null;
	linkedinPublicId: string | null;

	billingEmail: string | null;
	customerId: string | null;
	subscriptionId: string | null;
	subscriptionPaidUpTo: Timestamp | null;
	createdAt: Generated<Timestamp>;
	updatedAt: Timestamp;
}

export type OrganizationRow = Selectable<Organization>;
export type InsertableOrganizationRow = Insertable<Organization>;
export type UpdateableOrganizationRow = Updateable<Organization>;

export interface EmailDomain {
	id: string;
	domain: string;
	domainVerified: Generated<Timestamp>;
	verificationEmail: string;
	organizationId: string;
}

export type EmailDomainRow = Selectable<EmailDomain>;
export type InsertableEmailDomainRow = Insertable<EmailDomain>;
export type UpdateableEmailDomainRow = Updateable<EmailDomain>;

export interface Membership {
	id: string;
	role: MembershipRole;
	title: string;
	userId: string | null;

	organizationId: string;

	status: Generated<MembershipStatus>;
	statusUpdatedAt: Generated<Timestamp>;
	bonus: Generated<number>;
	createdAt: Generated<Timestamp>;
	updatedAt: Timestamp;
}

export type MembershipRow = Selectable<Membership>;
export type InsertableMembershipRow = Insertable<Membership>;
export type UpdateableMembershipRow = Updateable<Membership>;

export interface AModel {
	id: GeneratedAlways<number>;
	publicId: string;
	email: string | null;
	firstName: string;
	lastName: string;
	avatar: string | null;
	organizationId: string;

	memberOwnerId: string;
	createdAt: Generated<Timestamp>;
	updatedAt: Timestamp;
}

export type AModelRow = Selectable<AModel>;
export type InsertableAModelRow = Insertable<AModel>;
export type UpdateableAModelRow = Updateable<AModel>;

export interface BModel {
	id: GeneratedAlways<string>;
	personProspectId: number;
	experience: Json;
	sourceUpdatedAt: Timestamp;
	createdAt: Generated<Timestamp>;
	updatedAt: Timestamp;
}

export type BModelRow = Selectable<BModel>;
export type InsertableBModelRow = Insertable<BModel>;
export type UpdateableBModelRow = Updateable<BModel>;

export interface DB {
	AuthAllowList: AuthAllowList;
	User: User;
	Organization: Organization;
	EmailDomain: EmailDomain;
	Membership: Membership;
	AModel: AModel;
	BModel: BModel;
}

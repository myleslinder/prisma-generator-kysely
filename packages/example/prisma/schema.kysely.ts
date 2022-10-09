import type {
	GeneratedAlways,
	ColumnType,
	Selectable,
	Insertable,
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
	id: Generated<string>;
	domain: string;
	createdAt: Generated<Timestamp>;
	updatedAt: Timestamp;
}

export type AuthAllowListRow = Selectable<AuthAllowList>;
export type InsertableAuthAllowListRow = Insertable<AuthAllowList>;
export type UpdateableAuthAllowListRow = Updateable<AuthAllowList>;

export interface User {
	id: Generated<string>;
	publicId: string;
	email: string;
	emailVerified: Generated<Timestamp>;
	firstName: string;
	lastName: string;
	avatar: string | null;

	linkedinPublicId: string | null;
	experience: Json | null;
	createdAt: Generated<Timestamp>;
	updatedAt: Timestamp;
}

export type UserRow = Selectable<User>;
export type InsertableUserRow = Insertable<User>;
export type UpdateableUserRow = Updateable<User>;

export interface Organization {
	id: Generated<string>;
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
	id: Generated<string>;
	domain: string;
	domainVerified: Generated<Timestamp>;
	verificationEmail: string;
	organizationId: string;
}

export type EmailDomainRow = Selectable<EmailDomain>;
export type InsertableEmailDomainRow = Insertable<EmailDomain>;
export type UpdateableEmailDomainRow = Updateable<EmailDomain>;

export interface Membership {
	id: Generated<string>;
	role: MembershipRole;
	title: string;
	userId: string | null;

	organizationId: string;

	status: Generated<MembershipStatus>;
	statusUpdatedAt: Generated<Timestamp>;
	prospectGenerationBonus: Generated<number>;
	createdAt: Generated<Timestamp>;
	updatedAt: Timestamp;
}

export type MembershipRow = Selectable<Membership>;
export type InsertableMembershipRow = Insertable<Membership>;
export type UpdateableMembershipRow = Updateable<Membership>;

export interface CompanyProspect {
	id: Generated<string>;
	publicId: string;
	name: string;
	domain: string;
	industry: string | null;
	industryPersyCode: string | null;
	description: string | null;
	shortDescription: string | null;
	logo: string | null;
	linkedinPublicId: string | null;
	linkedinTags: Json | null;
	tags: Json | null;
	tech: Json | null;
	techCategories: Json | null;
	foundedYear: number | null;
	location: string | null;
	timeZone: string | null;
	employeeSize: number | null;
	employeeRange: string | null;
	linkedinFollowers: number | null;
	organizationId: string;

	memberOwnerId: string;

	createdAt: Generated<Timestamp>;
	updatedAt: Timestamp;
}

export type CompanyProspectRow = Selectable<CompanyProspect>;
export type InsertableCompanyProspectRow = Insertable<CompanyProspect>;
export type UpdateableCompanyProspectRow = Updateable<CompanyProspect>;

export interface PersonProspect {
	id: Generated<string>;
	publicId: string;
	email: string | null;
	firstName: string;
	lastName: string;
	avatar: string | null;
	role: string | null;
	seniority: string | null;
	seniorityPersyCode: string | null;
	department: string | null;
	departmentPersyCode: string | null;
	location: string | null;
	timeZone: string | null;
	bio: string | null;
	linkedinPublicId: string | null;

	awards: Json | null;
	certifications: Json | null;
	skills: Json | null;
	education: Json | null;
	interests: Json | null;
	recommendations: Json | null;
	organizationId: string;

	memberOwnerId: string;

	companyProspectId: string | null;

	createdAt: Generated<Timestamp>;
	updatedAt: Timestamp;
}

export type PersonProspectRow = Selectable<PersonProspect>;
export type InsertablePersonProspectRow = Insertable<PersonProspect>;
export type UpdateablePersonProspectRow = Updateable<PersonProspect>;

export interface WorkExperience {
	id: Generated<string>;
	personProspectId: string;

	experience: Json;
	roleCount: number;
	totalTenure: number;
	employerCount: number;
	averageTenure: number;
	changes: Json | null;
	current: Json | null;
	categories: Json | null;
	sourceUpdatedAt: Timestamp;
	createdAt: Generated<Timestamp>;
	updatedAt: Timestamp;
}

export type WorkExperienceRow = Selectable<WorkExperience>;
export type InsertableWorkExperienceRow = Insertable<WorkExperience>;
export type UpdateableWorkExperienceRow = Updateable<WorkExperience>;

export interface DB {
	AuthAllowList: AuthAllowList;
	User: User;
	Organization: Organization;
	EmailDomain: EmailDomain;
	Membership: Membership;
	CompanyProspect: CompanyProspect;
	PersonProspect: PersonProspect;
	WorkExperience: WorkExperience;
}

# Prisma Generator Kysely

## Relations

- Only the foreign key for a relationship is present in the generated types and in Kysely all tables are allowed when you add an inner join because you can join any table.

## Default Values

- `cuid()` and `uuid()` are implemented by Prisma and therefore are not "visible" in the underlying database schema
  - use dbgenerated("UUID()") instead if you're using mysql and want auto generated uuids

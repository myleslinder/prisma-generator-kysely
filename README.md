# Prisma Generator Kysely

## Default Values

- `cuid()` and `uuid()` are implemented by Prisma and therefore are not "visible" in the underlying database schema
  - use dbgenerated("UUID()") instead if you're using mysql and want auto generated uuids

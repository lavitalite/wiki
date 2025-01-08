import { describe, test, expect } from 'vitest'
type DBObjectType = 'table' | 'view' | 'stored-procedure'

type DBObjectAction = "create" | "read" | "update" | "delete" | "execute" | "*"

/**
 * 
 * @description  For stored procedures, the wildcard (*) action expands to a list that only includes the execute action. 
 * For tables and views, the wildcard action expands to a list that includes create, read, update, and delete actions.
 */
export function expandWildcardActions(objectType: DBObjectType): DBObjectAction[] {
  switch (objectType) {
    case "stored-procedure":
      return ["execute"]
    case "table":
    case "view":
      return ["create", "read", "update", "delete"]
  }
}

/*
describe('expandWildcardActions', () => {
  test('expands actions for stored procedures', () => {
    expect(expandWildcardActions('stored-procedure')).toEqual(['execute']);
  });

  test('expands actions for tables', () => {
    expect(expandWildcardActions('table')).toEqual(['create', 'read', 'update', 'delete']);
  });

  test('expands actions for views', () => {
    expect(expandWildcardActions('view')).toEqual(['create', 'read', 'update', 'delete']);
  });
});

*/

export interface FieldPermission {
  include?: string[];
  exclude?: string[]
}

const isFieldAccessible = (
  field: string,
  permissions?: FieldPermission
): boolean => {
  if (!permissions) return true
  const { include, exclude } = permissions

  if (exclude?.includes(field)) return false

  if (include?.includes('*')) return true

  return include?.includes(field) ?? true
}

describe('isFieldAccessible', () => {
  test("allow access when no field is specified", () => {
    expect(isFieldAccessible('any-field')).toBe(true)
  })

  test("allow access for wildcard include", () => {
    expect(isFieldAccessible('any-field', { include: ['*'] })).toBe(true)
  })


  test("denies access for excluded field", () => {
    expect(isFieldAccessible('secret-field', { exclude: ['secret-field'] })).toBe(false)
  })

  test("exclude takes precedence over include", () => {
    expect(isFieldAccessible('secret-field', { include: ['*'], exclude: ['secret-field'] })).toBe(false)
  })


  test("explicit include fields", () => {
    expect(isFieldAccessible('id', {
      include: ['id', 'name'],
      exclude: []
    })).toBe(true)
  })

  test("denies non-included field", () => {
    expect(isFieldAccessible('status', {
      include: ['id', "name"],
      exclude: []
    }))
  })
})






export type PolicyDirective = '@claims' | '@item';


export function toSqlOperator(odataOp: string) {
  const operatorMap: Record<string, string> = {
    'eq': "=",
    'gt': ">",
    "lt": "<",
    "ge": ">=",
    "le": "<=",
    "ne": "!="
  }
  return operatorMap[odataOp] || odataOp
} 

export class QueryBuilder {


  static buildSelectClause(fields?: string | string[]): string {
    if (!fields) return ''
    const fieldList = Array.isArray(fields) ? fields.join(',') : fields
    retrun`$select=${encodeURIComponent(fieldList)}`
  }
}
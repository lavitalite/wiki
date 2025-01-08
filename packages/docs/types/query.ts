export interface FilterParams {
  field: string;
  operator: "eq" | "nq" | 'gt' | 'ge' | 'lt' | 'le';
  value: string | number
}

export interface OrderByParams {
  field: string;
  direction?: "asc" | "desc"
}

export interface QueryParams {
  $select?: string[]
  $filter?: FilterParams | FilterParams[]
  $orderby?: OrderByParams | OrderByParams[]
  $first?: number;
}
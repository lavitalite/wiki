export interface ApiConfig {
  baseUrl: string
}


export interface ApiResponse<T> {
  value: T[]
}


export interface FilterOperator {
  field: string
  operator: 'eq' | 'nq' | 'gt' | 'ge' | 'lt' | 'le'
  value: string | number
}



export type QueryParams = SelectParams & FilterParams & OrderByParams & PaginationParams;

export interface SelectParams {
  $select?: string | string[];
}

export interface FilterOperator {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'ge' | 'lt' | 'le';
  value: string | number | boolean;
}

export interface FilterParams {
  $filter?: string | FilterOperator | FilterOperator[];
}

export interface OrderByParams {
  $orderby?: string | Array<{
    field: string;
    direction?: 'asc' | 'desc';
  }>;
}
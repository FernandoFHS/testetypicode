export class Profile {
  content: Content[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  sort: Sort;
  number: number;
  numberOfElements: number;
  first: boolean;
  size: number;
  empty: boolean;
}

export class Pageable {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export class Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export class Content {
  idProfile: number;
  nameProfile: string;
  description: string;
}

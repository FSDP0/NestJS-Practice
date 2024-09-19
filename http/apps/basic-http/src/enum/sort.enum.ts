const SortTypes = {
  ASC: "asc",
  DESC: "desc"
};

export type SortTypes = (typeof SortTypes)[keyof typeof SortTypes];

export enum SortEnum {
  ASC = "asc",
  DESC = "desc"
}

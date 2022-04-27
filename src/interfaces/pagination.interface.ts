export interface IPagination<T> {
    page: number,
    perPage: number,
    countItem: number,
    data: T[],
}

export interface IPaginationQuery<T> extends IPagination<T> {
    other: any
}

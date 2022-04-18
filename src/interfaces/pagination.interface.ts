export interface IPagination<T> {
    page: number,
    perPage: number,
    countItem: number,
    data: T[],
}

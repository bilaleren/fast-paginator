declare interface FastPaginatorIncludes {
    template?: boolean
    nextPage?: boolean
    prevPage?: boolean
    firstPage?: boolean
    lastPage?: boolean
    links?: boolean
}

declare interface FastPaginatorPagesItem {
    url?: string | null,
    num?: number | null,
    isCurrent?: boolean
}

declare interface FastPaginatorOptions {
    include?: FastPaginatorIncludes
    pageName?: string
    nextPageText?: string
    prevPageText?: string
    firstPageText?: string
    lastPageText?: string
    prevPageTmpl?: string
    nextPageTmpl?: string
    disabledPageTmpl?: string
    linksTmpl?: string
    activePageTmpl?: string
    firstPageTmpl?: string
    lastPageTmpl?: string
    template?: string | null
}

declare type FastPaginatorOptionsKeys = keyof FastPaginatorOptions

declare class FastPaginator {

    constructor(totalItems: number,
                currentPage?: number | null,
                itemsPerPage?: number,
                urlPattern?: string,
                options?: FastPaginatorOptions)

    setMaxPagesToShow(page: number): this

    getMaxPagesToShow(): number

    setCurrentPage(page: number): this

    getCurrentPage(): number

    setItemsPerPage(page: number): this

    getItemsPerPage(): number

    setTotalItems(items: number): this

    getTotalItems(): number

    setRootTmpl(tmpl: string): this

    getRootTmpl(): string

    setNextPageText(text: string): this

    getNextPageText(): string

    setPrevPageText(text: string): this

    getPrevPageText(): string

    setFirstPageText(text: string): this

    getFirstPageText(): string

    setLastPageText(text: string): this

    getLastPageText(): string

    setFirstPageTmpl(tmpl: string): this

    getFirstPageTmpl(): string

    setLastPageTmpl(tmpl: string): this

    getLastPageTmpl(): string

    setPrevPageTmpl(tmpl: string): this

    getPrevPageTmpl(): string

    setNextPageTmpl(tmpl: string): this

    getNextPageTmpl(): string

    setLinksTmpl(tmpl: string): this

    getLinksTmpl(): string

    setActivePageTmpl(tmpl: string): this

    getActivePageTmpl(): string

    setDisabledPageTmpl(tmpl: string): this

    getDisabledPageTmpl(): string

    getNextPage(): number | null

    getPrevPage(): number | null

    getLastPage(): number | null

    getFirstPage(): number | null

    getNextPageUrl(): string | null

    getPrevPageUrl(): string | null

    getFirstPageUrl(): string | null

    getLastPageUrl(): string | null

    getCurrentPageUrl(): string

    isLastPage(): boolean

    getTemplate(): string | null

    setTemplate(template: string): this

    getPages(): Array<FastPaginatorPagesItem>

    getPageUrl(pageNum: number): string

    setUrlPattern(pattern: string): this

    getUrlPattern(): string

    getNumPages(): number

    getFirstPageLink(): string

    getPrevPageLink(): string

    getLastPageLink(): string

    getNextPageLink(): string

    getLinks(): string

    toHtml(): string

    simplePaginate(): string

    templatePaginate(): string

    getCurrentPageFirstItem(): number | null

    getCurrentPageLastItem(): number | null

    getDefaults(): FastPaginatorOptions

    getOptions(): FastPaginatorOptions

    setOption(name: FastPaginatorOptionsKeys | FastPaginatorOptions, value?: any): this

    getOption(name: FastPaginatorOptionsKeys, _default?: any): any

}

export = FastPaginator;
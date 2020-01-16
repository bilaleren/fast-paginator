'use strict';

const { extend, replaceArgs } = require('./helpers');

class FastPaginator {

    constructor(totalItems,
                currentPage = null,
                itemsPerPage = 5,
                urlPattern = '',
                options = { }) {
        const self = this;

        self.defaults = {
            include: {
                template: true,
                nextPage: true,
                prevPage: true,
                firstPage: false,
                lastPage: false,
                links: true
            },
            pageName: 'page',
            nextPageText: '<span class="fa fa-angle-right"></span>',
            prevPageText: '<span class="fa fa-angle-left"></span>',
            firstPageText: '<span class="fa fa-angle-double-left"></span>',
            lastPageText: '<span class="fa fa-angle-double-right"></span>',
            prevPageTmpl: '<li class="page-item"><a href="%url" class="page-link">%text</a></li>',
            nextPageTmpl: '<li class="page-item"><a href="%url" class="page-link">%text</a></li>',
            disabledPageTmpl: '<li class="disabled page-item"><a href="javascript:void(0);" tabindex="-1" class="page-link">...</a></li>',
            linksTmpl: '<li class="page-item"><a href="%url" class="page-link">%num</a></li>',
            activePageTmpl: '<li class="page-item active"><a href="javascript:void(0);" class="page-link">%num</a></li>',
            firstPageTmpl: '<li class="page-item"><a href="%url" class="page-link">%text</a></li>',
            lastPageTmpl: '<li class="page-item"><a href="%url" class="page-link">%text</a></li>',
            template: `<nav aria-label="Pagination">
                          <ul class="pagination">
                             %links
                          </ul>
                       </nav>`.trim()
        };

        self.options = { };

        self.setOption(options);

        self.totalItems = totalItems || 0;
        self.itemsPerPage = self.maxPageToShow = itemsPerPage || 5;
        self.urlPattern = urlPattern || '?page=%num';
        self.numPages = 0;
        self.currentPage = currentPage;

        self._updateNumPages();
    }

    _updateNumPages() {
        this.numPages = (this.itemsPerPage === 0 ?
            this.totalItems : Math.ceil(this.totalItems / this.itemsPerPage));
    }

    _createPage(pageNum, isCurrent = false) {
        return {
            num: pageNum,
            url: this.getPageUrl(pageNum),
            isCurrent: isCurrent
        }
    }

    _createPageEllipsis() {
        return {
            num: this.getDisabledPageTmpl(),
            url: null,
            isCurrent: false
        }
    };

    setMaxPagesToShow(page) {
        if(page < 3) {
            throw new TypeError('maxPagesToShow cannot be less than 3.');
        }

        this.maxPageToShow = page;

        return this;
    }

    getMaxPagesToShow() {
        return this.maxPageToShow;
    }

    setCurrentPage(page) {
        page = parseInt(page) || 1;
        page = Math.abs(page);
        page = Math.min(page, Math.max(this.getNumPages()));

        this.currentPage = page;

        return this;
    }

    getCurrentPage() {
        const url = new URL(location.href);
        const currentPage = this.currentPage;

        if (!isNaN(parseInt(currentPage)) && currentPage > 0) {
            return parseInt(currentPage) || 1;
        }

        return parseInt(url.searchParams.get(this.getOption('pageName', 'page'))) || 1;
    }

    setItemsPerPage(page) {
        const self = this;

        self.itemsPerPage = page;

        self._updateNumPages();

        return this;
    }

    getItemsPerPage() {
        return this.itemsPerPage;
    }

    setTotalItems(items) {
        const self = this;

        self.totalItems = items;

        self._updateNumPages();

        return this;
    }

    getTotalItems() {
        return this.totalItems;
    }

    setNextPageText(text) {
        this.setOption('nextPageText', text);

        return this;
    }

    getNextPageText() {
        return this.getOption('nextPageText')
    }

    setPrevPageText(text) {
        this.setOption('prevPageText', text);

        return this;
    }

    getPrevPageText() {
        return this.getOption('prevPageText');
    }

    setFirstPageText(text) {
        this.setOption('firstPageText', text);

        return this;
    }

    getFirstPageText() {
        return this.getOption('firstPageText');
    }

    setLastPageText(text) {
        this.setOption('lastPageText', text);

        return this;
    }

    getLastPageText() {
        return this.getOption('lastPageText');
    }

    setFirstPageTmpl(tmpl) {
        this.setOption('firstPageTmpl', tmpl);

        return this;
    }

    getFirstPageTmpl() {
        return this.getOption('firstPageTmpl');
    }

    setLastPageTmpl(tmpl) {
        this.setOption('lastPageTmpl', tmpl);

        return this;
    }

    getLastPageTmpl() {
        return this.getOption('lastPageTmpl');
    }

    setPrevPageTmpl(tmpl) {
        this.setOption('prevPageTmpl', tmpl);

        return this;
    }

    getPrevPageTmpl() {
        return this.getOption('prevPageTmpl')
    }

    setNextPageTmpl(tmpl) {
        this.setOption('nextPageTmpl', tmpl);

        return this;
    }

    getNextPageTmpl() {
        return this.getOption('nextPageTmpl');
    }

    setLinksTmpl(tmpl) {
        this.setOption('linksTmpl', tmpl);

        return this;
    }

    getLinksTmpl() {
        return this.getOption('linksTmpl');
    }

    setActivePageTmpl(tmpl) {
        this.setOption('activePageTmpl', tmpl);

        return this;
    }

    getActivePageTmpl() {
        return this.getOption('activePageTmpl');
    }

    setDisabledPageTmpl(tmpl) {
        this.setOption('disabledPageTmpl', tmpl);

        return this;
    }

    getDisabledPageTmpl() {
        return this.getOption('disabledPageTmpl');
    }

    getNextPage() {
        if(this.getCurrentPage() < this.getNumPages()) {
            return this.getCurrentPage() + 1;
        }

        return null;
    }

    getPrevPage() {
        if(this.getCurrentPage() > 1) {
            return this.getCurrentPage() - 1;
        }

        return null;
    }

    getLastPage() {
        const self = this;
        const numPages = self.getNumPages();

        if(numPages > self.getMaxPagesToShow() &&
            numPages > 5 &&
            numPages !== self.getCurrentPage() &&
            (numPages - self.getCurrentPage()) > 3) {
            return numPages;
        }

        return null;
    }

    getFirstPage() {
        const self = this;

        if(self.getNumPages() > 5 &&
            self.getCurrentPage() > 3) {
            return 1;
        }

        return null;
    }

    getNextPageUrl() {
        if(this.getNextPage() === null) {
            return null;
        }

        return this.getPageUrl(this.getNextPage());
    }

    getPrevPageUrl() {
        if(this.getPrevPage() === null) {
            return null;
        }

        return this.getPageUrl(this.getPrevPage());
    }

    getFirstPageUrl() {
        if(this.getFirstPage() == null) {
            return null;
        }

        return this.getPageUrl(this.getFirstPage());
    }

    getLastPageUrl() {
        if(this.getLastPage() === null) {
            return null;
        }

        return this.getPageUrl(this.getLastPage());
    }

    getCurrentPageUrl() {
        return this.getPageUrl(this.getCurrentPage());
    }

    isLastPage() {
        return this.getCurrentPage() === this.getNextPage();
    }

    getTemplate() {
        return this.getOption('template', null);
    }

    setTemplate(template) {
        this.setOption('template', template);

        return this;
    }

    getPages() {
        const self = this;
        const pages = [ ];
        const numPages = self.getNumPages();
        const currentPage = self.getCurrentPage();
        const maxPagesToShow = self.getMaxPagesToShow();

        if(numPages <= 1) return pages;

        if(numPages <= maxPagesToShow) {
            for(let i = 1; i <= numPages; i++) {
                pages.push(self._createPage(i, i === currentPage));
            }
        } else {
            const numAdjacents = Math.floor((maxPagesToShow - 3) / 2);

            let slidingStart = ((currentPage + numAdjacents) > numPages ?
                (numPages - maxPagesToShow) + 2 : currentPage - numAdjacents);

            if(slidingStart < 2) slidingStart = 2;

            let slidingEnd = slidingStart + maxPagesToShow - 3;

            if(slidingEnd >= numPages) slidingEnd = numPages - 1;

            pages.push(self._createPage(1, currentPage === 1));

            if(slidingStart > 2) pages.push(self._createPageEllipsis());

            for(let i = slidingStart; i <= slidingEnd; i++) {
                pages.push(self._createPage(i, i === currentPage));
            }

            if(slidingEnd < numPages - 1) pages.push(self._createPageEllipsis());

            pages.push(self._createPage(numPages, currentPage === numPages));
        }

        return pages;
    }

    getPageUrl(pageNum) {
        return replaceArgs(this.getUrlPattern(), {
            '%num': pageNum
        });
    }

    getUrlPattern() {
        return this.urlPattern;
    }

    setUrlPattern(pattern) {
        this.urlPattern = pattern;

        return this;
    }

    getNumPages() {
        return this.numPages;
    }

    toString() {
        return this.toHtml();
    }

    getFirstPageLink() {
        const self = this;

        return replaceArgs(self.getFirstPageTmpl(), {
            '%url': self.getFirstPageUrl() || '',
            '%num': self.getFirstPage() || self.getCurrentPage(),
            '%text': self.getFirstPageText()
        });
    }

    getPrevPageLink() {
        const self = this;

        return replaceArgs(self.getPrevPageTmpl(), {
            '%url': self.getPrevPageUrl() || '',
            '%num': self.getPrevPage() || self.getCurrentPage(),
            '%text': self.getPrevPageText()
        });
    }

    getLastPageLink() {
        const self = this;

        return replaceArgs(self.getLastPageTmpl(), {
            '%url': self.getLastPageUrl() || '',
            '%num': self.getLastPage() || self.getNumPages(),
            '%text': self.getLastPageText()
        });
    }

    getNextPageLink() {
        const self = this;

        return replaceArgs(self.getNextPageTmpl(), {
            '%url': self.getNextPageUrl() || '',
            '%num': self.getNextPage() || self.getCurrentPage(),
            '%text': self.getNextPageText()
        });
    }

    getLinks() {
        const self = this;

        let html = '';

        for (let page of this.getPages()) {
            const { num, url, isCurrent } = page;

            if(url) {
                html += replaceArgs((isCurrent ? self.getActivePageTmpl() : self.getLinksTmpl()), {
                    '%url': url,
                    '%num': num
                });
            } else {
                html += self.getDisabledPageTmpl();
            }
        }

        return html;
    }

    toHtml() {
        const self = this;
        const include = self.getOption('include', { });

        let html = '';

        if(self.getNumPages() <= 1) return html;

        if (include.firstPage && self.getFirstPage()) {
            html += self.getFirstPageLink();
        }

        if (include.prevPage && self.getPrevPageUrl()) {
            html += self.getPrevPageLink();
        }

        if (include.links) {
            html += self.getLinks();
        }

        if(include.nextPage && self.getNextPageUrl()) {
            html += self.getNextPageLink();
        }

        if(include.lastPage && self.getLastPageUrl()) {
            html += self.getLastPageLink();
        }

        if(include.template && self.getTemplate()) {
            html = replaceArgs(self.getTemplate(), {
                '%links': html
            });
        }

        return html;
    }

    simplePaginate() {
        const self = this;

        self.setOption({
            links: false,
            firstPage: false,
            lastPage: false
        });

        return self.toString();
    }

    templatePaginate() {
        const self = this;

        return replaceArgs(self.getTemplate(), {
            '%prevPageLink': self.getPrevPageLink(),
            '%firstPageLink': self.getFirstPageLink(),
            '%nextPageLink': self.getNextPageLink(),
            '%lastPageLink': self.getLastPageLink(),
            '%links': self.getLinks(),
            '%prevPageUrl': self.getPrevPageUrl() || '',
            '%nextPageUrl': self.getNextPageUrl() || '',
            '%firstPageUrl': self.getFirstPageUrl() || '',
            '%currentPage': self.getCurrentPage()
        });
    }

    getCurrentPageFirstItem() {
        const first = (this.getCurrentPage() - 1) * this.getItemsPerPage() + 1;

        if (first > this.getTotalItems()) {
            return null;
        }

        return first;
    }

    getCurrentPageLastItem() {
        const first = this.getCurrentPageFirstItem();

        if (first === null) {
            return null;
        }

        const last = first + this.getItemsPerPage() - 1;

        if (last > this.getTotalItems()) {
            return this.getTotalItems();
        }

        return last;
    }

    getDefaults() {
        return this.defaults;
    }

    getOptions() {
        return this.options;
    }

    setOption(name, value) {
        if (typeof name === 'object') {
            this.options = extend(this.defaults, name);
        } else {
            if (typeof value === "undefined") {
                throw new TypeError('value parameter required.');
            }

            this.options[name] = value;
        }

        return this;
    }

    getOption(name, _default = '') {
        return this.options[name] || _default;
    }

}

module.exports = FastPaginator;
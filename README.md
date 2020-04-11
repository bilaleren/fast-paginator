# Fast Paginator

FastPaginator is compatible with all frameworks.

### Getting Started

Install the module: `npm install fast-paginator`

The FastPaginator plugin returns class that accepts an parameters.
Call this to get access to the module functionality itself. E.g:

```javascript
import FastPaginator from 'fast-paginator';

const paginator = new FastPaginator(100);
 ```
 
## Examples

### Basic usage

- FastPaginator uses bootstrap 4 by default.

- FastPaginator searches for the word "page" by default using search parameters.

```javascript
import FastPaginator from 'fast-paginator';

const totalItems = 100;

const paginator = new FastPaginator(
    totalItems,
    /*
    currentPage,
    itemsPerPage,
    urlPattern,
    options
    */
);

console.log(paginator.toHtml()); // return bootstrap 4 pagination.

console.log(paginator.getPages()) // return pages Array.
```

### Simple Paginate

This is used only to go to the previous and next page.

```javascript
import FastPaginator from 'fast-paginator';

const paginator = new FastPaginator(100);

console.log(paginator.simplePaginate()); // return < > style buttons.
```

### Template Paginate

```javascript
import FastPaginator from 'fast-paginator';

const paginator = new FastPaginator(100);

paginator.setTemplate(`<div aria-label="Pagination Navigation" role="navigation" class="ui pagination menu">
                             :firstPageLink
                             :prevPageLink 
                             :links
                             :nextPageLink
                             :lastPageLink
                       </div>`);

console.log(paginator.templatePaginate());
```

### FastPaginator use semantic ui

```javascript
import FastPaginator from 'fast-paginator';

const paginator = new FastPaginator(100);

paginator.setOption({
    template: `<div aria-label="Pagination Navigation" role="navigation" class="ui pagination menu">
                   :links
               </div>`.trim(),
    firstPageText: '«',
    lastPageText: '»',
    nextPageText: '>',
    prevPageText: '<',
    firstPageTmpl: `<a aria-current="false"
                       aria-disabled="false"
                       tabindex="0"
                       value=":num"
                       aria-label="First item"
                       type="firstItem"
                       class="item">:text</a>`,
    lastPageTmpl: ` <a
                       aria-current="false"
                       aria-disabled="false"
                       tabindex="0"
                       value=":num"
                       aria-label="Last item"
                       type="lastItem"
                       class="item">
                       :text
                     </a>`,
   nextPageTmpl: `<a
                      aria-current="false"
                      aria-disabled="false"
                      tabindex="0"
                      value=":num"
                      aria-label="Next item"
                      type="nextItem"
                      class="item">
                      :text
                    </a>`,
   prevPageTmpl: `<a
                      aria-current="false"
                      aria-disabled="false"
                      tabindex="0"
                      value=":num"
                      aria-label="Previous item"
                      type="prevItem"
                      class="item"
                        :text
                    </a>`,
   disabledPageTmpl: `<a
                          aria-current="false"
                          aria-disabled="true"
                          tabindex="-1"
                          value="3"
                          type="ellipsisItem"
                          class="item">
                          ...
                        </a>`,
   linksTmpl: `<a aria-current="false" aria-disabled="false" tabindex="0" value=":num" type="pageItem" class="item">
                   :num
                 </a>`,
   activePageTmpl: `<a
                        aria-current="true"
                        aria-disabled="false"
                        tabindex="0"
                        value=":num"
                        type="pageItem"
                        class="active item">
                        :num
                      </a>`
});
```
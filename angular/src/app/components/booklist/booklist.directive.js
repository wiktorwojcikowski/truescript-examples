export function BooklistDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/booklist/booklist.html',
    scope: {
        books: '='
    },
    controller: BooklistController,
    controllerAs: 'bl',
    bindToController: true
  };

  return directive;
}

class BooklistController {
  constructor () {
    'ngInject';

    this.pageLimit = 5;
    this.pageCount = Math.floor(this.books.length / this.pageLimit);
    this.page = 0;
    this.orderBy = '+title';
    this.expanded = -1;
  }

  toggleExpand(idx) {
    if(this.expanded == idx) {
      this.expanded = -1;
    }
    else {
      this.expanded = idx;
    }
  }

  setOrder(column) {
    this.page = 0; 
    this.expanded = -1;
    this.orderBy = (this.orderBy == '+' + column ? '-' + column : '+' + column);
  } 

  setPage(page) {
    if(page > this.pageCount) {
      page = this.pageCount;
    }
    else if(page < 0) {
      page = 0;
    }
    this.page = page; 
    this.expanded = -1;
  } 
}
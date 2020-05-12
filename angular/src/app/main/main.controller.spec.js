describe('controllers', () => {
  let vm;

  beforeEach(angular.mock.module('angular'));

  var books = [{title: 'qwe'}];
  
  beforeEach(inject(($controller) => {
    vm = $controller('MainController', { books: books });
  }));

  it('should have a books', () => {
    expect(vm.books).toEqual(jasmine.any(Array));
  });

});

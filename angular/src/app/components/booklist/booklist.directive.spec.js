/**
 * @todo Complete the test
 * This example is not perfect.
 * Test should check if MomentJS have been called
 */
describe('directive booklist', function() {
  let bl;
  let element;
  let scope = {};

  beforeEach(angular.mock.module('angular'));

  beforeEach(inject(($compile, $rootScope) => {
    scope = $rootScope.$new();
    scope.books = [
      {
        "title": "Example",
        "publishedDate": "2020-02-02T00:00:00.000-0800",
        "thumbnailUrl": "https://",
        "longDescription": "Long desc.",
        "authors": ["Joe Doe"],
        "links": { "iBooks": "#"}
      },
    ];

    element = angular.element(`
      <booklist books="books"></booklist>
    `);

    $compile(element)(scope);
    $rootScope.$digest();
    bl = element.isolateScope().bl;
  }));

  it('should be compiled', () => {
    expect(element.html()).not.toEqual(null);
  });

  it('should have isolate scope object with instanciate members', () => {
    expect(bl).toEqual(jasmine.any(Object));

    expect(bl.books).toEqual(jasmine.any(Array));
    expect(bl.books[0]).toEqual(jasmine.any(Object));
    expect(bl.books.length == 1).toBeTruthy();
    expect(bl.page == 0).toBeTruthy();
    expect(bl.pageCount == 0).toBeTruthy();
  });
});

/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
  this.toolbar = element(by.css('md-toolbar'));
  this.h1El = this.jumbEl.element(by.css('h1'));
  this.booklist = element(by.css('booklist'));
  this.books = booklist.all(by.repeater('book in bl.books'));
};

module.exports = new MainPage();

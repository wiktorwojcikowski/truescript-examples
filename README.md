# ExpressJS, Angular and Typescript examples


## 1 ExpressJS API

Nothing to hide, it was generated with `express-generator-typescript`. 

```cd ./api/
npm i
npm test
npm run start:dev
```
Adding export requests:
`curl --header "Content-Type: application/json" --request POST --data '{"bookIpe":"epub"}' http://localhost:3000/api/jobs/exports`

Listing requests list:
http://localhost:3000/api/jobs/exports


## 2 Angular SPA

Same as above, base code was generated with `generator-gulp-angular`. I like this app structure. I was using it in one of my projects in the past. Unfortunately its a bit unmaintained, but I fixed gulp and tests to work with the latest Node.

```cd ./angular/
npm i && bower i
npm test
npm start
```


## 3 Text compiler

Allow merging operations: moves, inserts, and deletes (also overlapping deletes). To run use:

```cd ./text-compiler/
npm i
npm test
npm start
```

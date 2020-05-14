# ExpressJS, Angular and Typescript examples


## 1 ExpressJS API

Small Api that save requests and process them in the background.

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

Small angular interface with list ordering and pagination.

```cd ./angular/
npm i && bower i
npm test
npm start
```


## 3 Text compiler

Compiler for single text actions:

```cd ./text-compiler/
npm i
npm test
npm start
```

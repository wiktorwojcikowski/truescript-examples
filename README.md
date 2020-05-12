# Reedsy Code Challange

## 1. About me


In 2013-2016 I was working in the U.S. startup that provided captive portal technology, for hotels, hostels, etc. We had a nice microservice infrastructure based mostly on JS. There ware around 30 small applications: APIs, client and operators applications, and event workers. Authentication was based on the JWT token and passportJS server. Messaging between actions and backend processes handled by a RabbitMQ server. 
- main captive portal app and operators frontends ware an AngularJS applications, with webpack as module bundler. 
- APIs ware expressJS applications simply with Postgres as a data store. 
- Socket.io server for live updates on the client's frontends.
- AMQP Workers ware base on jackrabbit library
- own small library to share authentication tools.

Unfortunately even the best code doesn't make product successful - hard lesson. But I still look at this project when I have a bad day ;). 


## 2. Document versioning

Disk space efficiency means that we store diffs between versions, and compute versions each time. I'm not sure it would be cheaper than store hole versions in simple NoSQL DB. But, I could imagine a mixed solution with keeping both. Computed full versions and constantly save small changes to have a full history of changes. In that case, we have 2 data structures one for hole versions and the second one for changes:

```
Version : {
  document_id,
  datetime,
  text
}
```
```
Change : {
  document_id,
  author_id,
  created_at,
  position, 
  type: insert|remove,
  string
}
```
In that solution when we generate version from the exact time we look for the latest full version that was created before this time and add only those changes that happened after (and before the exact time we look for). Full versions store could be also some memcash or similar. 

I think some solution to that problem would be also own git server. 



## 3 ExpressJS API

Nothing to hide, it was generated with `express-generator-typescript`. 

```cd ./api/
npm i
npm test
npm start:dev
```
Adding export requests:
`curl --header "Content-Type: application/json" --request POST --data '{"bookIpe":"epub"}' http://localhost:3000/api/jobs/exports`
Listing requests path:
http://localhost:3000/api/jobs/exports


## 4 Angular SPA

Same as above, base code was generated with `generator-gulp-angular`. I like this app structure. I was using it in one of my projects in the past. Unfortunately its a bit unmaintained, but I fixed gulp and tests to work with the latest Node.

```cd ./angular/
npm i
npm test
npm start
```


## 4 Text compiler

Allow merging operations: moves, inserts, and deletes (also overlapping deletes). To run use:

```cd ./text-compiler/
npm i
npm test
npm start
```

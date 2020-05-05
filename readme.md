# San Jose State University

# Enterprise Software - CMPE172/Spring2020

## Team Members

- Aaron Warren
- Alexander Len
- Jeffrey Wu

## Table of contents
- [San Jose State University](#san-jose-state-university)
- [Enterprise Software - CMPE172/Spring2020](#enterprise-software---cmpe172spring2020)
  - [Team Members](#team-members)
  - [Table of contents](#table-of-contents)
  - [Project Introduction](#project-introduction)
  - [Sample Demo Screenshots](#sample-demo-screenshots)
  - [Requirements](#requirements)
  - [Setup](#setup)
    - [Setup for Frontend](#setup-for-frontend)
      - [Additional Setup](#additional-setup)
    - [Setup for Backend](#setup-for-backend)
  - [UML Diagram](#uml-diagram)
  - [Database Schema](#database-schema)
    - [Primary tables](#primary-tables)
    - [Relation Tables](#relation-tables)
  - [Database Queries](#database-queries)
  - [Mid tier APIs](#mid-tier-apis)
  - [UI Data Transport](#ui-data-transport)

## Project Introduction

The project is a normal store front where a user can purchase products on their account, save card information, and keeps track of user history as well as the most popular items on the store. The program runs using Docker with ReactJS on the frontend, in the backend is Spring boot with a java based backend, and then the database is an AWS RDS running MySQL.

## Sample Demo Screenshots

Login Page

![](https://i.imgur.com/Uj4ZFnE.png)

Register Page

![](https://i.imgur.com/gc6ILFB.png)

Home Page

![](https://i.imgur.com/KwuV29W.png)

Profile Page

![](https://i.imgur.com/7nTtJOm.png)

Order History Page

![](https://i.imgur.com/QRPHHAA.png)

## Requirements

- Docker
- Node
- Java8

## Setup

To run the project locally, follow all the instructions below carefully.

### Setup for Frontend

- CD into `./frontend`
- Run the command
```shell
docker build -t sample:dev -f ./Dockerfile.txt .
```
- Once the image is done building, run the command
```shell
docker run -it --rm -v ${pwd}:/app -v /app/node_modules -p 3001:3000 sample:dev
```
- After that the page will be accessible at either http://192.168.99.100:3001/ or http://localhost:3001/
  - If the page is not accessible at http://localhost:3001/, additional setup is necessary

#### Additional Setup
- Exit the program on docker
- Open the folder located at `./backend/src/main/java/com/store/backend`
- Open all the files that end in "Controller.java"
- At the top before the class declaration you will see: `@CrossOrigin(origins = "http://localhost:3001")`
  - Change `"http://localhost:3001"` to the IP and Port of where docker launched the application
  - For example: `@CrossOrigin(origins = "http://192.168.99.100:3001/")`
- After doing this for all 5 Controller files, restart the initial frontend setup and then frontend setup is complete

### Setup for Backend

- CD into `./backend`
- Run the command
```shell
.\mvnw.cmd spring-boot:run
```
- This will start the backend on http://localhost:8080/

## UML Diagram

![](https://i.imgur.com/dQYK6Xo.png)
![](https://i.imgur.com/KDGWrBu.png)

## Database Schema

### Primary tables

account(account_id, email, password, address, cell, name, session_id)

card_info(card_id, card_holder, code, card_number, zip, exp_month, exp_year)

cart(id, account_id, item_id, quantity)

orders(order_id, price)

items(item_id, description, image, name, price, purchased)

item_categories(category_id, category_name)

### Relation Tables

holds(id, account_id, card_id)

belongs(id, category_id, item_id)

make(id, account_id, order_id)

contains(id, item_id, order_id, quantity)

## Database Queries

All database queries were made using CRUD and spring boots RestController functions. This meant that queries were not done in normal SQL and instead are done in functions. For example, if trying to get all the rows in the Table `cart` based on the `account_id` I would make a function in the `CartRepo.java` file called `Iterable<Cart> findAllByAccountId(Integer accountId`. This would allow it so that whenever I made a call to this function it would return all the rows that contained `accountId`. The only functions that were not made are the ones provided by the CRUD dependency which is only `findAll()` and `findById(Integer Id)`. Otherwise the functions that were created are in their respective files that end with `Repo.java`.

## Mid tier APIs

All calls are made from the frontend via Get requests to the backend. The requests are intercepted by the various Controllers for their respective data sets. The functions on the frontend can all be found in `./frontend/src/APIFunctions.js`. The functions on the backend can all be found in `./backend/src/main/java/com/store/backend`. In that folder are various java files that end with `Controller.java` that handle all requests made by the frontend.

## UI Data Transport

For all our data transport needs we sent the information from the backend to the frontend in JSON format. For sending data from the frontend to the backend we sent the information using HTTP Get requests.

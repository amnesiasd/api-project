# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index GET '/products', index;
- Show GET '/products/:id', show
- Create [token required] POST '/products', post

#### Users

- Index [token required] GET '/users/, index
- Show [token required] GET '/users/:id', show
- Create [token required] POST '/users', post

#### Orders

- Current Order by user (args: user id)[token required] GET /showUserOrders/:id, showUserOrders

#### If using PostMan, use UdacityApi json file to import into Postman

- UdacityApi.postman_collection.json

## Data Shapes

![StoreFront Data Shapes](https://user-images.githubusercontent.com/14042720/132752238-2c845d20-4eca-435d-b619-ed01b1fd3c5e.png)

### DB Model

![StoreFront DB Model](https://user-images.githubusercontent.com/14042720/132509495-ed664ee5-782d-4ce3-ae38-c0b4ca34b924.png)

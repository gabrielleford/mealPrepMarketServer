# Meal Prep Market

Server for Meal Prep Market app. Users can sign up to sell their meal prep services or as a customer interested in purchasing prepped meals.  
[Client Repo](https://github.com/gabrielleford/mealPrepMarketClient)  
[Admin Client Repo](https://github.com/gabrielleford/mealPrepMarketAdmin)

Technology Used:

    Node.js PostGreSQL, Sequelize

## Created by Gabrielle Ford
[GitHub](https://github.com/gabrielleford)  
[LinkedIn](https://www.linkedin.com/in/gabrielle-f-293251221/)  
[Portfolio](https://gabrielleford.github.io/)

## Tasks
    Completed   Task
    ---         ---
    01.20       Setup server files (app.js, db.js, middleware), created user, listing, and order models
    01.20       User endpoints -> /register endpoint
    
    01.21       database associations, fixed datatype errors  
    01.21       Listing endpoints -> /create, / (gets all), /:id (listing by id), /tag/:tag, /:id (update), /:id (delete)
    01.21       Order endpoints -> /:listingid, /orders (gets users placed orders)
    01.21       User endpoints -> /login, /all users, /:id user, /edit user, /delete user  
    
    01.22       Order endpoints ->  /fulfillment (gets orders to be fulfilled by primary user), /:id (cancels order)  
    01.22       Permissions created & added to endpoints
    
    01.25       Added a user/checkToken endpoint to get user info
    
    02.01       Added listing model to user by id
    
    02.02       Order endpoints -> added listing model to /myOrders, fixed delete endpoint on orders
    
    02.03       Order model -> added listingOwner to make /fulfillment simpler
    02.03       Order endpoints -> fixed /fulfillment/:id to make client side fetch simpler

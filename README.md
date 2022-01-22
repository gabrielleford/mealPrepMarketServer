# Meal Prep Market

Server for Meal Prep Market app. Users can sign up to sell their meal prep services or as a customer interested in purchasing prepped meals.

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

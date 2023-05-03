#  API documentation Inventory Management System
- This repository contains API documentation for Inventory Management System

## 1. Overview

- Basic API endpoint
      Deployed = `https://inventerymanagesystem.onrender.com`.
      local =`htp://localhost:4000` 
- All requests must be secure, i.e. `https`, not `http`.
- for Locally run
    -  Build command npm i 
    -  run comman npm run server
    - need to create a .env file 
    ```
        {
            mongourl:url of database to connect
            Secret:for token secret
            port: to listen the server
        }
    ```

## 2. Authentication
- This API uses Role based authrization.
- In order to perform user any crud in app, Token is required.
- Token can be obtained by creating account and logging in to the system.
- No saperate login routes for users and admins.


## 3. authorization 
- This is uses to authorize the admin .
- In order to perform delete put/patch or post user must be login as a admin
- For login as a admin one need to use gmail `admin@gmail.com`

## 4. User
- Registration
    - URL: `/user/registration`
    - Method: POST
    - Parameters:
    ```
    {
        name:String,(required)
        age:Number,(required)
        password:String,(required)
        email:String(required)
    }
    ```
    - Responses
        - 201 (Ok): `{"msg":"Registration succesfull"}`
        - 200 (ok):`{"msg":"Already registersd"}`
        - 400 (all field required): `{ msg: Please provide name, age, email & Password}`
        - 500 (error in hashing hte password): `{"msg":"something went wrong in password hashing"}`

- Login
    - URL: `/user/login`
    - Method: POST
    - Parameters:
    ```
    {
        email: string (required),
        password:string user_password(required) 
    }
    ```
    - Responses
        - 201 (Ok): `{"msg":"successfully log in",token}`
        - 404 (account does not exists): `{"msg":" you have not registered or give wrong credetials"}`
        - 400 (all fields required): `{msg: Please provide email & password}`
        - 500 (wrong password): `{"msg":"error in comparing the password"} ||{"msg":"something went wrong",error} `
        

## 5 Inventory Routes

- GET ALL Inventory
   - URL:`/inventory`
   - Method: GET
   - Parameters: {Not required}
   - Response 
       - 200 (ok): `{data of inventroy}`
       - 500 (error) : `{"msg":"something went wrong",error}`


- Post a Inventory Item
   - URL:`/inventory`
   - Method: POST
   - Parameters:
    ```
    {
        name:String (required),
        price:Number(required),
       description:String(required)
    }
    ```
   - Response 
       - 400 (all fields required): `{msg: Please provide all the fields for inventory}`
       - 201 (ok) : `{"msg":"Inventory data has been posted"}`
       - 500 (error) : `{"msg":"something went wrong",error}`


-  GET A particular Inventory Item
   - URL:`/inventory/:id`
   - Method: GET
   - Parameters: {id as a param required}
   - Response 
       - 200 (ok): `{data of particular inventroy}`
       - 500 (error) : `{"msg":"something went wrong",error}`

-  Delete A particular Inventory Item
   - URL:`/inventory/:id`
   - Method: Delete
   - Parameters: {id as a param required}
   - Response 
       - 204 (ok): `{"msg":"Particular inventory item deleted"}`
       - 404 (not valid): `{"msg":"particular data is not available"}`
       - 500 (error) : `{"msg":"something went wrong",error}`


-  Update A particular Inventory Item
   - URL:`/inventory/:id`
   - Method: PUT
   - Parameters: {id as a param required}
   - Response 
       - 204 (ok): `{"msg":"Particular inventory item deleted"}`
       - 404 (not valid): `{"msg":"particular data is not available"}`
       - 500 (error) : `{"msg":"something went wrong",error}`






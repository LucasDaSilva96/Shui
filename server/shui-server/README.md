# API Documentation

## This project provides a Serverless API for managing posts. The API is built using AWS Lambda and API Gateway, and it includes the following endpoints:

## Endpoints

- **Get All Posts**
  URL: /posts
  Method: GET
  Description: Retrieves all posts.
  Handler: functions/getAllPosts/index.handler

- **Get Post by ID**
  URL: /posts/{id}
  Method: GET
  Description: Retrieves a single post by its ID.
  Handler: functions/getPost/index.handler

- **Get Posts by Username**
  URL: /posts/username
  Method: POST
  Description: Retrieves posts by a specific username.
  Handler: functions/getPostsByUser/index.handler

- **Update Post**
  URL: /posts/update/{id}
  Method: PUT
  Description: Updates a post by its ID.
  Handler: functions/updatePost/index.handler

- **Delete Post**
  URL: /posts/delete/{id}
  Method: DELETE
  Description: Deletes a post by its ID.
  Handler: functions/deletePost/index.handler

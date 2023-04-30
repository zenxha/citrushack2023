# API Documentation

## Post collection [/api/posts]

### List all Posts [GET]

Lists in array format all posts stored on the database

+ Response 200 (application/json)

## Upvote a post [/api/upvote]

### List all Posts [PUT]

An endpoint to upvote the post specified by the ID
Headers
```json
"postId": "{POST ID HERE}"
```

+ Response 200 (application/json)
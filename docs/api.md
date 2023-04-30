# API Documentation



## List all Tunes [GET]
- `/api/allposts`
- Lists in array format all tunes stored on the database

+ Response 200 (application/json)

## List all tunes in descending order (# of upvotes) [GET]
- `/api/allposts`
- Lists in array format all tunes stored on the database in descending order
- Highest voted tunes appear at the top

+ Response 200 (application/json)

## Upvote a post [PUT]
- `/api/upvote`
- An endpoint to upvote the post specified by the ID

Headers
```json
"postId": "{POST ID HERE}"
```

+ Response 200 (application/json)


## Delete a post [DELETE]
- `/api/delete`
- An endpoint to delete the post specified by the ID

Headers
```json
"postId": "{POST ID HERE}"
```

+ Response 200 (application/json)

# WikiAPI_REST
This is an implementation of Node.js REST API for Wikipedia kind of website.

This uses all HTTP requests/verbs for fetching, posting, updating, patching and deleting of articles in chaining and uses a NOSQL database such as MongoDB. This is built using `Node.js` and  `Express` framework. I tested this API using <a href='https://www.postman.com/'>**Postman**</a> which works well.
## About API
* ### For `/article` route:
  get, post, and delete methods on **All the articles** that are in the server.
  * #### <a href='https://expressjs.com/en/api.html#app.get.method'>get request</a>:
    When the client requires all the available articles in the server, get request is made.
  * #### <a href='https://expressjs.com/en/api.html#app.post.method'>post request</a>:
    When client needs to post a new article into the server, post request is used.
    The paramenters requied are:
    ```js
    {
      title: '',
      content: ''
    }
    ```
  * #### <a href='https://expressjs.com/en/api.html#app.delete.method'>delete request</a>:
    When client sends a HTTP delete request, it deletes all the articles. It returns a message after successful deletion of the article else returns error.
* ### For `/article/specificArticle` route:
  get, put, patch and delete methods on **A specific article** in the server.
  * #### get request:
    When client requires a specific article, get request is made. The paramenter is `title` of the article that has to be fetched.
  * #### <a href='https://expressjs.com/en/api.html#app.put.method'>put request</a>:
    If the client is reqiured to change the article then this put request is used by passing articleTitle as a parameter and this changes entire article. if any field is not provided it is replaced with NULL.
  * #### patch request:
    This request is helpful when client needs to update an article on particular fields that he/she provide a particular data for.
  * #### delete request:
    When a delete request comes in for **specific article** then server deletes that specific article by taking articleTitle as parameter.
    

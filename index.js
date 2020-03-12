// implement your API here
const express = require('express');

const db = require('./data/db.js'); // need path because it's a local package - db obj

const server = express(); 

server.listen(4000, () => {
  console.log("listening on port 4000...");
});
// All we need to run an express server

server.use(express.json()); // middleware - same as server.us((req, res) => {}) - custom written one - built in function as a cb - all requests coming in no matter what method it is

// HTTP Methods - POST(Send info to Create new instance), GET(Reading), PUT(Updating), DELETE(D) - CRUD operations
// URI : scheme://host_name:port/path?parameter_list
// https://www.google.com/some/document?with_params=value

/* Methods to create endpoints & handlers to get better messages instead of the default express message "Cannot GET/" in the browser */

// Project
// POST /api/users - Creates a user using the info sent inside the request body. Create, part of CRUD - done
server.post('/api/users', (req, res) => {
  const { name, bio } = req.body
  !name || !bio // either or - if one of them is missing, then throw an error message
   ? res.status(400).json({ errorMessage: "Please provide name or bio for the user."}) // Bad Request response
   : db
    .insert(req.body)
    .then(user => {
      res.status(201).json(user) // Created - Successful response
    })
    .catch(err => {
      res.status(500).json({ // Server Error response
        error: 'There was an error while saving the user to the database',
        err,
      })
    })
}) 
// Worked on postman - created a user and assigned { id: 3 } - Body, raw & JSON 
// Postman: A REST Client to test the API. 

// GET /api/users - Returns an array of all the user objects contained in the database - Read of CRUD - done
// find(): calling find returns a promise that resolves to an array of all the users contained in the db
server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json({ users }); //  OK - Successful response - The request has succeeded
    })
    .catch(err => {
      res.status(500).json({ // Internal server error - it doesn't know how to handle
        success: false, 
        error: 'The users info could not be retrieved', // if there's a problem in .then method, it will throw an err
        err,
      });
    })
})
// Worked on Postman

// GET /api/users/:id - Returns the user obj with the specified id - R in Read (CRUD)
// When the client makes a GET request to /api/users/:id
// If the user with the specified id is not found, respond with HTTP status code 404 (Not Found)
// return the following JSON obj: { message: "The user with the specified ID does not exist." }
server.get('/api/users/:id', (req, res) => {
const { id } = req.params

  db.findById(id)
    .then(user => {
      user
        ? res.status(200).json(user) // http://localhost:4000/api/users/:id
        : res
            .status(404)
            .json({
              errorMessage: "The user with specified ID does not exist",
            });
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The users info could not be retrieved.", success: false })
    })
})
  // Worked on Postman


  // DELETE /api/users/:id - Removes the user with the specified id and returns the deleted user - done
  // When the client makes a DELETE request to /api/users/:id

  // If the user with the specified id is not found:
  // respond with HTTP status code 404 (Not Found)
  // return the following JSON obj: { message: "The user with the specified ID does not exist." }

// If there's an eror in removing the user from the database:
// respond with HTTP status code 500
// return the following JSON obj: { errorMessage: "The user could not be removed" }
server.delete('/api/users/:id', (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;

  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end(); // the id was deleted - response without any data
      } else {
        res.status(404).json( // Not Found - the id didn't exist in the first place
          { success: false, 
            message: "The user with the specified ID does not exist" });
      }
    })
    .catch(err => { // catch all for the exceptions
      res.status(500).json(
        { success: false, 
          errorMessage: "The user could not be removed"
        })
    })
})
// Worked in Postman

// PUT /api/users/:id Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original - Update of CRUD
// When the client makes a PUT request to /api/users/:id

// If the user is found and the new info is valid: 
// update the user document in the db using the new info sent in the request body
// respond with HTTP status code 200 (OK)
// return the newly updated user document

// If the user with the specified id is not found
// Respond with HTTP status code 404 (Not Found)
// Return the following JSON obj: { message: "The user with the specified ID does not exist." }

// If there's an error when updateing the user:
// respond with HTTP status code 500
// return the following JSON ob: { errorMessage: "The user info could not be modified" }

// Combo of delete & put
server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  const { name, bio } = req.body
  !name || !bio
  ? res.status(400).json({ errorMessage: "Please provide name or bio for the user"})

  :db
    .update(id, changes) 
    .then(updated => { // new obj called updated
      if (updated) {
        res.status(200).json(
          changes); // if a value comes back, success message
      } else {
        res.status(404).json(
          { success: false, message: "id not found" });
      }
    })
    .catch(err => {
      res.status(500).json(
        { success: false, 
          errorMessage: "The user info could not be modified"
        }
      );
    });
})
// Worked on Postman


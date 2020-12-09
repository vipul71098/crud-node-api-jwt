const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');



//user model
const userData = require('../../models/Users');


		

router.get('/', verifyToken,(req,res) => {

        // verify makes sure that the token hasn't expired and has been issued by us
      jwt.verify(req.token, 'secretkey', (err,authData) => {
          if(err) {
            res.sendStatus(403);
      	  } else {
      			userData.find()									
	 					.then((user) =>{res.json(user)})
	 					.catch((err) =>{res.status(404).json({sucess:false})})
       	  }
      });									
});

    //@route GET api/user
    //@desc get all userData

	


router.post('/insert',verifyToken,(req,res) => {

      jwt.verify(req.token, 'secretkey', (err,authData) => {
         if(err) {
        res.sendStatus(403);
        } else {
                 const newUsers = new userData({         
                            name: req.body.name,            
                            dob: req.body.dob,
                            education: req.body.education,        
                            gender: req.body.gender,          
                            address: req.body.address,
                            Phone: req.body.Phone,
                            email: req.body.email
                 });

                newUsers.save().then((user) => {res.json(user)})
                                .catch((err) =>{res.status(404).json({error:err})})       
              }
      }); 
});

    //@route POST api/user/insert
    //@desc add all userData


router.put('/update/:id',verifyToken, function (req, res) {
	       jwt.verify(req.token, 'secretkey', (err,authData) => {
            if(err) {
              res.sendStatus(403);
      	    } else {
      			      userData.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
                  if (err) return res.status(500).send(err);
                  res.status(200).send(user);
                  });
       		    }
        });	
    
});

    //@route PUT api/user/update
    //@desc add all userData


router.delete('/delete/:id',verifyToken,(req,res) => {

          jwt.verify(req.token, 'secretkey', (err,authData) => {
              if(err) {
                  res.sendStatus(403);
              } else {
                  userData.findById(req.params.id)                        
                  .then((user) => {user.remove().then(() => {res.json({sucess:true})})})  
                  .catch((err) =>{res.status(404).json({error:"Not deleted"})})
              }
         }); 

})

//@route DELETE api/user/delete
//@desc delete all userData

router.post('/login', (req, res) => {
  // Mock user
  const user = {
   
    username: 'vip',
    email: 'vip@mail.com'
  }

  jwt.sign({user}, 'secretkey',  (err, token) => {
    res.json({
      token
    });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const authorizationHeaader = req.headers['authorization'];
  // Check if authorizationHeaader is undefined
  if(authorizationHeaader) {
   const token = req.headers.authorization.split(' ')[1];
    // Set the token
    req.token = token;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}

module.exports = router;
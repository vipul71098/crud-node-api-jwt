const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var validateEmail = function(email) {

    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return re.test(email)

};

//Create Schema

const UsersSchema = new Schema({
		name : {
			type:String,
			required :true
		},
		dob: {
		 	type: Date,
		 	default:Date.now()
		 	
		},
		education : {
			type:String,
			required :true
		},
		gender: { 
			 type: String , 
			 required: true
		},
		address: { 
			 type: String , 
			 required: true
		},
	    Phone: {
   			type: Number,
   			required: true,
  	    },
		email:    { 
    		type: String,     
			Required:  'Email address cannot be left blank.',
    		validate: [validateEmail, 'Please fill a valid email address'],
         	match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    		index: {unique: true, dropDups: true}
    
    	}
});

module.exports = Users = mongoose.model('item',UsersSchema);
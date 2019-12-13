// ESTABLISH DATABASE CONNECTION
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});
pool.on('error', (err, client) => {
   console.error('Unexpected error on idle client', err)
   process.exit(-1)
 })

postUser = async(req, res) => {
    try {
        const first = req.query.fname;
        const last  = req.query.lname;
        const email = req.query.email;
        const a = await addUser(first, last, email);
        console.log(a);
        res.send(first, last);
    } catch {
        console.log("Could not add user");
    } 
}
addUser = async(first, last, email) => {
    const sql = "INSERT INTO User_app(first_name, last_name, email, user_role)VALUES($1, $2, $3, (SELECT id FROM User_role WHERE role_name='User'))";
    const params = [first, last, email];
    pool.query(sql, params, function(err, result) {
        // if (err) {
        //     callback(err, null);
        // }
        // callback(null, result.rows);
    });
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('Done');
        }, 200);
    });
}

// FUNCTION getJobs queries database for jobs
function getJobs(req, res) {
    // Get category from dropdown menu
    const category = req.query.category;
    getJobsFromDb(category, function(error, result) {
         if (error || result == null) {
            res.status(500).json({success: false, data: error});
         } else {
            // send query results to be displayed on results page
            res.render('pages/jobs', {result: result});
       }
    });
 }
 function getJobsFromDb(category, callback) {
    var sql = "";
    // If no category specified, then display all jobs
    if(category == "" || category == null){
        sql = "SELECT * FROM Job";
        pool.query(sql, function(err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, result.rows);
        });
    }
    // If there is a category, then display jobs from that category
    else{ 
        sql = "SELECT * FROM Job JOIN Category USING(id) WHERE cat_name = $1";
        const params = [category];
        pool.query(sql, params, function(err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, result.rows);
        });
    }   
 }

 // FUNCTION getJobs queries database for jobs
function getReviews(req, res) {
    // Get category from dropdown menu
    getReviewsFromDb(function(error, result) {
         if (error || result == null) {
            res.status(500).json({success: false, data: error});
         } else {
            // send query results to be displayed on results page
            res.send({result: result});
       }
    });
 }
 function getReviewsFromDb(callback) {
    var sql = "SELECT * FROM Review, User_app WHERE Review.user_app_id = User_app.id;";
    pool.query(sql, function(err, result) {
        if(err) {
            callback(err, null);
        }
        callback(null, result.rows);
        console.log(result);
    })  
 }

 // FUNCTION getJobs queries database for jobs
function getUser(req, res) {
    const email = req.query.email;
    // Get category from dropdown menu
    getUserFromDb(email, function(error, result) {
         if (error || result == null) {
            res.status(500).json({success: false, data: error});
         } else {
            // send query results to be displayed on results page
            res.send({result: result});
       }
    });
 }
 function getUserFromDb(email, callback) {
    const params = [email];
    var sql = "SELECT * FROM User_app WHERE email = $1";
    pool.query(sql, params, function(err, result) {
        if(err) {
            callback(err, null);
        }
        callback(null, result.rows);
        console.log(result);
    })  
 }

 module.exports = {
     getJobs: getJobs,
     getUser: getUser,
     postUser: postUser,
     getReviews: getReviews
};
// ESTABLISH DATABASE CONNECTION
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});
pool.on('error', (err, client) => {
   console.error('Unexpected error on idle client', err)
   process.exit(-1)
 })

/*********************************************
 * POST USER
 *********************************************/
postUser = async(req, res) => {
    try {
        const first = req.query.fname;
        const last  = req.query.lname;
        const email = req.query.email;
        const result = await addUser(first, last, email);
        console.log("User result: " + result);
        sess = req.session;
        // parsed = JSON.parse(result);
        sess.user = result;
        res.send(first, last);
    } catch {
        console.log("Could not add user");
    } 
}
addUser = async(first, last, email) => {
    const sql = "INSERT INTO User_app(first_name, last_name, email, user_role)VALUES($1, $2, $3, (SELECT id FROM User_role WHERE role_name='User')) returning *";
    const params = [first, last, email];
    pool.query(sql, params, function(err, result) {
        return result;
    });
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('Done');
        }, 200);
    });
}

/*********************************************
 * POST REVIEW
 *********************************************/
postReview = async(req, res) => {
    try {
        const review = req.query.review;
        console.log("User Review: " + review);
        sess = req.session;
        email = sess.user[0].email;
        console.log("User: " + sess.user);
        console.log("User email: " + email)
        const a = await addReview(email, review);
        console.log(a);
        res.send();
    } catch {
        console.log("Could not add review");
    } 
}
addReview = async(email, review) => {
    const sql = "INSERT INTO Review(user_app_id, review_text)VALUES((SELECT id FROM User_app WHERE email=$1), $2)";
    const params = [email, review];
    pool.query(sql, params, function(err, result) {

    });
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('Done');
        }, 200);
    });
}

/*********************************************
 * GET USER
 *********************************************/
function getUser(req, res) {
    const email = req.query.email;
    console.log(email);
    // Get category from dropdown menu
    getUserFromDb(email, function(error, result) {
         if (error || result == null) {
            res.status(500).json({success: false, data: error});
            console.log("ERROR");
         } else {
            // send query results to be displayed on results page
            sess = req.session;
            // parsed = JSON.parse(result);
            sess.user = result;
            res.send({result: sess.user});
            console.log("Results are: " + result);
            console.log("Results are: " + sess.user);
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
        console.log("RESULTS:" + result.rows);
    })  
 }

/*********************************************
 * GET JOBS
 *********************************************/
// FUNCTION getJobs queries database for jobs
function getJobs(req, res) {
    // Get category from dropdown menu
    const category = req.query.category;
    getJobsFromDb(category, function(error, result) {
         if (error || result == null) {
            res.status(500).json({success: false, data: error});
         } else {
            // send query results to be displayed on results page
            sess = req.session;
            // parsed = JSON.parse(result);
            if(sess.user != undefined) {
                res.render('pages/jobs', {result: result, user: sess.user});
                console.log("User set: " + sess.user);
            } else {
                res.render('pages/jobs', {result: result, user: sess.user});
                console.log("User NOT set");
            }
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

 /*********************************************
 * GET REVIEWS
 *********************************************/
function getReviews(req, res) {
    getReviewsFromDb(function(error, result) {
         if (error || result == null) {
            res.status(500).json({success: false, data: error});
         } else {
            // send query results to be displayed on results page
            sess = req.session;
            if(sess.user != undefined) {
                res.render('pages/reviews', {result: result, user: sess.user});
                console.log("User set: " + sess.user);
            } else {
                res.render('pages/reviews', {result: result, user: sess.user});
                console.log("User NOT set");
            }
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

 module.exports = {
     getJobs: getJobs,
     getUser: getUser,
     postUser: postUser,
     postReview: postReview,
     getReviews: getReviews
};
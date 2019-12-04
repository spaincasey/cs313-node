// ESTABLISH DATABASE CONNECTION
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});
pool.on('error', (err, client) => {
   console.error('Unexpected error on idle client', err)
   process.exit(-1)
 })

function postUser(req, res) {
    const first = request.body.first_name;
    console.log("First Name: " + first);
    // var sql = "INSERT INTO User_app(first_name, last_name, email, user_role)VALUES($1, $2, $3, (SELECT id FROM User_role WHERE role_name='User'))";
}

// function search() {
//     var category = document.getElementById('category').value;
//     console.log('Category: ' + category);

// }


// FUNCTION getJobs queries database for jobs
function getJobs(req, res) {
    // Get category from dropdown menu
    const category = req.query.category;
    getJobsFromDb(category, function(error, result) {
         if (error || result == null) {
            res.status(500).json({success: false, data: error});
         } else {
            // send query results to be displayed on results page
            res.render('pages/results', {result: result});
       }
    });
 }
 function getJobsFromDb(category, callback) {
    var sql = "";
    // If no category specified, then display all jobs
    if(category == ""){
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

 module.exports = {getJobs: getJobs};
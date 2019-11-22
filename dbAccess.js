function getJobs(req, res) {
    console.log("Category is: " + req.body.category);
    console.log("Category is: " + req.query.category);
    const category = req.query.category;
     getJobsFromDb(category, function(error, result) {
 
         if (error || result == null || result.length != 1) {
             res.status(500).json({success: false, data: error});
         } else {
             const person = result[0];
          res.status(200).json(person);
          // response.render('pages/jobs', {results: results});
       }
       
    });
 }
 
 function getJobsFromDb(category, callback) {
    const sql = "SELECT * FROM Job JOIN Category USING(id) WHERE cat_name = $1";
     // const sql = "SELECT * FROM Job WHERE category = $1";
     const params = [category];
     pool.query(sql, params, function(err, result) {
         if (err) {
             console.log("Error in query: ")
             console.log(err);
             callback(err, null);
         }
         console.log("Found result: " + JSON.stringify(result.rows));
         callback(null, result.rows);
    });
 }
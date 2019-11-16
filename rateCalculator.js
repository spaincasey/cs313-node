function calculate(req, res) {
    var weight = req.query.weight;
    var type = req.query.type;
    // var cpu = getCpuChoice();
    // var winner = getWinner(player, cpu, username);
    var stuff = {weight: weight, type: type};
    res.render('results', stuff);
 }
 
 module.exports = {calculate: calculate};
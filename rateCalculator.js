function calculateRate(weight, type){
    switch(type) {
        case "Letters(Stamped)":
            if(weight <= 1) {
                return 0.55;
            } else if (weight <= 2) {
                return 0.70;
            } else if (weight <= 3) {
                return 0.85;
            } else {
                return 1.00;
            }
            break;
        case "Letters(Metered)":
            if(weight <= 1) {
                return 0.50;
            } else if (weight <= 2) {
                return 0.65;
            } else if (weight <= 3) {
                return 0.80;
            } else {
                return 95;
            }
            break;
        case "Large Envelopes(Flats)":
            if(weight <= 1) {
                return 1.00;
            } else if (weight <= 2) {
                return 1.15;
            } else if (weight <= 3) {
                return 1.30;
            } else if (weight <= 4) {
                return 1.45;
            } else if (weight <= 5) {
                return 1.60;
            } else if (weight <= 6) {
                return 1.75;
            } else if (weight <= 7) {
                return 1.90;
            } else if (weight <= 8) {
                return 2.05;
            } else if (weight <= 9) {
                return 2.20;
            } else if (weight <= 10) {
                return 2.35;
            } else if (weight <= 11) {
                return 2.50;
            } else if (weight <= 12) {
                return 2.65;
            } else {
                return 2.80;
            }
            break;
        default:
            if(weight <= 4) {
                return 3.66;
            } else if (weight <= 8) {
                return 4.39;
            } else if (weight <= 12) {
                return 5.19;
            } else {
                return 5.71;
            }
    }
}

function calculate(req, res) {
    var weight = req.query.weight;
    var type = req.query.type;
    var rate = calculateRate(weight, type);
    // var cpu = getCpuChoice();
    // var winner = getWinner(player, cpu, username);
    var stuff = {weight: weight, type: type, rate:rate};
    res.render('pages/result', stuff);
 }
 
 module.exports = {calculate: calculate};
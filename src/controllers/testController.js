//Will use revealing module pattern
var testController = function()   
{
    var hello = function(req,res){
        //console.log("Inside bot controller");
		res.send("Hello world");
    };

    return {
        hello:hello
    }
}

module.exports = testController;
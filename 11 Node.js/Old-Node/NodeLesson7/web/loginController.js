var path = new Map();

function getData(request, response) {
    response.writeHead(200);
    response.writeHead("hello");
    response.end();

}
path.set("/getData", getData);


function getData2(request, response) {

}
path.set("/getData2", getData2);

module.exports.path = path;


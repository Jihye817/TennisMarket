let http = require("http"); //nodejs가 가지고 있는 모듈 "http"를 불러오는 함수 require
let url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    let pathname = url.parse(request.url).pathname; //주소 뒤에 오는 경로
    let queryData = url.parse(request.url, true).query;
    route(pathname, handle, response, queryData);
  }

  http.createServer(onRequest).listen(8888);
  //localhost:8888
}

exports.start = start;

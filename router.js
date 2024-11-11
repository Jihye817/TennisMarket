function route(pathname, handle, response, queryData) {
  console.log("pathname : " + pathname);
  if (typeof handle[pathname] == "function") {
    handle[pathname](response, queryData);
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("page not found");
    response.end();
  }
}

exports.route = route;

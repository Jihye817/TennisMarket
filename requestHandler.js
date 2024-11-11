const fs = require("fs");
const main_view = fs.readFileSync("./main.html", "utf-8");
const orderlist_view = fs.readFileSync("./orderlist.html", "utf-8");

const mariadb = require("./database/connect/mariadb");

function main(response) {
  console.log("main");

  mariadb.query("select * from product", function (err, rows) {
    console.log(rows);
  });

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(main_view);
  response.end();
}

function favicon() {}

function redRacket(response) {
  fs.readFile("./img/redRacket.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}
function blueRacket(response) {
  fs.readFile("./img/blueRacket.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}
function blackRacket(response) {
  fs.readFile("./img/blackRacket.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}
function mainCss(response) {
  fs.readFile("./main.css", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/css" });
    response.write(data);
    response.end();
  });
}
function orderlistCss(response) {
  fs.readFile("./orderlist.css", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/css" });
    response.write(data);
    response.end();
  });
}

function order(response, queryData) {
  response.writeHead(200, { "Content-Type": "text/html" });
  mariadb.query(
    "insert into orderlist values (" +
      queryData.productId +
      ", '" +
      queryData.productName +
      "', " +
      queryData.productPrice +
      ", '" +
      new Date().toLocaleDateString() +
      "');",
    function (err, rows) {
      console.log(rows);
    }
  );

  response.write(
    "<div style='text-align:center'><br><h2>Thanks for Ordering</h2>"
  );
  response.write("<a href='/orderlist'>go to order list</a><br>");
  response.write("<a href='/'>go home</a></div>");
  response.end();
}

function orderlist(response) {
  response.writeHead(200, { "Content-Type": "text/html" });

  mariadb.query(
    "select product_id, product_name, product_price, order_date from orderlist",
    function (err, rows) {
      response.write(orderlist_view);
      rows.forEach((item) => {
        response.write(
          "<tr>" +
            "<td>" +
            item.product_id +
            "</td>" +
            "<td>" +
            item.product_name +
            "</td>" +
            "<td>" +
            item.product_price +
            "</td>" +
            "<td>" +
            item.order_date +
            "</td>" +
            "</tr>"
        );
      });
      response.write("</table>");
      response.end();
    }
  );
}

let handle = {}; // key: value 쌍으로 이루어짐
//handle["key"] = value
handle["/"] = main;
handle["/favicon.ico"] = favicon;
handle["/order"] = order;
handle["/orderlist"] = orderlist;

//image directory
handle["/img/redRacket.png"] = redRacket;
handle["/img/blueRacket.png"] = blueRacket;
handle["/img/blackRacket.png"] = blackRacket;
handle["/main.css"] = mainCss;
handle["/orderlist.css"] = orderlistCss;

exports.handle = handle;

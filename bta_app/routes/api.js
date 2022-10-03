
const express = require("express");
const router = express.Router();
var request = require("request");

const dotenv = require("dotenv");
dotenv.config();

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;

const headers = {
	"content-type": "text/plain;"
};

var dataString = "";
var options = {
	url: `http://${USER}:${PASS}@127.0.0.1:8332/`,
	method: "POST",
	headers: headers,
	body: dataString
};

router.get("/test", (req, res) => res.json({ msg: "backend works" }));
router.get("/getbalance", (req, res) => {
	dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getbalance","params":[]}`;
	options.body = dataString;

	callback = (error, response, body) => {
		if (!error && response.statusCode == 200) {
			const data = JSON.parse(body);
			res.send(data);
		}
	};
	request(options, callback);
});

router.post("/getnewaddress", (req, res) => {
	dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getnewaddress","params":[]}`;
	options.body = dataString;
	callback = (error, response, body) => {
		if (!error && response.statusCode == 200) {
			const data = JSON.parse(body);
			res.send(data);
		}
	};
	request(options, callback);
});

router.post("/listunspent", (req, res) => {
	dataString = `{"jsonrpc":"1.0","id":"curltext","method":"listunspent","params":[]}`;
	options.body = dataString;
	callback = (error, response, body) => {
		if (!error && response.statusCode == 200) {
			const data = JSON.parse(body);
			res.send(data);
		}
	};
	request(options, callback);
});
router.post("/sendbitcoins", (req, res) => {
	console.log(req.body.address);
	var dataString =
		`{"jsonrpc":"1.0","id":"curltext","method":"sendtoaddress","params":["` +
		req.body.address +
		`",` +
		req.body.amount +
		`, "` +
		req.body.comment +
		`", "` +
		req.body.organizationcomment +
		`"]}`;

	options.body = dataString;
	callback = (error, response, body) => {
		if (!error && response.statusCode == 200) {
			const data = JSON.parse(body);
			res.send(data);
		}
		else {
			console.log(error);
			console.log(response.statusCode);
		}
	};
	request(options, callback);
});
module.exports = router;
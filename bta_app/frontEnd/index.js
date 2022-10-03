
const Http = new XMLHttpRequest();
const getBalance = () => {
	var balance = "0.00 BTC";
	const url = 'http://localhost:4444/api/getbalance';
	Http.open("GET", url);
	Http.send();
	Http.onreadystatechange = (e) => {
		console.log(Http.responseText);
		var data = Http.responseText;

		// $(".alert").hide().show('medium');
		try {
			let jsonRes = JSON.parse(data);
			balance = jsonRes["result"]
			document.getElementById("balance").innerHTML = balance + ' BTC';

		} catch (err) {
			// 👇️ SyntaxError: Unexpected end of JSON input
			document.getElementById("balance").innerHTML = 'Error retrieving balance';
		}
	}

}


const getNewAddress = () => {
	var address = "";
	const url = 'http://localhost:4444/api/getnewaddress';
	Http.open("POST", url, {});
	Http.send();
	Http.onreadystatechange = (e) => {
		console.log(Http.responseText);
		var data = Http.responseText;

		// $(".alert").hide().show('medium');
		try {
			let jsonRes = JSON.parse(data);
			address = jsonRes["result"]
			document.getElementById("new_address").innerHTML = address;

		} catch (err) {
			// 👇️ SyntaxError: Unexpected end of JSON input
			document.getElementById("address").innerHTML = 'Error generating address';
		}



	}

}
const sendBitcoins = () => {
	var address = document.getElementById("sender_address");
	var amount = document.getElementById("amount");


	var dataToSend = {
		// address: address.value,
		// amount: amount.value
		'address': address.value,
		'amount': amount.value,
		'comment': ' ',
		'organizationcomment': ' '
	}
	const url = 'http://localhost:4444/api/sendbitcoins';
	Http.open("POST", url, {});
	Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	Http.send(JSON.stringify(dataToSend));
	Http.onreadystatechange = (e) => {
		console.log(Http.responseText);
		var data = Http.responseText;

		// $(".alert").hide().show('medium');
		try {
			let jsonRes = JSON.parse(data);
			console.log(jsonRes);
			address = jsonRes["result"]
			alert(amount + "BTC sent!");
		} catch (err) {

			console.log(err);
		}

	}

}

const getUnlisted = () => {
	const tbl = document.getElementsByClassName('table');

	let unspentList;
	const url = 'http://localhost:4444/api/listunspent';
	Http.open("POST", url, {});
	Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	Http.send();
	Http.onreadystatechange = (e) => {

		var data = Http.responseText;

		// $(".alert").hide().show('medium');
		try {
			let jsonRes = JSON.parse(data);
			// console.log(jsonRes);
			unspentList = jsonRes["result"]
			append_json(unspentList);// pass the json object to the append_json function

		} catch (err) {

			console.log(err);
		}

	}

}


const append_json = (data) => {
	console.log(data.length);
	const table = document.createElement("table");
	table.setAttribute("class", 'table table-hover table-sm table-responsive')
	let col = [];
	for (let i = 0; i < data.length; i++) {
		for (let key in data[i]) {
			if (col.indexOf(key) === -1) {
				col.push(key);
			}
		}
	}

	// Create table header row using the extracted headers above.
	let tr = table.insertRow(-1);                   // table row.

	for (let i = 0; i < col.length; i++) {
		let th = document.createElement("th");      // table header.
		th.innerHTML = col[i];
		tr.appendChild(th);
	}

	// add json data to the table as rows.
	for (let i = 0; i < data.length; i++) {

		tr = table.insertRow(-1);

		for (let j = 0; j < col.length; j++) {
			let tabCell = tr.insertCell(-1);
			tabCell.innerHTML = data[i][col[j]];
		}
	}
	const divShowData = document.getElementById('unspent');
	divShowData.innerHTML = "";
	divShowData.appendChild(table);

}

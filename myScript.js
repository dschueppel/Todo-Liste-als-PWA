var listData = 
{
	loggedIn: false,
	loginData:
	{
		login:
		{
			name: "",
			password: ""
		},
		register:
		{
			name: "",
			password: "",
			confirmPassword: ""
		}
	}
}

var listFunctions =
{
	getUserName: function()
	{
		$.post("getactiveuser.php", {}, 
		function(d)
		{
			username1.innerText = JSON.parse(d).name;
		});
	},
	autoLoginUser: function()
	{
		$.post("login.php", 
		{}, function(d)
		{
			if(d === "success")
			{
				listData.loggedIn = true;
			}
		});
	},
	loginUser: function()
	{
		if(listData.loginData.login.name.trim().length > 0)
		{
			$.post("login.php", 
			{
				loginName: listData.loginData.login.name,
				loginPassword: listData.loginData.login.password
			},
			function(d)
			{
				if(d === "success")
				{
					listData.loggedIn = true;
					listFunctions.getUserName();
					listFunctions.getList();
				}
				else
				{
					alert(d);
				}
			})
		}
		else
		{
			alert("Der Name darf nicht leer sein!");
		}
	},
	registerUser: function()
	{
		if(listData.loginData.register.name.trim().length > 0 
				&& listData.loginData.register.password.length >= 9 
				&& /^[a-z|A-Z][a-z|A-Z|0-9]*/g.test(listData.loginData.register.name))
		{
			$.post("register.php", 
			{
				registerName: listData.loginData.register.name,
				registerPassword: listData.loginData.register.password,
				registerConfirmPassword: listData.loginData.register.confirmPassword
			},
			function(d)
			{
				if(d === "success")
				{
					listData.loggedIn = true;
					listFunctions.getUserName();
					listFunctions.getList();
				}
				else
				{
					alert(d);
				}
			})
		}
		else
		{
			alert("Der Benutzername darf nicht leer sein und muss mit einem Buchstaben beginnen.\n"+
					"Außerdem muss das Passwort mindestens 9 Zeichen lang sein.");
		}
		
	},
	checkOnline: function()
	{
		$.post("checkonline.php", {},
		function(d)
		{
			if (d !== "online")
			{
				listData.loggedIn = false;
				loggedIn.style.display = "none";
				loggedOut.style.display = "block";
				// listData.listState = "menu";
			}
			else
			{
				loggedOut.style.display = "none";
				loggedIn.style.display = "block";
			}
		});
	},
	logOut: function()
	{
		let userId;

		$.post("getactiveuser.php", {}, 
		function(d)
		{
			userId = JSON.parse(d).id;
			$.post("logout.php", {id: userId},
			function(d)
			{
				listData.loggedIn = false;
			});
		});
	},
	onAppStart: function()
	{
		$.post("autologin.php", {},
		function(d)
		{
			if(d === "success")
			{
				listData.loggedIn = true;
				listFunctions.getUserName();
				listFunctions.getList();
			}
		});
		listFunctions.autoLoginUser();
		setInterval(listFunctions.checkOnline, 500);
	},
	submitListData: function(row, op)
	{
		if (!op)
			return;
		
		let userId;
		listFunctions.showSave();
		
		$.post("getactiveuser.php", {},
		function(d)
		{
			userId = JSON.parse(d).id;
			if (op == 1) {
				$.post("addTodo.php", {
					userid: userId
				},
				function(d) {
					row.dbid = JSON.parse(d)[0][0];
				});
			}
			else {
				var time_val = null;
				if (row.cells[6].children[0].checked)
					time_val = row.cells[6].children[1].value;
				
				$.post("updateTodo.php", {
					id: row.dbid,
					userid: userId,
					hex_color: parseInt(row.cells[1].firstChild.value.slice(1, 7), 16),
					done: row.cells[2].firstChild.checked & 1,
					flag_imp: row.cells[3].firstChild.checked & 1,
					priority: row.cells[4].firstChild.value,
					mydate: row.cells[5].firstChild.value,
					mytodo: row.cells[7].firstChild.value,
					mytime: time_val
				},
				function(d) {
					// console.log(d);
				});
			}
		});
	},
	update_login_data: function()
	{
		listData.loginData.login.name = login_name.value;
		listData.loginData.login.password = login_password.value;
	},
	update_reg_data: function()
	{
		listData.loginData.register.name = reg_name.value;
		listData.loginData.register.password = reg_password.value;
		listData.loginData.register.confirmPassword = reg_confirmPassword.value;
	},
	deleteRow: function(btn, op)
	{
		listFunctions.showSave();
		
		var row = btn.parentNode;
		var id = row.rowIndex;
		if (!confirm("Bist du sicher, dass du die "+id+". Zeile löschen willst?"))
			return;
		var par = row.parentNode;
		var rows = par.childElementCount;
		for (var i = id + 1; i < rows; i++) {
			par.rows[i].firstChild.innerText = i - 1;
		}
		row.parentNode.removeChild(row);
		
		$.post("getactiveuser.php", {},
		function(d)
		{
			userId = JSON.parse(d).id;
			$.post("deleteTodo.php", {
				op: op,
				id: row.dbid,
				userid: userId,
			});
		});
	},
	add_todo: function(op = 0)
	{
		var docFrag = document.createDocumentFragment();
		var eltr = document.createElement("tr");
		eltr.dbid = null;
		docFrag.appendChild(eltr);
		// Ein Fragment geht NICHT ins DOM!
		
		var types =
		[
			"",
			"color",
			"checkbox",
			"checkbox",
			"number",
			"date",
			"time"
		];
		
		for (let j = 0; j < 8; j++) {
			const td = eltr.insertCell();
			td.className = "td" + j;
			if (j == 0) {
				td.innerText = main_list.childElementCount;
				continue;
			}
			if (j != 7) {
				var input = document.createElement('input');
				input.type = types[j];
				if (j == 4) {
					input.value  = "0";
					input.min = "-128";
					input.max =  "127";
				}
				else if (j == 6) {
					var chk = document.createElement('input');
					chk.type = "checkbox";
					td.appendChild(chk);
				}
			}
			else {
				var input = document.createElement('textarea');
			}
			td.appendChild(input);
		}
		
		var btn = document.createElement('button');
		btn.innerText = "Löschen";
		btn.addEventListener('click', function() {
			listFunctions.deleteRow(this, 1);
		});
		
		eltr.addEventListener('change', function() {
			listFunctions.submitListData(this, 2);
		});
		
		eltr.appendChild(btn);
		main_list.appendChild(docFrag); // Erst hier
		
		if (op)
			listFunctions.submitListData(eltr, op);
	},
	getList: function()
	{
		main_list.innerHTML = '<table id="main_list"><tr><th>Nr.</th><th>Farbe</th><th>Erledigt?</th><th>Wichtig?</th><th>Priorität</th><th>Datum</th><th>Uhrzeit</th><th>Beschreibung</th></tr></table>';
		
		main_list = main_list;
		
		$.post("getactiveuser.php", {}, 
		function(d)
		{
			userId = JSON.parse(d).id;
			$.post("getList.php", {
				userid: userId
			},
			function(d) {
				var mylist = JSON.parse(d);
				var len = mylist.length;
				for (let i = 1, i2 = 0; i2 < len; i++, i2++) {
					listFunctions.add_todo(0);
					main_list.rows[i].dbid = mylist[i2].id;
					main_list.rows[i].cells[1].firstChild.value = "#" + mylist[i2].hex_color.toString(16);
					main_list.rows[i].cells[2].firstChild.checked = mylist[i2].done;
					main_list.rows[i].cells[3].firstChild.checked = mylist[i2].flag_important;
					main_list.rows[i].cells[4].firstChild.value = mylist[i2].priority;
					main_list.rows[i].cells[5].firstChild.value = mylist[i2].date;
					main_list.rows[i].cells[6].firstChild.checked = mylist[i2].time != null;
					main_list.rows[i].cells[6].children[1].value = mylist[i2].time;
					main_list.rows[i].cells[7].firstChild.value = mylist[i2].todo_text;
				}
			});
		});
	},
	showSave: function()
	{
		info1.style.visibility = "visible";
		var tmo = setTimeout(() => { info1.style.visibility = "hidden" }, 250);
	},
};

// import { createApp } from 'vue';
/*
var app = Vue.createApp(
	{
		data: listData,
		methods: listFunctions,
		created: listFunctions.onAppStart
	}).mount("#app");
*/

listFunctions.checkOnline();
listFunctions.onAppStart();

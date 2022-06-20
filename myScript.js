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
	},
	listState: "menu",
	listTab: "list",
	listTabs: [
		{
			id: "list", 
			name: "List"
		},
		{
			id: "lists", 
			name: "Lists"
		}]
	
	// TODO: Refine data
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
			console.log("Du bist ", d);
			if(d !== "online")
			{
				listData.loggedIn = false;
				listData.listState = "menu";
				loggedIn.style.display = "none";
				loggedOut.style.display = "block";
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
			}
		});
		listFunctions.autoLoginUser();
		setInterval(listFunctions.checkOnline, 500);
	},
	submitListData: function(list)
	{
		let userId;

		// TODO: submit the real data
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
	deleteRow: function(btn)
	{
		var row = btn.parentNode;
		var id = row.rowIndex;
		if (!confirm("Bist du sicher, dass du die "+id+". Zeile löschen willst?"))
			return;
		var par = row.parentNode;
		var rows = par.childElementCount;
		for (var i = id; i < rows; i++) {
			par.rows[i].firstChild.innerText = i - 1;
		}
		row.parentNode.removeChild(row);
	},
	add_todo: function()
	{
		var docFrag = document.createDocumentFragment();
		var eltr = document.createElement("tr");
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
				if (j == 4)
					input.value = "0";
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
			listFunctions.deleteRow(this);
		});
		
		eltr.appendChild(btn);
		main_list.appendChild(docFrag); // Erst hier
	}
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

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
				loggedOut.style.display = "inline-flex";
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

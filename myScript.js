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
            id: "Lists", 
            name: "Lists"
        }]
	
	// TODO: Refine data
}

var listFunctions =
{
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
                }
                else
                {
                    alert(d);
                }
            })
        }
        else
        {
            alert("Username must not be empty!");
        }
    },
    registerUser: function()
    {
        if(listData.loginData.register.name.trim().length > 0 
                && listData.loginData.register.password.length > 8 
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
                }
                else
                {
                    alert(d);
                }
            })
        }
        else
        {
            alert("Username must not be empty and must start with a letter.\n"+
                    "Password must be 9+ characters long.");
        }
        
    },
    logOut: function()
    {
        let userId;

        $.post("getactiveuser.php", {}, 
        function(d)
        {
            userId = JSON.parse(d).id;
            $.post("logout.php", {id: userId});
        });
    },
    checkOnline: function()
    {
        $.post("checkonline.php", {},
        function(d)
        {
            if(d === "offline")
            {
                listData.loggedIn = false;
                listData.listState = "menu";
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
            }
        });

        listFunctions.autoLoginUser();
    },
    submitListData: function(list)
    {
        let userId;

        // TODO: submit the real data
    },
};

// import { createApp } from 'vue';

var app = Vue.createApp(
    {
        data: listData,
        methods: listFunctions,
        created: listFunctions.onAppStart
    }).mount("#app");
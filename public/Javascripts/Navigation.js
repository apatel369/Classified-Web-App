var adId;
var id;
var app = angular.module("TradeIn", ["ui.router"])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/SlideShow");
        $stateProvider.state("SlideShow",
            {
                url: "/SlideShow",
                views: {
                    body: {
                        templateUrl: "SlideShow.html"
                    }
                }
            })
            .state("Buy",
            {
                url: "/Buy",
                views: {
                    body: {
                        templateUrl: "Buy.html"
                    }
                }
            })
            .state("PostAnAd",
            {
                url: "/PostAnAd",
                views: {
                    body: {
                        templateUrl: "PostAnAd.html"
                    }
                }
            })
            .state("ModifyAnAd",
            {
                url: "/ModifyAnAd/:id",
                views: {
                    body: {
                        templateUrl: "ModifyAnAd.html"
                    }
                }
            })
            .state("DeactivateAnAd",
            {
                url: "/DeactivateAnAd",
                views: {
                    body: {
                        templateUrl: "DeactivateAnAd.html"
                    }
                }
            })
            .state("Inboxmessage",
            {
                url: "/Inboxmessage",
                views: {
                    body: {
                        templateUrl: "Inboxmessage.html"
                    }
                }
            })
            .state("ListOfModifyAds",
            {
                url: "/ListOfModifyAds",
                views: {
                    body: {
                        templateUrl: "ListOfModifyAds.html"
                    }
                }
            })
            .state("DisplayAd",
            {
                url: "/DisplayAd/:id",
                views: {
                    body: {
                        templateUrl: "DisplayAd.html"
                    }
                }

            })
            .state("ReviewAd",
            {
                url: "/ReviewAd/:id",
                views: {
                    body: {
                        templateUrl: "ReviewAd.html"
                    }
                }

            })
    });

app.controller("TopNav", function ($scope, $http, $state) {
   
    $scope.checkLogin = function (id) {
        $http.get("/users/currentuser").then(function (response) {
            if (response.data == "No user") {
                if (id == "loggedIn") {
                    console.log("login");
                    document.getElementById('id01').style.display = 'block';
                }
                else
                {
                    on();
                    $state.go("SlideShow");
                }
                
            }
            else {
                if (id == "buy") {                    
                    $state.go("Buy");
                }
                else if (id == "post") {
                    $state.go("PostAnAd");
                }
                else if (id == "modify") {
                    $state.go("ListOfModifyAds");
                }
                else if (id == "deactivate") {                    
                    $state.go("DeactivateAnAd");
                }
                else if (id == "loggedIn") {
                    on(id);
                }
                else if (id == "inboxmessage") {                    
                    $state.go("Inboxmessage");
                }
               
            }
        });
    }
});

app.controller("RegistrationController", function ($scope, $http, $state) {
    $scope.register = function () {
        var data = {
            username: $scope.UserName,
            email: $scope.RegEmail,
            password: $scope.RegPassword,
            password2: $scope.RegrePassword,
            fname: $scope.RegFname,
            lname: $scope.RegLname
        };
        $http.post("/users/register", data).then(function (response) {

            if (typeof response.data == 'object') {
                $scope.Message = "New user successfully registered";
                document.getElementById("RegId").reset();
                var callback = function () {
                    document.getElementById("id01").style.display = 'none';

                };
                setTimeout(callback, 1000);
                var luname = document.getElementById("Userlogin");
                var fname = response.data.firstname;
                var lname = response.data.lastname;
                luname.textContent = "Hello, " + fname + " " + lname;
                $state.go("SlideShow");

            }
            else {
                $scope.Message = response.data;
            }


        });
        
    }

    
});

app.controller("LoginController", function ($scope, $http, $state) {
        $scope.login = function () {
            var data = {
                username: $scope.Lusername,
                password: $scope.loginPassword
            };
            $http.post("/users/login", data).then(function (response) {
                var user = response.data;
                $scope.Username = user;
                if (user == "Enter a valid username or password") {
                    $scope.loginmessage = response.data;
                    document.getElementById("loginId").reset();

                }
                else {
                    $scope.loginmessage = "Successfully logged in";
                    document.getElementById("loginId").reset();
                    var luname = document.getElementById("Userlogin");
                    var fname = response.data.firstname;
                    var lname = response.data.lastname;
                    luname.textContent = "Hello, " + fname + " " + lname;
                    document.getElementById("Userlogin").style.display = 'block';                    
                    var callback = function () {
                        document.getElementById("id01").style.display = 'none';
                    };
                    setTimeout(callback, 1000);
                   
                    $state.go("SlideShow");
                }
              
            });

    }
        

});

app.controller("DisplayUsernameController", function ($scope, $http, $state) {
    $http.get("/users/currentuser").then(function (response) {
        var luname = document.getElementById("Userlogin");
        if (typeof response.data == 'object') {
            
            var fname = response.data.firstname;
            var lname = response.data.lastname;
            luname.textContent = "Hello, " + fname + " " + lname;
            document.getElementById("Userlogin").style.display = 'block';
        }
        else
        {
            luname = "";
        }
        
       
    });
});

app.controller("LogoutController", function ($scope, $http, $state) {
    console.log("logout");
    $scope.logout = function () {
        console.log("logout scope");
        $http.get("/users/Logout").then(function (response) {
            if (response.data == "No user") {
                on();
                $state.go("SlideShow");
            }
            else
            {
                var luname = document.getElementById("Userlogin");
                luname.textContent = "";
                $state.go("SlideShow");
                location.reload();
            }
            
        });
    }

});

app.controller("CreateAdController", function ($scope, $http, $state) {
    $http.get("/users/currentuser").then(function (resp) {
        var email = resp.data.email;
        $scope.CEmail_Id = email;
    $scope.Post_Ad = function () {
        
            var image = [];
            for (var i in $scope.image) {
                image[i] = $scope.image[i];
            }
            var data = {
                itemname: $scope.CItemName,
                description: $scope.CDescription,
                price: $scope.Cprice,
                firstname: $scope.Cfirstname,
                lastname: $scope.Clastname,
                contactno: $scope.ContactNo,
                emailid: email,
                city: $scope.City,
                image: image,
                status: "Active"
            };
            $http.post("/ListAd/AddNewads", data).then(function (response) {

                if (typeof response.data == 'object') {
                    $scope.CreateAdMessage = "New Ad Created";

                }
                else {
                    $scope.CreateAdMessage = response.data;
                }
            });        
        
        }
    });
    $scope.ReviewAd = function () {
        document.getElementById('Review').style.display = 'block';

        $scope.images = []

        for (var i = 0; i < 4; i++) {
            if ($scope.image[i] != undefined) {
                var img = $scope.image[i];
                $scope.images.push(img);
            }
        }
        $scope.itemname = $scope.CItemName;
        $scope.price = $scope.Cprice;
        $scope.description = $scope.CDescription;
        $scope.ownername = $scope.Cfirstname + " " + $scope.Clastname;
        $scope.emailId = $scope.CEmail_Id;     

    }
   
});

app.controller("ListofItemsForModify", function ($scope, $http, $state) {
    $http.get("/ListAd/userAds").then(function (response) {
        if (typeof response.data == 'object') {
            $scope.listofads = [];
            var images = [];
            for (var i = 0; i < response.data.length; i++) {
                images.push(response.data[i].image)
            }
            for (var i = 0; i < response.data.length; i++) {
                var ad = {
                    id: response.data[i].id,
                    image: images[i],
                    name: response.data[i].itemname,
                    created: response.data[i].created
                };
                $scope.listofads.push(ad);
                console.log(ad.id);
            }

            $scope.display = function (id) {
                $state.go("ModifyAnAd", { id: id });
            }

            $scope.submit = function (id) {
                var data = { name: 'deactive' };
                $http.post("/ListAd/" + id, data).then(function (resp) {
                    console.log("button");
                    $state.go("DeactivateAnAd");
                });

            }
        }
        else {
            $scope.modifymessage = "You haven't posted any Ads yet!"
        }
    });
});

app.controller("ModifyAdController", function ($scope, $http, $state) {
    id = $state.params.id;
    $http.post("/ListAd/" + id).then(function (resp) {
        $scope.image = [];
        for (var i in resp.data.image) {
            if (resp.data.image[i] != undefined) {
                var img = resp.data.image[i];
                $scope.image.push(img);
            }
        }
        $scope.MItemName = resp.data.itemname;
        $scope.MDescription = resp.data.description;
        $scope.Mprice = resp.data.price;
        $scope.Mfirstname = resp.data.firstname;
        $scope.Mlastname = resp.data.lastname;
        $scope.MontactNo = resp.data.contactno;
        $scope.MEmail_Id = resp.data.emailid;
        $scope.City =resp.data.city;
    });

    $scope.UpdateAd = function () {
        var images = [];
        for (var i in $scope.image) {
            images[i] = $scope.image[i];
        }

        var data = {
            id: id,
            itemname: $scope.MItemName,
            description: $scope.MDescription,
            price: $scope.Mprice,
            image: images,
            firstname: $scope.Mfirstname,
            lastname: $scope.Mlastname,
            contactno: $scope.MontactNo,
            emailid: $scope.MEmail_Id,
            city: $scope.City,
            status: "Active"
        };
        console.log(data);
        $http.post("/ListAd/AddNewads", data).then(function (response) {
            $state.go("ListOfModifyAds");
        });
    }

});  

app.controller("DeactivatedAdController", function ($scope, $http, $state) {
    console.log("deac");
    $http.get("/ListAd/getDeactivatedAds").then(function (response) {

        if (typeof response.data == 'object') {
            $scope.listofads = [];
            var images = [];
            for (var i = 0; i < response.data.length; i++) {
                images.push(response.data[i].image)
            }
            for (var i = 0; i < response.data.length; i++) {
                var ad = {
                    id: response.data[i].id,
                    image: images[i],
                    name: response.data[i].itemname,
                    created: response.data[i].created
                };
                console.log(ad);
                $scope.listofads.push(ad);
            }
        }
        else {
            $scope.Dmessage = "You have no Deactivated Ads!";
        }

    });

    $scope.submit = function (id) {
        console.log("scope");
        var data = { name: 'activate' };

        $http.post("/ListAd/" + id, data).then(function (resp) {
            console.log("response");
            $state.go("ListOfModifyAds");
        });

    }

});

app.controller("BuyController", function ($scope, $http, $state) {
    $http.get("/ListAd/list").then(function (resp) {
        $scope.items = [];
        var images = [];
        for (var i = 0; i < resp.data.length; i++)
        {
            images.push(resp.data[i].image);
        }
        for (var i = 0; i < resp.data.length; i++) {
            var item = {
                id: resp.data[i].id,
                name: resp.data[i].itemname,
                description: resp.data[i].description,
                image: images[i],
                price: resp.data[i].price,
                created: (new Date(resp.data[i].created)).toLocaleDateString()
            };
            $scope.items.push(item);
        }
    });
    $scope.display = function (id) {
        $state.go("DisplayAd", {id:id});         
     
    }
});

app.controller("displayAdController", function ($scope, $http, $state) {
    adId = $state.params.id;
    $http.post("/ListAd/" + adId).then(function (response) {
       
            $scope.images = []

            for (var i = 0; i < 4; i++) {
                if (response.data.image[i] != undefined) {
                    var img = response.data.image[i];
                    $scope.images.push(img);
                }
            }
            $scope.itemname = response.data.itemname;
            console.log(response.data.itemname)
            $scope.price = response.data.price;
            $scope.description = response.data.description;
            $scope.ownername = response.data.firstname;
            $scope.emailId = response.data.emailid;        
           
    });

    $scope.openMsg = function () {
        var modal = document.getElementById('myModal');
        modal.style.display = "block";
        $http.get("/users/currentuser").then(function (resp) {
            var emailid = resp.data.email;
            var name = resp.data.firstname + " " + resp.data.lastname;
            console.log(emailid);
            $http.post("/ListAd/" + adId).then(function (response) {
                var username = response.data.username;

                $scope.msgsend = function () {

                    var data = {
                        message: $scope.writemsg,
                        to: username,
                        fromEmail: emailid,
                        fromName: name 
                    };
                    $http.post("/message/newmsg", data).then(function (response) {
                        $scope.messagesent = response.data;

                    });
                }
            });

        }); 
       

       
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

    }
});

app.controller("InboxMessageController", function ($scope, $http, $state) {
    $http.get("/message/getmessage").then(function (response) {
        if (typeof response.data == 'object') {
            $scope.messages = [];
            for (var i = 0; i < response.data.length; i++) {
                var msgnum = i + 1;
                var msg = {
                    num: "Message " + msgnum,
                    id: response.data[i].id,
                    fromemail: response.data[i].fromEmail,
                    fromname: response.data[i].fromName,
                    message: response.data[i].message
                };
                console.log(msg);
                $scope.messages.push(msg);
            }
            $scope.msgid = 1;
            $scope.openMsg = function (evt, msgid) {
                $scope.msgid = msgid;
                console.log($scope.msgid);
                console.log(msgid);
                var i, tabcontent, tablinks;


                tabcontent = document.getElementsByClassName("tabcontent");
                for (i = 0; i < tabcontent.length; i++) {
                    tabcontent[i].style.display = "none";
                }


                tablinks = document.getElementsByClassName("tablinks");
                for (i = 0; i < tablinks.length; i++) {
                    tablinks[i].className = tablinks[i].className.replace(" active", "");
                }
                console.log(response.data.fromEmail);
                for (var i = 0; i < response.data.length; i++) {

                    if (response.data[i].id == msgid) {
                        $scope.sendername = response.data[i].fromName;
                        $scope.senderemail = response.data[i].fromEmail;
                        $scope.messagedesc = response.data[i].message;
                    }
                }
                document.getElementById(msgid).style.display = "block";
                evt.currentTarget.className += " active";
            }
            
        }
        else {
            document.getElementById("allmsg").style.display = 'none';
            $scope.MsgMessage = "You have no messages in your inbox!"
        }
           

    });
});

app.controller("ReviewAdController", function ($scope, $http, $state) {
    var id = $state.params.id;

    $http.post("/ListAd/" + id).then(function (response) {
        $scope.images = []

        for (var i = 0; i < 4; i++) {
            if (response.data.image[i] != undefined) {
                var img = response.data.image[i];
                $scope.images.push(img);
            }
        }
        $scope.itemname = response.data.itemname;
        $scope.price = response.data.price;
        $scope.description = response.data.description;
        $scope.ownername = response.data.firstname;
        $scope.emailId = response.data.emailid;
    });
   
});

function on(id) {
    if (id == "loggedIn") {
        document.getElementById("text").innerHTML = "You need to logout first to login again!";
    }
    else
    {
        document.getElementById("text").innerHTML = "Please Login or Register First";
    }
    
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}




(function () {
    "use strict";

    var module = angular.module("adUser");

    module.component("userApp", {
        templateUrl: "/ad-user/user-app.component.html",
        $routeConfig: [
            { path: "/list", component: "userList", name: "List" },
            { path: "/add", component: "userAdd", name: "Add" },
            { path: "/listdaniel", component: "userListDaniel", name: "Listdaniel" },
            { path: "/**", redirectTo: ["Add"] }
        ]
    });

}());
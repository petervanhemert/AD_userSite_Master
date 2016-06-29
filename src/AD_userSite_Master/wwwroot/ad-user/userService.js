(function () {
    var userDataService = function ($http, $q) {

        var getUsers = function () {
            return $http.get('api/User')
                        .then(function (response) {
                            return response.data;
                        });
        };
        var getUserById = function (id) {
            return $http.get('api/User/' + id)
                        .then(function (response) {
                            return response.data;
                        });
        };

        var accountnameExist = function(accountname) {
            return $http.get('api/User/userAccountnameExist/' + accountname)
                        .then(function (response) {
                            return response.data;
                        });
        }

        var fullnameExist = function (user) {
            return $http.post(
            'api/User/fullnameExist', user)
            .then(function (response) {
                return response.data;
            });
        };
        var emailExist = function (user) {
            return $http.post(
            'api/User/eMailExist', user)
            .then(function (response) {
                return response.data;
            });
        };

        var createUser = function (user) {
            return $http.post(
                'api/User', user)
                        .then(function (response) {
                            return response.data;
                        });
        };
        var deleteUser = function (id) {
            return $http.delete('api/User/' + id)
                        .then(function (response) {
                            return response.data;
                        });
        };
        var updateUser = function (accountName, user) {

            //return $http.put(
            //    'api/User/id', user)
            //            .then(function (response) {
            //                return response.data;
            //            });


            var request = $http({
                method: "put",
                url: "/api/User/" + accountName,
                data: user
            });
            return request;
        };

        return {
            getUsers: getUsers,
            getUserById: getUserById,
            accountnameExist: accountnameExist,
            fullnameExist: fullnameExist,
            emailExist:emailExist,
            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
    };


    var module = angular.module("adUser");
    module.factory("userDataService", userDataService);

}());
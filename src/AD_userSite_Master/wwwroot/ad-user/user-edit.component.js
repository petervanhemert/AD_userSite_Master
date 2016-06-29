(function () {
    "use strict";

    var module = angular.module("adUser");

    function controller(userDataService, $scope) {

        var model = this;
        model.$onInit = function() {
            model.user = {};
        }
        model.$onChanges = function() {
            model.user = model.value;
        }

        model.clear = function () {
            var master = {
                accountName: '',
                firstName: '',
                lastName: '',
                email: '',
                externalUser: false
            };
            model.user = angular.copy(master);
            $scope.userform.$setPristine();
            $scope.userform.$setUntouched();
        };
        var onComplete = function () {
            model.close({ navID: 'editUser' });
        };
        var onError = function (reason) {
        };
        model.editUser = function () {
            userDataService.updateUser(model.user.accountName, model.user).then(onComplete, onError);
        }

        model.closeSidenav = function () {
            model.close({ navID: 'editUser' });
            model.clear();
        }
    }

    module.component("userEdit", {
        templateUrl: "/ad-user/user-edit.component.html",
        bindings: {
            value: "<",
            close: "&",
            toast: "&"
        },
        controllerAs: "model",
        controller: ["userDataService", "$scope", controller]
    });

}());
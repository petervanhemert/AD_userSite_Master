(function() {
    "use strict";

    var module = angular.module("adUser");

    function controller(userDataService, $scope, $mdDialog, $mdMedia, $mdToast) {
        var model = this;
        model.user = {
            accountName:"",
            email: "",
            firstname: "",
            lastname: ""

        }
        var init = function() {
            model.emailExist = true;
            model.accountnameIsUnique = true;
            model.accountnameIsUniqueChecked = false;
        }

        model.$onInit = function () {
            model.sideNavActive = false;
        }
        model.$onChanges = function () {
            model.sideNavActive = model.value;
            
        }

        model.clear = function () {            
            var master = {
                accountname: '',
                firstname: '',
                lastname: '',
                email: '',
                externalUser: false
            };           
            model.user = angular.copy(master);
            $scope.userform.$setPristine();            
            $scope.userform.$setUntouched();

            init();
        };

        var onComplete = function () {
            var successText = "User successful added.";
            model.clear();
            model.close({ navID: 'addUser' });
            //model.toast({ type: 'success', text: successText });
            model.showToast('success', successText);
        };
        var onError = function (reason) {          
        };
        model.addUser = function () {
            userDataService.createUser(model.user).then(onComplete, onError);
        }

        model.checkIfAccountnameIsUnique = function (accountname) {
            if (accountname) {
                userDataService.accountnameExist(accountname).then(function(data) {
                    if (data) {
                        model.accountnameIsUnique = false;
                        $scope.userform.accountName.$invalid = true;
                        $scope.userform.accountName.$valid = false;
                        $scope.userform.accountName.$setPristine();
                        model.accountnameIsUniqueChecked = true;
                    }
                    if (!data) {
                        model.accountnameIsUniqueChecked = true;
                        model.accountnameIsUnique = true;
                        $scope.userform.accountName.$invalid = false;
                        $scope.userform.accountName.$valid = true;
                        $scope.userform.accountName.$setPristine();
                    }
                });
            }
        }
        model.setAccountNameToUnique = function () {

            if (model.user.externalUser) {

                model.accountnameIsUnique = true;
                $scope.userform.accountName.$invalid = false;
                $scope.userform.accountName.$valid = true;


                var master = {
                    accountname: "",
                    firstName: model.user.firstName,
                    lastName: model.user.lastName,
                    email: model.user.email,
                    externalUser: true
                };
                model.user = angular.copy(master);
                $scope.userform.$setPristine();
                $scope.userform.$setUntouched();
                model.accountnameIsUniqueChecked = true;
            } else {
                var master = {
                    accountname: "",
                    firstName: model.user.firstName,
                    lastName: model.user.lastName,
                    email: model.user.email,
                    externalUser: false
                };
                model.user = angular.copy(master);
                $scope.userform.$setPristine();
                $scope.userform.$setUntouched();
                model.accountnameIsUniqueChecked = false;
            }




            //$scope.userform.accountName.$setPristine();
            //model.user.accountName = "";
        }

        model.checkIfFullnameExist = function () {
            if (model.user.firstName && model.user.lastName) {
                userDataService.fullnameExist(model.user)
                    .then
                    (function (data) {//data (fullname exist)
                        //model.doubleUserIsChecked = false;
                        if (data) {
                            doubleUserDialogOpen();
                        }
                        if (!data) {
                           // model.doubleUserIsChecked = true;
                            model.doubleUser = false;

                            $scope.userform.firstname.$setPristine();
                            $scope.userform.lastname.$setPristine();
                            $scope.userform.firstname.$valid = true;
                            $scope.userform.firstname.$invalid = false;
                            $scope.userform.lastname.$valid = true;
                            $scope.userform.lastname.$invalid = false;
                        }
                    });
            }
        };

        var doubleUserDialogOpen = function () {
            $mdDialog.show({
                contentElement: '#doubleUserDialog',
                clickOutsideToClose: false
            });
        };
        model.doubleUserDialogClose = function () {
            model.doubleUser = true;

            $scope.userform.firstname.$setPristine();
            $scope.userform.lastname.$setPristine();
            $scope.userform.firstname.$invalid = true;
            $scope.userform.lastname.$invalid = true;
            $mdDialog.cancel();
        };

        model.continueWithDoubleUser = function () {
            //model.doubleUserIsChecked = true;
            model.doubleUser = false;

            $scope.userform.firstname.$setPristine();
            $scope.userform.lastname.$setPristine();
            $scope.userform.firstname.$valid = true;
            $scope.userform.lastname.$valid = true;
            $scope.userform.firstname.$invalid = false;
            $scope.userform.lastname.$invalid = false;
            $mdDialog.cancel();
        }

        model.checkIfEmailExist = function () {
            if (model.user.email && $scope.userform.email.$valid) {
                userDataService.emailExist(model.user)
                    .then
                    (function (data) {//data (email exist)
                        if (data) {// email exist
                            model.emailExist = true;
                            $scope.userform.email.$setPristine();
                        }
                        if (!data) {// email NOT exist
                            model.emailExist = false;
                            $scope.userform.email.$setPristine();
                        }
                    });
            }




        }

        model.closeSidenav = function () {
            model.close({ navID: 'addUser' });
            model.clear();
        }

        //TOAST
        model.showToast = function (type, text) {
            $mdToast.show(
              $mdToast.simple()
                .textContent(text)
                .highlightAction(true)
                .position('left bottom right')
              .theme(type + '-toast')
                .hideDelay(3000));
        };

        init();
    }

    module.component("userAdd", {
        templateUrl: "/ad-user/user-add.component.html",
        bindings: {
            value: "<",
            close: "&",
            toast: "&"
            
        },
        controllerAs: "model",
        controller: ["userDataService", "$scope", '$mdDialog', '$mdMedia', '$mdToast', controller]
    });

}());
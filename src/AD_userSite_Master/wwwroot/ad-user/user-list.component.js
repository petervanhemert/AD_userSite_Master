(function () {
    "use strict";

    var module = angular.module("adUser");

    function controller(userDataService, $mdDialog, $mdSidenav, $mdEditDialog, $q, $scope, $timeout, $mdMedia, $mdToast) {
        var model = this;
        model.message = "this is a message";
        model.users = [];

        model.promise = false;
        model.mode = 'query';
        model.activated = true;
        model.selected = [];
        model.query = {
            order: 'name',
            limit: 10,
            page: 1
        };
        model.limitOptions = [5, 10, 15];
        model.options = {
            rowSelection: true,
            multiSelect: false,
            autoSelect: false,
            decapitate: false,
            largeEditDialog: false,
            boundaryLinks: false,
            limitSelect: true,
            pageSelect: true
        };
        model.toggleLimitOptions = function () {
            model.limitOptions = model.limitOptions ? undefined : [5, 10, 15];
        };
        model.loadStuff = function () {
            model.getUsers();
        }
        model.logItem = function (item) {
            console.log(item.name, 'was selected');
        };
        model.logOrder = function (order) {
            console.log('order: ', order);
        };
        model.logPagination = function (page, limit) {
            console.log('page: ', page);
            console.log('limit: ', limit);
        }

        //Get Data
        var onComplete = function (data) {
            model.promise = false;
            model.users = data;
            model.users.count = data.length;
        };
        var onError = function (reason) {

        };
        model.getUsers = function () {
            //var deferred = $q.defer();
            //promise = deferred.promise;
            model.promise = true;
            userDataService.getUsers().then(onComplete, onError);
        }
        //model.$onInit = function () {
        //    userDataService.getUsers().then(onComplete, onError);
        //}

        model.getUsers();
        //model.sideNav = false;
        //SIDENAV gen
        model.closeSidenav = function (navID) {
            $mdSidenav(navID).close()
              .then(function () { 
                    model.loadStuff();
                });
        };
        model.openSideNav = function (navID, event) {
            model.sideNav = true;
            $mdSidenav(navID).open()
            .then(function () {
                if (navID == 'addUser') {
                    model.sideNav = true;
                }
                if (navID == 'editUser') {
                    model.selectedUser = event;
                }
            });
        }

        //SIDENAV add

        //model.closeAddSidenav = function () {
        //    $mdSidenav('addUser').close()
        //      .then(function () {
        //          model.loadStuff();
        //          //$log.debug("close RIGHT is done");
        //      });
        //};
        //model.addUser = function() {
        //    return $mdSidenav('addUser')
        //          .toggle();
        //}
        //model.isOpenaddUser = function () {
        //    return $mdSidenav('addUser').isOpen();
        //};

        //SIDENAV edit

        //model.closeEditSidenav = function () {
        //    $mdSidenav('editUser').close()
        //      .then(function () {
        //          model.loadStuff();
        //          //$log.debug("close RIGHT is done");
        //      });
        //};
        model.isOpenEditUser = function () {
            return $mdSidenav('editUser').isOpen();
        };
        model.buildTogglerEditUser = function (navID, event) {
            
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                  model.selectedUser = event; //$log.debug("toggle " + navID + " is done");
              });
        }

        //DIALOG Delete user
        model.deleteUser = function (selectedUser) {
            //model.selectedUser = selectedUser;
            //model.selectedUser = {};
            $mdDialog.show({
                contentElement: '#myDialog',
                clickOutsideToClose: false
            }).then(model.selectedUser = selectedUser);
        };
        var onDeleteComplete = function (data) {
            model.loadStuff();
            $mdDialog.hide();
            var text = "User successful deleted!";
            model.showToast("success", text);
        };
        var onDeleteError = function (reason) {
            model.loadStuff();
            $mdDialog.hide();
            model.toastText = "Something went wrong, user NOT deleted!";
            model.showToast("error");
        };
        model.delete = function () {
            userDataService.deleteUser(model.selectedUser.accountName).then(onDeleteComplete, onDeleteError);
        }
        model.cancelDelete = function () {
            $mdDialog.cancel();
        };

        //TOAST
        model.showToast = function (type, text) {
            $mdToast.show(
              $mdToast.simple()
                .textContent(text)
                .position('top right')
              .theme(type +'-toast')
                .hideDelay(3000));
        };



    }

    module.component("userList", {
        templateUrl: "/ad-user/user-list.component.html",
        controllerAs: "model",
        controller: ["userDataService", '$mdDialog', '$mdSidenav', '$mdEditDialog', '$q', '$scope', '$timeout', '$mdMedia', '$mdToast', controller]
    });
}());
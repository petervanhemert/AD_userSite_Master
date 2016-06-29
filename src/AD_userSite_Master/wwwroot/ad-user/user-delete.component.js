(function () {
    "use strict";

    var module = angular.module("adUser");

    function controller(userDataService, $mdDialog) {
        var model = this;

        //model.clear = function () {
        //    model.user = {
        //        accountname: "",
        //        firstname: "",
        //        lastname: "",
        //        email: ""
        //    };
        //};


        //model.$onInit = function () {
        //    model.user = {};
        //}
        //model.$onChanges = function () {
        //    model.user = model.value;
        //}

  
        //var onComplete = function () {
        //    model.clear();
        //};
        //var onError = function (reason) {
        //};
       


        //model.cancel = function () {
        //    $mdDialog.cancel();
        //};
        //model.delete = function () {
        //    userDataService.deleteUser(model.user.accountName).then(onComplete, onError);
        //    model.clear();
        //    $mdDialog.hide();
        //};


        //model.$onInit = function () {
        //    model.user = {};
        //}
        //model.$onChanges = function () {
        //    model.user = model.value;
        //    if (model.value) {
        //        $mdDialog.show({
        //            contentElement: '#myDialog',
        //            clickOutsideToClose: false
        //        });
        //    }

        //}

                //DIALOG Delete user
        //model.deleteUser = function (selectedUser) {
        //    $mdDialog.show({
        //        contentElement: '#myDialog',
        //        clickOutsideToClose: false
        //    }).then(model.selectedUser = selectedUser);
        //};


        //var onDeleteComplete = function (data) {
        //   // model.loadStuff();
        //    $mdDialog.hide();
        //    var text = "User successful deleted!";
        //    model.showToast("success", text);
        //};
        //var onDeleteError = function (reason) {
        //    //model.loadStuff();
        //    $mdDialog.hide();
        //    model.toastText = "Something went wrong, user NOT deleted!";
        //    model.showToast("error");
        //};
        //model.delete = function () {
        //    userDataService.deleteUser(model.user.accountName).then(onDeleteComplete, onDeleteError);
        //}
        //model.cancelDelete = function () {
        //    $mdDialog.cancel();
        //    model.value = "";
        //};

                //TOAST
        //model.showToast = function (type, text) {
        //    $mdToast.show(
        //      $mdToast.simple()
        //        .textContent(text)
        //        .highlightAction(true)
        //        .position('left bottom right')
        //      .theme(type + '-toast')
        //        .hideDelay(3000));
        //};



    }

    module.component("userDelete", {
        templateUrl: "/ad-user/user-delete.component.html",
        bindings: {
            value: "<"
        },
        controllerAs: "model",
        controller: ["userDataService", "$mdDialog", controller]
    });

}());
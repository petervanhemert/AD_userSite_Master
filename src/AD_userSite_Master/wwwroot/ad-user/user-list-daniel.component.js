(function () {
    "use strict";

    var module = angular.module("adUser");

    function controller($mdDialog, $mdSidenav, $mdEditDialog, $q, $scope, $timeout) {
        //var model = this;  
        var bookmark;
        
        $scope.close = function (navID) {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID).close()
              .then(function () {
                  //$log.debug("close RIGHT is done");
              });
        };

        $scope.addUser = buildToggler('addUser');
        $scope.isOpenaddUser = function () {
            return $mdSidenav('addUser').isOpen();
        };

        //$scope.editUser = function(event) {
        //    buildToggler('editUser', event);
        //}
        $scope.editUser = buildToggler('editUser', event);
      
        
        $scope.isOpenEditUser = function () {
            return $mdSidenav('editUser').isOpen();
        };


        $scope.buildToggler2 = function(navID, event) {
            //return function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                  .toggle()
                  .then(function () {
                      $scope.ik = event; //$log.debug("toggle " + navID + " is done");
                  });
            //}
        }
        function buildToggler(navID, event) {
            return function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                  .toggle()
                  .then(function () {
                        $scope.ik =  event; //$log.debug("toggle " + navID + " is done");
                    });
            }
        }




        $scope.editItem = function (event) {


            $mdDialog.show({
                clickOutsideToClose: true,
                //controller: 'addItemController',
                //controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                template:"hoi"
                //templateUrl: 'templates/add-item-dialog.html',
            }).then($scope.getDesserts);
        };






        $scope.selected = [];
        $scope.limitOptions = [5, 10, 15];

        $scope.options = {
            rowSelection: false,
            multiSelect: false,
            autoSelect: false,
            decapitate: false,
            largeEditDialog: false,
            boundaryLinks: false,
            limitSelect: true,
            pageSelect: true
        };

        //$scope.filter = {
        //    options: {
        //        debounce: 500
        //    }
        //};

        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1
        };

        $scope.desserts = {
            "count": 9,
            "data": [
              {
                  "name": "Frozen yogurt",
                  "type": "Ice cream",
                  "calories": { "value": 159.0 },
                  "fat": { "value": 6.0 },
                  "carbs": { "value": 24.0 },
                  "protein": { "value": 4.0 },
                  "sodium": { "value": 87.0 },
                  "calcium": { "value": 14.0 },
                  "iron": { "value": 1.0 }
              }, {
                  "name": "Ice cream sandwich",
                  "type": "Ice cream",
                  "calories": { "value": 237.0 },
                  "fat": { "value": 9.0 },
                  "carbs": { "value": 37.0 },
                  "protein": { "value": 4.3 },
                  "sodium": { "value": 129.0 },
                  "calcium": { "value": 8.0 },
                  "iron": { "value": 1.0 }
              }, {
                  "name": "Eclair",
                  "type": "Pastry",
                  "calories": { "value": 262.0 },
                  "fat": { "value": 16.0 },
                  "carbs": { "value": 24.0 },
                  "protein": { "value": 6.0 },
                  "sodium": { "value": 337.0 },
                  "calcium": { "value": 6.0 },
                  "iron": { "value": 7.0 }
              }, {
                  "name": "Cupcake",
                  "type": "Pastry",
                  "calories": { "value": 305.0 },
                  "fat": { "value": 3.7 },
                  "carbs": { "value": 67.0 },
                  "protein": { "value": 4.3 },
                  "sodium": { "value": 413.0 },
                  "calcium": { "value": 3.0 },
                  "iron": { "value": 8.0 }
              }, {
                  "name": "Jelly bean",
                  "type": "Candy",
                  "calories": { "value": 375.0 },
                  "fat": { "value": 0.0 },
                  "carbs": { "value": 94.0 },
                  "protein": { "value": 0.0 },
                  "sodium": { "value": 50.0 },
                  "calcium": { "value": 0.0 },
                  "iron": { "value": 0.0 }
              }, {
                  "name": "Lollipop",
                  "type": "Candy",
                  "calories": { "value": 392.0 },
                  "fat": { "value": 0.2 },
                  "carbs": { "value": 98.0 },
                  "protein": { "value": 0.0 },
                  "sodium": { "value": 38.0 },
                  "calcium": { "value": 0.0 },
                  "iron": { "value": 2.0 }
              }, {
                  "name": "Honeycomb",
                  "type": "Other",
                  "calories": { "value": 408.0 },
                  "fat": { "value": 3.2 },
                  "carbs": { "value": 87.0 },
                  "protein": { "value": 6.5 },
                  "sodium": { "value": 562.0 },
                  "calcium": { "value": 0.0 },
                  "iron": { "value": 45.0 }
              }, {
                  "name": "Donut",
                  "type": "Pastry",
                  "calories": { "value": 452.0 },
                  "fat": { "value": 25.0 },
                  "carbs": { "value": 51.0 },
                  "protein": { "value": 4.9 },
                  "sodium": { "value": 326.0 },
                  "calcium": { "value": 2.0 },
                  "iron": { "value": 22.0 }
              }, {
                  "name": "KitKat",
                  "type": "Candy",
                  "calories": { "value": 518.0 },
                  "fat": { "value": 26.0 },
                  "carbs": { "value": 65.0 },
                  "protein": { "value": 7.0 },
                  "sodium": { "value": 54.0 },
                  "calcium": { "value": 12.0 },
                  "iron": { "value": 6.0 }
              }
            ]
        };

        $scope.editComment = function (event, dessert) {
            event.stopPropagation(); // in case autoselect is enabled

            var editDialog = {
                modelValue: dessert.comment,
                placeholder: 'Add a comment',
                save: function (input) {
                    if (input.$modelValue === 'Donald Trump') {
                        input.$invalid = true;
                        return $q.reject();
                    }
                    if (input.$modelValue === 'Bernie Sanders') {
                        return dessert.comment = 'FEEL THE BERN!'
                    }
                    dessert.comment = input.$modelValue;
                },
                targetEvent: event,
                title: 'Add a comment',
                validators: {
                    'md-maxlength': 30
                }
            };

            var promise;

            if ($scope.options.largeEditDialog) {
                promise = $mdEditDialog.large(editDialog);
            } else {
                promise = $mdEditDialog.small(editDialog);
            }

            promise.then(function (ctrl) {
                var input = ctrl.getInput();

                input.$viewChangeListeners.push(function () {
                    input.$setValidity('test', input.$modelValue !== 'test');
                });
            });
        };

        $scope.toggleLimitOptions = function () {
            $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
        };

        $scope.getTypes = function () {
            return ['Candy', 'Ice cream', 'Other', 'Pastry'];
        };

        $scope.loadStuff = function () {
            $scope.promise = $timeout(function () {
                // loading
            }, 2000);
        }

        $scope.logItem = function (item) {
            console.log(item.name, 'was selected');
        };

        $scope.logOrder = function (order) {
            console.log('order: ', order);
        };

        $scope.logPagination = function (page, limit) {
            console.log('page: ', page);
            console.log('limit: ', limit);
        }




        //$scope.addItem = function (event) {
        //    $mdDialog.show({
        //        clickOutsideToClose: true,
        //        controller: 'addItemController',
        //        controllerAs: 'ctrl',
        //        focusOnOpen: false,
        //        targetEvent: event,
        //        template:"<h1>Template add</h1>"
        //        //templateUrl: 'templates/add-item-dialog.html',
        //    }).then($scope.getDesserts);
        //};

        //$scope.delete = function (event) {
        //    $mdDialog.show({
        //        clickOutsideToClose: true,
        //        controller: 'deleteController',
        //        controllerAs: 'ctrl',
        //        focusOnOpen: false,
        //        targetEvent: event,
        //        locals: { desserts: $scope.selected },
        //        template:"<h1>Template delete</h1>"
        //        //templateUrl: 'templates/delete-dialog.html',
        //    }).then($scope.getDesserts);
        //};


        //$scope.removeFilter = function () {
        //    $scope.filter.show = false;
        //    $scope.query.filter = '';

        //    if ($scope.filter.form.$dirty) {
        //        $scope.filter.form.$setPristine();
        //    }
        //};

        //$scope.$watch('query.filter', function (newValue, oldValue) {
        //    if (!oldValue) {
        //        bookmark = $scope.query.page;
        //    }
        //    if (newValue !== oldValue) {
        //        $scope.query.page = 1;
        //    }
        //    if (!newValue) {
        //        $scope.query.page = bookmark;
        //    }
        //    $scope.getDesserts();
        //});
    }



    module.component("userListDaniel", {
        templateUrl: "/ad-user/user-list-daniel.component.html",
        controllerAs: "model",
        controller: ['$mdDialog', '$mdSidenav', '$mdEditDialog', '$q', '$scope', '$timeout', controller]
    });





















    //angular.module('nutritionApp').controller('nutritionController', ['$mdDialog', '$nutrition', '$scope', function ($mdDialog, $nutrition, $scope) {
    //    'use strict';

    //    var bookmark;

    //    $scope.selected = [];

    //    $scope.filter = {
    //        options: {
    //            debounce: 500
    //        }
    //    };

    //    $scope.query = {
    //        filter: '',
    //        limit: '5',
    //        order: 'nameToLower',
    //        page: 1
    //    };


    //        $scope.desserts = {
    //            "count": 9,
    //            "data": [
    //              {
    //                  "name": "Frozen yogurt",
    //                  "type": "Ice cream",
    //                  "calories": { "value": 159.0 },
    //                  "fat": { "value": 6.0 },
    //                  "carbs": { "value": 24.0 },
    //                  "protein": { "value": 4.0 },
    //                  "sodium": { "value": 87.0 },
    //                  "calcium": { "value": 14.0 },
    //                  "iron": { "value": 1.0 }
    //              }, {
    //                  "name": "Ice cream sandwich",
    //                  "type": "Ice cream",
    //                  "calories": { "value": 237.0 },
    //                  "fat": { "value": 9.0 },
    //                  "carbs": { "value": 37.0 },
    //                  "protein": { "value": 4.3 },
    //                  "sodium": { "value": 129.0 },
    //                  "calcium": { "value": 8.0 },
    //                  "iron": { "value": 1.0 }
    //              }, {
    //                  "name": "Eclair",
    //                  "type": "Pastry",
    //                  "calories": { "value": 262.0 },
    //                  "fat": { "value": 16.0 },
    //                  "carbs": { "value": 24.0 },
    //                  "protein": { "value": 6.0 },
    //                  "sodium": { "value": 337.0 },
    //                  "calcium": { "value": 6.0 },
    //                  "iron": { "value": 7.0 }
    //              }, {
    //                  "name": "Cupcake",
    //                  "type": "Pastry",
    //                  "calories": { "value": 305.0 },
    //                  "fat": { "value": 3.7 },
    //                  "carbs": { "value": 67.0 },
    //                  "protein": { "value": 4.3 },
    //                  "sodium": { "value": 413.0 },
    //                  "calcium": { "value": 3.0 },
    //                  "iron": { "value": 8.0 }
    //              }, {
    //                  "name": "Jelly bean",
    //                  "type": "Candy",
    //                  "calories": { "value": 375.0 },
    //                  "fat": { "value": 0.0 },
    //                  "carbs": { "value": 94.0 },
    //                  "protein": { "value": 0.0 },
    //                  "sodium": { "value": 50.0 },
    //                  "calcium": { "value": 0.0 },
    //                  "iron": { "value": 0.0 }
    //              }, {
    //                  "name": "Lollipop",
    //                  "type": "Candy",
    //                  "calories": { "value": 392.0 },
    //                  "fat": { "value": 0.2 },
    //                  "carbs": { "value": 98.0 },
    //                  "protein": { "value": 0.0 },
    //                  "sodium": { "value": 38.0 },
    //                  "calcium": { "value": 0.0 },
    //                  "iron": { "value": 2.0 }
    //              }, {
    //                  "name": "Honeycomb",
    //                  "type": "Other",
    //                  "calories": { "value": 408.0 },
    //                  "fat": { "value": 3.2 },
    //                  "carbs": { "value": 87.0 },
    //                  "protein": { "value": 6.5 },
    //                  "sodium": { "value": 562.0 },
    //                  "calcium": { "value": 0.0 },
    //                  "iron": { "value": 45.0 }
    //              }, {
    //                  "name": "Donut",
    //                  "type": "Pastry",
    //                  "calories": { "value": 452.0 },
    //                  "fat": { "value": 25.0 },
    //                  "carbs": { "value": 51.0 },
    //                  "protein": { "value": 4.9 },
    //                  "sodium": { "value": 326.0 },
    //                  "calcium": { "value": 2.0 },
    //                  "iron": { "value": 22.0 }
    //              }, {
    //                  "name": "KitKat",
    //                  "type": "Candy",
    //                  "calories": { "value": 518.0 },
    //                  "fat": { "value": 26.0 },
    //                  "carbs": { "value": 65.0 },
    //                  "protein": { "value": 7.0 },
    //                  "sodium": { "value": 54.0 },
    //                  "calcium": { "value": 12.0 },
    //                  "iron": { "value": 6.0 }
    //              }
    //            ]
    //        };


    //    //$scope.addItem = function (event) {
    //    //    $mdDialog.show({
    //    //        clickOutsideToClose: true,
    //    //        controller: 'addItemController',
    //    //        controllerAs: 'ctrl',
    //    //        focusOnOpen: false,
    //    //        targetEvent: event,
    //    //        templateUrl: 'templates/add-item-dialog.html',
    //    //    }).then($scope.getDesserts);
    //    //};

    //    //$scope.delete = function (event) {
    //    //    $mdDialog.show({
    //    //        clickOutsideToClose: true,
    //    //        controller: 'deleteController',
    //    //        controllerAs: 'ctrl',
    //    //        focusOnOpen: false,
    //    //        targetEvent: event,
    //    //        locals: { desserts: $scope.selected },
    //    //        templateUrl: 'templates/delete-dialog.html',
    //    //    }).then($scope.getDesserts);
    //    //};


    //    $scope.removeFilter = function () {
    //        $scope.filter.show = false;
    //        $scope.query.filter = '';

    //        if ($scope.filter.form.$dirty) {
    //            $scope.filter.form.$setPristine();
    //        }
    //    };

    //    $scope.$watch('query.filter', function (newValue, oldValue) {
    //        if (!oldValue) {
    //            bookmark = $scope.query.page;
    //        }

    //        if (newValue !== oldValue) {
    //            $scope.query.page = 1;
    //        }

    //        if (!newValue) {
    //            $scope.query.page = bookmark;
    //        }

    //        //$scope.getDesserts();
    //    });
    //}]);








































}());
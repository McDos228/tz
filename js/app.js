var app = angular.module("todoApp", ['ui.bootstrap']);

// app.service('httpServ', function($http, $rootScope){
//   var root = "http://127.0.0.1:3000";
//   return{
//     list: function(callback){
//        $http.get(root+'/users').then(callback);
//
//     },
//
//     getOneUser: function(id){
//       var request = $http.get(root+'/users/'+ id).then(function(res){
//         var data = res.data;
//         return data;
//       })
//
//
//     }
//   }
//
// });


app.controller('pageCtrl', function($scope, $http){

  $scope.usersList = [];



   $http.get('/users').then(function(data){

    $scope.usersList = data.data;
    console.log('data', $scope.usersList);
  });



  $scope.editUser = function(id){
    console.log('id if function', id);
    $http.get(root+'/users/'+ id).then(function(data){
      console.log('22', data.data);
      $scope.editUser= data.data;
    });
  };

  $scope.updateUser = function(){
    $http.post(root + '/users', $scope.editUser);
  }



});

app.controller('addUserCtrl', function($scope, $http){});
app.controller('editUserCtrl', function($scope, $http){});
app.controller('deleteUserCtrl', function($scope, $http){});

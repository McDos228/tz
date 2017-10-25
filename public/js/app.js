var app = angular.module("todoApp", ['ui.bootstrap']);

app.controller('pageCtrl', function($scope, $http, $uibModal){

  $scope.usersList = [];
  $scope.propertyName = 'age';
  $scope.reverse = true;
  $scope.sortBy = function(propertyName){
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };

  $http.get('/users').then(function(data){
    $scope.usersList = data.data.data.users;
  });

  $scope.showAddUserModal = function(){
    $uibModal.open({
       templateUrl: 'pages/addModal.html',
         controller: 'addUserCtrl',
         scope: $scope,
         resolve: {
           addUserForm: function(){
               return $scope.addUserForm;
             }
         }
     });
  }

  $scope.showEditModal = function(user){
    $uibModal.open({
    		templateUrl: 'pages/editModal.html',
        	controller: 'editUserCtrl',
        	scope: $scope,
        	resolve: {
        		editUserForm: function(){
            		return $scope.editUserForm;
            	},
            user: function(){
      					return user.id;
      			}
        	}
     	});
	}

  $scope.showDeleteModal = function(id){
    $uibModal.open({
       templateUrl: 'pages/deleteModal.html',
         controller: 'deleteUserCtrl',
         scope: $scope,
         resolve: {
           editUserForm: function(){
               return $scope.editUserForm;
           },
           delId: function(){
               return id;
           }
         }
     });
  }


});

app.controller('addUserCtrl', function($scope, $http, $uibModalInstance){

  $scope.addUser = function(){
    $http.post('/users/add', $scope.newUser).then(function(res){
      $scope.usersList.push(res.data.data);
    });
    $uibModalInstance.close('closed');
  }

  $scope.cancel = function(){
    $uibModalInstance.dismiss('cancel');
  };
});
app.controller('editUserCtrl', function($scope, $http, $uibModalInstance, user){
  $http.get('/users/'+ user).then(function(data){
    $scope.editUser = data.data.data;
  });

  $scope.updateUser = function(){
    $http.post('/users/update', $scope.editUser).then(function(res){
      angular.forEach($scope.usersList, function(user){
        if(user.id==res.data.data.id){
          user.username = res.data.data.username;
          user.age = res.data.data.age;
          user.number = res.data.data.number;
        }
      })
    });
    $uibModalInstance.close('closed');
  }

  $scope.cancel = function(){
    $uibModalInstance.dismiss('cancel');
  };
});
app.controller('deleteUserCtrl', function($scope, $http, $uibModalInstance, delId){
  $scope.deleteUser = function(){
    $http.get('/users/dalete/' + delId).then(function(res){
      angular.forEach($scope.usersList, function(user){
        if(user.id==delId){
          $scope.usersList.splice($scope.usersList.indexOf(user), 1);
        }
      })
    });
    $uibModalInstance.close('closed');
  }
  $scope.cancel = function(){
    $uibModalInstance.dismiss('cancel');
  };
});

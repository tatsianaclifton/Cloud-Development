var app = angular.module('app',['ngResource', 'ngRoute']);


app.config(function ($routeProvider, $locationProvider) {
	  
	  $routeProvider
	  .when('/', {controller: 'EventsCtrl', templateUrl: '/events.html' })
	  .when('/see', {controller: 'SeeCtrl', templateUrl: '/see.html' })
	  .when('/edit', {controller: 'EditCtrl', templateUrl: '/edit.html' })
      .otherwise({redirectTo: '/'});
});


app.controller('ApplicationCtrl', function ($scope, EventsSvc){
	console.log("Hello world from controller");
});


app.controller('EventsCtrl', function($scope, EventsSvc){
		console.log("Hello world from controller");

		EventsSvc.fetch()
        .then(function(events){
            $scope.events = events;
            console.log(events);
        });

		$scope.saveEvent = function(){
			EventsSvc.create({
				name: $scope.event.name,
				zip: $scope.event.zip,
	            email: $scope.event.email,
	            kind: $scope.event.kind,
	            free: $scope.event.free,
	            url: $scope.event.url 
			}).then(function(event){
				//$scope.event.unshift(event);
				$scope.event.name = null;
				$scope.event.zip = null;
	            $scope.event.email = null;
	            $scope.event.kind = null;
	            $scope.event.free = null;
	            $scope.event.url = null;
			});
		};

});

app.controller('SeeCtrl', function($scope, $http, $location, dataShare){

	    $http.get('http://52.38.126.224:9090/api/events')
	    .success(function(events){
            $scope.events = events;
            console.log(events);
        });
		
		$scope.remove = function(id){
        	console.log(id);
		    $http.delete('api/events/' + id).success(function(event) {
			    $http.get('http://52.38.126.224:9090/api/events')
        			.success(function(events){
            		$scope.events = events;
		        });
        	});
	    }

	    $scope.edit = function(id){
			console.log(id);

			//on edit get an event by id and send it to 'Edit Controller'
			$http.get('http://52.38.126.224:9090/api/events/' + id).success(function(events){
				dataShare.sendData(events);
				console.log(events);
				$location.path('/edit')
			});
	    }
});

app.controller('EditCtrl', function($scope, $http, dataShare){

        console.log("Hi");
	    $scope.$on('data_shared', function(){
	    	$scope.events = dataShare.getData();
	    });
	    //console.log(events);

		$scope.update = function(){
        	$http.put('http://52.38.126.224:9090/api/events/' + $scope.events._id, $scope.events)
	            .success(function(response) {
	            	//var name = $scope.events.name;
					//var zip = $scope.events.zip;
		            //var email =$scope.events.email;
		            //if( name != null && zip != null && email != null){
		            $scope.updated = "The event was updated";
		            //}
		            //else{
		            	//$scope.updated = "The event was not updated";
		            //}
	            })
        };
});


app.$inject = ['$scope', '$http'];

app.service('EventsSvc', function($http){
	this.fetch = function(){
		return $http.get('http://52.38.126.224:9090/api/events')
	};
	this.create = function(event){
		return $http.post('http://52.38.126.224:9090/api/events', event)
	};
	this.delete = function(event){
		return $http.delete('http://52.38.126.224:9090/api/events/:id', event)
	};
})

app.factory('dataShare', function($rootScope,$timeout){
  var service = {};
  service.data = false;
  service.sendData = function(data){
      this.data = data;
      $timeout(function(){
         $rootScope.$broadcast('data_shared');
      },500);
  };
  service.getData = function(){
    return this.data;
  };
  return service;
});

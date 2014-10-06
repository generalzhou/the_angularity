var app = angular.module('myApp', []);

var apiKey = ''
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote&output=JSON';

app.controller('PlayerController', ['$scope', '$http', function($scope, $http) {
  var url = nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
  $scope.apiUrl = url
  $http({
    method: 'JSONP',
    url: url
  }).success(function(data, status) {
    $scope.data = data;
    $scope.programs = data.list.story;
  }).error(function(data, status) {
    alert('error');
  });


  $scope.playing = false;
  $scope.audio = document.createElement('audio');
  $scope.play = function(program) {
    if ($scope.playing) $scope.audio.pause();
    console.log(program)
    var url = program.audio[0].format.mp4.$text;
    $scope.audio.src = url;
    $scope.audio.play();
    $scope.playing = true ;
  };
  $scope.stop = function() {
    $scope.playing = false;
    $scope.audio.pause();
  };
  $scope.audio.addEventListener('ended', function() {
    $scope.$apply(function() {
      $scope.stop()
    });
  })
}]);


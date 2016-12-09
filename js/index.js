var app = angular.module('myApp', []);
app.controller('paginationController', function($scope,$timeout) {

    // 页数
    $scope.pagesCount = 20;
    $scope.flag = true;

    // $timeout 模拟http访问延迟
    $timeout(function(){

        // $scope.whenYouGetPageCount($scope.pagesCount);
        // 在获得页数后调用
        // 此方法只调用一次,除非更换table
        if($scope.flag){
            $scope.whenYouGetPageCount($scope.pagesCount);
            $scope.flag = false;
        }
    },1000);

    // 回调函数,获得用户所选页
    $scope.whichPageUChoose = function (index) {
        console.log(index);
    };

});
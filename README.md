## Before Get Started

make sure your website run with http server like apache,nginx...

otherwise the `pagination` director will not work.

## How To Get Started

```objective-c
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
```

make sure `$scope.whenYouGetPageCount($scope.pagesCount);`  perform once only for one table.

## Call-back Funciton

```objective-c
// 回调函数,获得用户所选页
$scope.whichPageUChoose = function (currentPage) {
    console.log(currentPage);
};
```

retrun `currentPage` 

you can do anything.

## Installation
import `ui-pagination.js` to your html like `index.html`

that's all.



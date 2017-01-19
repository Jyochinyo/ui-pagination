app.directive('pageControl', function () {
  return {  
        restrict: "EA",
        templateUrl: 'dist/ui-pagination.html',
        replace: true,
        controller: function($scope,$element){

            /* 
            分页器说明:
            pagesCount              是在请求数据中返回的页面总数量
            $scope.omitPages        修改这个数值可以控制页面数量达到多少之后会出现省略号,在这之前会全部显示,建议单数
            $scope.tagsInPagination 修改这个数值可以控制省略一些页面后剩余的显示标签数量,建议单数

            *** JS里获取到页面数量之后通过这个方法将pagesCount传来
                $scope.whenYouGetPageCount(pagesCount);

            *** 在JS里要写如下方法,将用户选择的那一页传回去,然后进行下一部请求操作
                $scope.whichPageUChoose($scope.currentPage);

            *** HTML里 table下面写如下代码
                <page-control></page-control>
            */

            // 指定页数达到多少之后开始用省略号
            $scope.omitPages = 9;

            // 在有省略号的时候显示几个
            $scope.tagsInPagination = 5;
            $scope.tagsMid = Math.floor($scope.tagsInPagination/2);

            // 默认选中第一页
            $scope.currentPage = 1;

            // 默认不显示省略符号
            $scope.showOmitFront = false;
            $scope.showOmitAfter = false;
            // 默认显示下一页按钮
            // $scope.showNextPageBtn = true;

            $scope.whenYouGetPageCount = function (pagesCount) {
                // 最后一页的数值
                $scope.lastPage = pagesCount;
                $scope.setPagination();
            };

            $scope.setPagination = function () {
                // 根据页面数量进行分页的处理
                $scope.pagesList = [];
                if ($scope.lastPage < $scope.omitPages) {
                    for (var i = 0; i < $scope.lastPage; i++) {
                        $scope.pagesList.push({pagesNo:i+1});
                    }
                } else {
                    for (var i = 0; i < $scope.tagsInPagination; i++) {
                        $scope.pagesList.push({pagesNo:i+1});
                    } 
                    $scope.showOmitAfter = true;
                }

                if ($scope.lastPage <= $scope.omitPages) {
                    $scope.showNextPageBtn = false;
                } else {
                    $scope.showNextPageBtn = true;
                }
                $scope.checkShouldShowOmit();
                $scope.checkShouldShowBtn();
            };

            // 点击上一页
            $scope.prePageClick = function () {
                if ($scope.lastPage >= $scope.omitPages) {
                    if ($scope.pagesList[0].pagesNo > 1 && $scope.currentPage==$scope.pagesList[0].pagesNo) {
                        $scope.pagesList.splice($scope.tagsInPagination-1,1);
                        $scope.pagesList.splice(0,0,{pagesNo:$scope.currentPage-1})
                    }
                }

                if ($scope.pagesList[0].pagesNo == 1) {
                    $scope.showOmitFront = false;
                }
                
                $scope.currentPage -= 1;
                $scope.checkShouldShowBtn();
                $scope.checkShouldShowOmit();
                $scope.whichPageUChoose($scope.currentPage);
            };

            // 点击下一页
            $scope.nextPageClick = function () {

                // 判断 如果页数超过了完全显示的页数
                if ($scope.lastPage >= $scope.omitPages) {
                    // 判断 显示数组的最后一个 是否小于页数
                    if ($scope.pagesList[$scope.tagsInPagination-1].pagesNo < $scope.lastPage) {
                        // 对repeat数组进行处理
                        $scope.pagesList.push({pagesNo:$scope.pagesList[$scope.tagsInPagination-1].pagesNo+1});
                        $scope.pagesList.splice(0,1);
                    }
                }

                $scope.currentPage += 1;
                //数据处理完成后进行显示处理
                $scope.checkShouldShowOmit();
                $scope.checkShouldShowBtn();
                $scope.whichPageUChoose($scope.currentPage);
            };

            // 点击某一页
            $scope.paginationClick = function (index) {

                // $scope.tagsMid == 2
                if ($scope.lastPage < $scope.omitPages) {
                    $scope.setPagination();
                } else {
                    if (index <= $scope.tagsMid+1) {
                        $scope.setPagination();
                    } else if (index > $scope.tagsMid+1 && index < $scope.lastPage-$scope.tagsMid) {
                        $scope.pagesList = [];
                        for (var i = 0; i < $scope.tagsInPagination; i++) {
                            $scope.pagesList.push({pagesNo:index+i-$scope.tagsMid});
                        }
                    } else {
                        $scope.pagesList = [];
                        if ($scope.tagsInPagination > $scope.lastPage) {
                            var count = $scope.lastPage;
                        } else {
                            var count = $scope.tagsInPagination;
                        }
                        for (var i = count; i > 0 ; i--) {
                            $scope.pagesList.push({pagesNo:$scope.lastPage-i+1});
                        }
                    }
                }
                

                $scope.currentPage = index;
                $scope.checkShouldShowBtn();
                $scope.checkShouldShowOmit();
                $scope.whichPageUChoose($scope.currentPage);
                
            };

            // 点击第一页
            $scope.goFirstPage = function () {
                $scope.setPagination();
                $scope.currentPage = 1;
                $scope.checkShouldShowOmit();
                $scope.checkShouldShowBtn();
                $scope.whichPageUChoose($scope.currentPage);
            };

            // 点击最后一页
            $scope.goLastPage =  function () {
                $scope.currentPage = $scope.lastPage;
                $scope.pagesList = [];
                for (var i = $scope.tagsInPagination; i > 0 ; i--) {
                    $scope.pagesList.push({pagesNo:$scope.lastPage-i+1});
                }
                $scope.checkShouldShowOmit();
                $scope.checkShouldShowBtn();
                $scope.whichPageUChoose($scope.currentPage);
            };

            // 判断要不要显示前后省略号
            $scope.checkShouldShowOmit = function () {

                if($scope.omitPages > $scope.lastPage) {
                    $scope.showOmitAfter = false;
                    $scope.showOmitFront =false;
                } else {
                    if ($scope.pagesList[$scope.tagsInPagination-1].pagesNo < $scope.lastPage-1) {
                        $scope.showOmitAfter = true;
                    } else {
                        $scope.showOmitAfter = false;
                    }

                    if ($scope.pagesList[0].pagesNo > 2) {
                        $scope.showOmitFront = true;
                    } else {
                        $scope.showOmitFront =false;
                    }
                }
                
            };

            // 判断要不要显示上一页下一页按钮
            $scope.checkShouldShowBtn = function () {

                if($scope.omitPages > $scope.lastPage) {
                    $scope.showPrePageBtn = false;
                    $scope.showNextPageBtn = false;
                } else {
                    if ($scope.currentPage == 1) {
                        $scope.showPrePageBtn = false;
                    } else {
                        $scope.showPrePageBtn = true;
                    }

                    if ($scope.pagesList[$scope.pagesList.length-1].pagesNo < $scope.lastPage) {
                        $scope.showNextPageBtn = true;
                    } else {
                        $scope.showNextPageBtn = false;
                    }
                }
                
            };

        }}
});
angular.module("app", ["templates"])
  .controller('DataController', ['$scope', ($scope) => {
    $scope.test = 'kkek';
  }])
  .directive("app", () => {
    return {
      scope: {},
      restrict: "E",
      templateUrl: "./js/app/app.tpl.html",
      controller: ["$scope", dataCtrl],
    };

    function dataCtrl($scope) {
      $scope.model = {
        items: makeDefaulData(),
      }
    }
  })
  .directive("contentView", () => {
    return {
      scope: {
        model: "="
      },
      restrict: "E",
      templateUrl: "./js/app/content-view.tpl.html",
      controller: ['$scope', contentViewCtrl],
    };

    function contentViewCtrl($scope) {
      $scope.sort = {
        currentOrder: 'Title',
        orderOptions: ['Title', 'Date'],
        isOnlyDate: false,
        searchQuery: '',
      }
    }
  })
  .directive("sidebarView", () => {
    return {
      scope: {},
      restrict: "E",
      templateUrl: "./js/app/sidebar-view.tpl.html",
    };
  })
  .directive("elementsView", () => {
    return {
      scope: {},
      restrict: "E",
      templateUrl: "./js/app/elements-view.tpl.html",
      controller: ["$scope", "$element", elementsViewCtrl],
    };
    function elementsViewCtrl($scope, $element) {
      $scope.model = {
        width: 300,
      };
      $scope.setWidth = () => {
        let width = $scope.model.width;
        if (!width) {
          width = 1;
          $scope.model.width = width;
        }
        $element.css("width", `${width}px`);
      };
      $scope.setWidth();
    }
  })
  .directive("some1", () => {
    return {
      scope: {},
      restrict: "E",
      template: "<some-2></some-2>",
    };
  })
  .directive("some2", () => {
    return {
      scope: {},
      restrict: "E",
      template: "<some-3></some-3>",
    };
  })
  .directive("some3", () => {
    return {
      scope: {},
      restrict: "E",
      template: "<summary-view></summary-view>",
    };
  })
  .directive("summaryView", () => {
    return {
      scope: {},
      restrict: "E",
      templateUrl: "./js/app/summary-view.tpl.html",
    };
  });


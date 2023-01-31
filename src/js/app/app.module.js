angular.module("app", ["templates"])
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
        selectedItemId: null,
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
      $scope.filter = {
        currentOrder: 'title',
        orderOptions: ['title', 'date'],
        isOnlyDate: false,
        searchQuery: '',
      }

      $scope.newItemTitle = '';

      $scope.getCurrentDateFormat = () => {
        const isOnlyDate = $scope.filter.isOnlyDate;
        return isOnlyDate ? 'dd.mm.yyyy' : 'dd.mm.yyyy h:mm';
      }

      $scope.addNewItem = () => {
        const newItemTitle = $scope.newItemTitle;

        if (!newItemTitle.length) return;

        const newItem = {
          id: makeDataId(),
          title: newItemTitle,
          tags: [],
          date: Date.now(),
        }

        $scope.model.items.push(newItem);
        $scope.newItemTitle = '';
      }

      $scope.selectItem = (id) => {
        $scope.selectedItemId = id;
      }

      $scope.isSelectedItem = (id) => {
        return $scope.selectedItemId === id;
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


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
      $scope.model.filters = {
        currentOrder: 'title',
        orderOptions: ['title', 'date'],
        isOnlyDate: false,
        searchQuery: '',
      }

      $scope.model.newItemTitle = '';

      $scope.getCurrentDateFormat = () => {
        const isOnlyDate = $scope.model.filters.isOnlyDate;
        return isOnlyDate ? 'dd.mm.yyyy' : 'dd.mm.yyyy h:mm';
      }

      $scope.addNewItem = () => {
        const newItemTitle = $scope.model.newItemTitle;

        const newItem = {
          id: makeDataId(),
          title: newItemTitle,
          tags: [],
          date: Date.now(),
        }

        $scope.model.items.push(newItem);
        $scope.model.newItemTitle = '';
      }

      $scope.selectItem = (id) => {
        $scope.model.selectedItemId = id;
      }

      $scope.isSelectedItem = (id) => {
        return $scope.model.selectedItemId === id;
      }
    }
  })
  .directive("sidebarView", () => {
    return {
      scope: {
        model: "="
      },
      restrict: "E",
      templateUrl: "./js/app/sidebar-view.tpl.html",
      controller: ['$scope', sidebarViewCtrl],
      controllerAs: 'SC',
    };

    function sidebarViewCtrl($scope) {
      $scope.model.currentItem = undefined;
      $scope.model.newTagTitle = '';

      const findCurrentItem = () => {
        const items = $scope.model.items;
        const currentItemId = $scope.model.selectedItemId;

        return items.find(item => item.id === currentItemId);
      }

      const findCurrentItemIndex = () => {
        const currentItemId = $scope.model.selectedItemId;
        const items = $scope.model.items;
        return items.findIndex(item => item.id === currentItemId);
      }

      const setCurrentItem = () => {
        const currentItemId = $scope.model.selectedItemId;
        if (currentItemId) $scope.model.currentItem = findCurrentItem();
      }

      $scope.addNewTag = () => {
        const newTagTitle = $scope.model.newTagTitle;
        const currentItemIndex = findCurrentItemIndex();

        $scope.model.items[currentItemIndex].tags.push(newTagTitle);
        $scope.model.newTagTitle = '';
      }

      $scope.$watch('model.selectedItemId', setCurrentItem);

      $scope.removeTag = (index) => {
        const currentItemIndex = findCurrentItemIndex();
        $scope.model.items[currentItemIndex].tags.splice(index, 1);
      }
    }
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


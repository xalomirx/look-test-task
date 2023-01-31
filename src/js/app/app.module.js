angular.module("app", ["templates"])
  .directive("app", ["$filter", () => {
    return {
      scope: {},
      restrict: "E",
      templateUrl: "./js/app/app.tpl.html",
      controller: ["$scope", "$filter", dataCtrl],
    };

    function dataCtrl($scope, $filter) {
      $scope.model = {
        items: makeDefaulData(),
        selectedItemId: null,
        tagsList: [],
      }

      $scope.setTagsList = () => {
        const items = $scope.model.items;
        const allTagsArr = [];

        for (item of items) {
          allTagsArr.push(item.tags);
        }

        const allTagsArrFlat = allTagsArr.flat();
        const allUniqueTags = $filter('unique')(allTagsArrFlat);
        $scope.model.tagsList = allUniqueTags;
      }

      $scope.setLastItem = () => {
        const items = $scope.model.items;
        const orderByDateItems = $filter('orderBy')(items, 'date');
        const lastItemIndex = orderByDateItems.length - 1;
        const lastItem = orderByDateItems[lastItemIndex];
        $scope.model.lastItem = lastItem;
      }

      $scope.setTagsList();
      $scope.setLastItem();
    }
  }])
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
        return isOnlyDate ? 'dd.MM.yyyy' : 'dd.MM.yyyy HH:mm';
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
        $scope.model.lastItem = newItem;
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
    };

    function sidebarViewCtrl($scope) {
      console.log($scope);
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
        $scope.$parent.setTagsList();
      }

      $scope.$watch('model.selectedItemId', setCurrentItem);

      $scope.removeTag = (index) => {
        const currentItemIndex = findCurrentItemIndex();
        $scope.model.items[currentItemIndex].tags.splice(index, 1);
        $scope.$parent.setTagsList();
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
      scope: {
        model: "="
      },
      restrict: "E",
      template: "<some-2 model='model'></some-2>",
    };
  })
  .directive("some2", () => {
    return {
      scope: {
        model: "="
      },
      restrict: "E",
      template: "<some-3 model='model'></some-3>",
    };
  })
  .directive("some3", () => {
    return {
      scope: {
        model: "="
      },
      restrict: "E",
      template: "<summary-view model='model'></summary-view>",
    };
  })
  .directive("summaryView", () => {
    return {
      scope: {
        model: "="
      },
      restrict: "E",
      templateUrl: "./js/app/summary-view.tpl.html",
      controller: ['$scope', summaryViewCtrl],
    };

    function summaryViewCtrl($scope) {
    }
  })
  .filter("unique", () => {
    return function(items) {
      if (!items.length) return items;

      const uniqueItems = [];

      for (itemIndex in items) {
        const item = items[itemIndex];
        if (!uniqueItems.includes(item)) {
          uniqueItems.push(item);
        }
      }

      return uniqueItems;
    }
  })


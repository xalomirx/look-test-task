angular.module('app', [
  'templates',
  'contentView',
  'sidebarView',
  'elementsView',
  'summaryView',
])
  .directive('app', ['$filter', () => {
    return {
      scope: {},
      restrict: 'E',
      templateUrl: './js/app/app.tpl.html',
      controller: ['$scope', '$filter', dataCtrl],
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


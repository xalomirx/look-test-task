angular.module('contentView')
  .directive('contentView', () => {
    return {
      scope: {
        model: "="
      },
      restrict: "E",
      templateUrl: "./js/app/modules/content-view/content-view.tpl.html",
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
  });
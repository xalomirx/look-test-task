angular.module('sidebarView')
  .directive('sidebarView', () => {
    return {
      scope: {
        model: "="
      },
      restrict: "E",
      templateUrl: "./js/app/modules/sidebar-view/sidebar-view.tpl.html",
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
  });
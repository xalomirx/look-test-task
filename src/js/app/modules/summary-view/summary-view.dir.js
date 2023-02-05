angular.module('summaryView')
  .directive('summaryView', () => {
    return {
      scope: {
        model: "="
      },
      restrict: "E",
      templateUrl: "./js/app/modules/summary-view/summary-view.tpl.html",
    };
  });
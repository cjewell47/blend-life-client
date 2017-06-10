angular
  .module('BlendLife')
  .controller('RecipeIndexCtrl', RecipeIndexCtrl);

RecipeIndexCtrl.$inject = ['Recipe', 'filterFilter', '$scope'];
function RecipeIndexCtrl (Recipe, filterFilter, $scope) {
  const vm      = this;

  Recipe
    .query()
    .$promise
    .then(recipes => {
      vm.recipes = recipes;
      filterRecipes();
    });

  function filterRecipes() {
    const params = { ingredients:
    {
      name: vm.search
    }
    };
    vm.filtered = filterFilter(vm.recipes, params);
  }

  $scope.$watch(() => vm.search, filterRecipes);

  vm.filterRecipes = filterRecipes;
}

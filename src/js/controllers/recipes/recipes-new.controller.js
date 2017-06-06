angular
  .module('BlendLife')
  .controller('RecipeNewCtrl', RecipeNewCtrl);

RecipeNewCtrl.$inject = ['Recipe', '$state', 'Ingredient', 'filterFilter', '$scope'];
function RecipeNewCtrl (Recipe, $state, Ingredient, filterFilter, $scope) {
  const vm = this;

  vm.recipe = {
    name: '',
    description: '',
    ingredient_ids: []
  };

  Ingredient
  .query()
  .$promise
  .then(ingredients => {
    vm.ingredients = ingredients;
  });

  function filterIngredients() {
    const params = vm.recipe.ingredient_ids;
    vm.selectedIngredients = [];
    params.forEach(id => {
      vm.selectedIngredients.push(filterFilter(vm.ingredients, {id: id})[0].colour);
    });
  }

  vm.create= recipeCreate;
  function recipeCreate(){
    console.log('vm.recipe:', vm.recipe);
    if (vm.addRecipeForm.$valid) {
      Recipe
      .save({ recipe:
        // name: vm.recipe.name,
        // description: vm.recipe.description,
        // ingredient_ids: vm.recipe.ingredients
        vm.recipe
      })
      .$promise
      .then((recipe) => {
        console.log(recipe);
        $state.go('recipeIndex');
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
  $scope.$watch(() => vm.recipe.ingredient_ids, filterIngredients);
}

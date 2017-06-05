angular
  .module('BlendLife')
  .controller('RecipeNewCtrl', RecipeNewCtrl);

RecipeNewCtrl.$inject = ['Recipe', '$state'];
function RecipeNewCtrl (Recipe, $state) {
  const vm = this;
  vm.create= recipeCreate;
  function recipeCreate(){
    console.log('vm.recipe:', vm.recipe);
    if (vm.addRecipeForm.$valid) {
      Recipe
      .save(vm.recipe)
      .$promise
      .then(() => {
        $state.go('recipeIndex');
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
}

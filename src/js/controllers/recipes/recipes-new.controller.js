angular
  .module('BlendLife')
  .controller('RecipeNewCtrl', RecipeNewCtrl);

RecipeNewCtrl.$inject = ['Recipe', '$state', 'Ingredient'];
function RecipeNewCtrl (Recipe, $state, Ingredient) {
  const vm = this;

  Ingredient
  .query()
  .$promise
  .then(ingredients => {
    vm.ingredients = ingredients;
  });

//  On the newRecipe form, have a form within the form that pushes the ingredients into an array. As this is happening it is taking an average colour from those ingredients and displaying it. Then when the outside form is submitted the entire array of ingredients is pushed into the recipe object. 
//
  vm.create= recipeCreate;
  function recipeCreate(){
    console.log('vm.recipe:', vm.recipe);
    if (vm.addRecipeForm.$valid) {
      Recipe
      .save({ recipe: {
        name: vm.recipe.name,
        description: vm.recipe.description,
        ingredient_ids: vm.recipe.ingredients
      }})
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
}

angular
  .module('BlendLife')
  .controller('RecipeNewCtrl', RecipeNewCtrl);

RecipeNewCtrl.$inject = ['Recipe', '$state', 'Ingredient', '$window'];
function RecipeNewCtrl (Recipe, $state, Ingredient, $window) {
  const vm = this;

  const ColorMix = $window.ColorMix;

  vm.IsClickEnable = true;
  vm.combinationColor    = null;
  vm.selectedIngredients = [];
  vm.ingredients         = Ingredient.query();
  vm.create              = recipeCreate;
  vm.selectIngredient    = selectIngredient;

  function selectIngredient(event, ingredient) {
    if(vm.selectedIngredients.length < 8) {
      vm.selectedIngredients.indexOf(ingredient) === -1 ? vm.selectedIngredients.push(ingredient) : vm.selectedIngredients.splice(vm.selectedIngredients.indexOf(ingredient), 1);
    } else {
      vm.IsClickEnable = false;
    }

    const colors = vm.selectedIngredients.map(ingredient => {
      const arr = ingredient.colour.split(/\s*,\s*/).map(Number);
      return new ColorMix.Color(arr[0], arr[1], arr[2]);
    });

    // const percents = new Array(colors.length).fill(100 / colors.length);
    let percents = [];
    if(colors.length === 6) {
      percents = [17.5, 16.5, 16.5, 16.5, 16.5, 16.5];
    } else if (colors.length === 7) {
      percents = [14.8, 14.2, 14.2, 14.2, 14.2, 14.2, 14.2];
    } else {
      percents = new Array(colors.length).fill(100 / colors.length);
    }

    console.log(percents);


    const mix = ColorMix.mix(colors, percents);
    vm.combinationColor = `${mix.red}, ${mix.green}, ${mix.blue}`;
    console.log(vm.combinationColor );
  }

  function recipeCreate(){
    vm.selectedIngredient_ids = vm.selectedIngredients.map(function(a) {
      return a.id;
    });
    vm.recipe.ingredient_ids = vm.selectedIngredient_ids;

    if (vm.addRecipeForm.$valid) {
      Recipe
      .save({
        recipe: vm.recipe
      })
      .$promise
      .then(() => {
        $state.go('recipeIndex');
        vm.selectedIngredients = [];
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
}

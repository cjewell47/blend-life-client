angular
  .module('BlendLife')
  .config(Router);

Router.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
function Router($stateProvider, $locationProvider, $urlRouterProvider){
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/js/views/home.html'
  })
  .state('register', {
    url: '/register',
    templateUrl: '/js/views/register.html',
    controller: 'RegisterCtrl',
    controllerAs: 'vm'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/js/views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'vm'
  })
  .state('recipeIndex', {
    url: '/recipes',
    templateUrl: '/js/views/recipes/index.html',
    controller: 'RecipeIndexCtrl',
    controllerAs: 'vm'
  });
  $urlRouterProvider.otherwise('/');
}

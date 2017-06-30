# Blend Life Front-end

#### WDI project 4

Created by Charles Jewell

## Project overview

This is the front-end for my fourth WDI project. The app I built was Blend Life which was a platform for people to create and discuss smoothie recipes. 

If you would like to check out the API behind this app, you can view the repository [here](https://github.com/cjewell47/blend-life-api "Blend Life API").


![recipe submit page](http://i.imgur.com/nXECmG4.png)

## Project brief

Create a full stack application with a Ruby on Rails back-end and an AngularJS front-end. It is required to:

* Connect your Rails back-end to an SQL database and interact with it
* Create at least two models in the SQL database, one being a user model
* Have user authentication where the user's details are stored in the User model in the database
* Create API routes with CRUD functionality using Rails that are to be consumed by the AngularJS front-end

## Built with

* JavaScript
* HTML
* CSS & SCSS
* AngularJS
* Tachyons

##### Dependencies:

* angular-ui-router
* angular-resource
* angular-jwt
* angular-messages
* angular-scroll
* colormix.js

## Planning

Having completed the API with Ruby on Rails I needed to think about the user flow of the app. This would give me a good idea of what the most essential pages of the site would be, and what the most important pieces of functionality would be. To do this I made a rough wireframe of the app.

![wireframe1](http://i.imgur.com/IO3Az2j.png)
![wireframe2](http://i.imgur.com/FS3ba0q.png)

As you can see from these sections of my wireframes, it is a very rough outline of what my app would go on to look like, but it shows what is required on each page. This was useful for me to know what functionality would have to included in each controller.

## Functionality

### Authentication

Firstly, as I set the JSON Web Token in our API I needed make the client side compatible with it. One part of this was to create an AuthInterceptor. This would allow outgoing requests from the client side to the API to have tokens added to their headers so that we protected endpoints can be accessed. Incoming requests would also need to be checked for tokens so that the tokens can be saved to local storage.

For this to work I needed to add the AuthInterceptor to the $http service.

```
Interceptor.$inject = ['$httpProvider'];
function Interceptor($httpProvider) {
  return $httpProvider.interceptors.push('AuthInterceptor');
}
```
This allows the AuthInterceptor to intercept all requests and responses. The AuthInterceptor looks like this:

```
AuthInterceptor.$inject = ['API', 'TokenService'];
function AuthInterceptor(API, TokenService) {
  return {
    request: function(config){
      const token = TokenService.getToken();

      if (config.url.indexOf(API) === 0 && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    response: function(res){
      if (res.config.url.indexOf(API) === 0 && res.data.token) {
        TokenService.setToken(res.data.token);
      }
      return res;
    }
  };
}
```

As you can see, for outgoing requests, to our API (which has been injected) a token is added to the header of the request. In the response, the interceptor calls a function from my TokenService called setToken. The setToken function stores the token in the local storage, it looks like this:

```
  self.setToken = (token) => {
    return $window.localStorage.setItem('auth-token', token);
  };
```

It's from here that the token is fetched before it is stored in the header of outgoing requests.


You can see the benefits of using a token system, as when the user logs in or registers a function getUser is called, this is defined in the current user service and looks like this:

```
self.getUser = () => {
  const decoded = TokenService.decodeToken();
  if (decoded) {
  	 User
   	 .get({ id: decoded.id }).$promise
   	 .then(data => {
       self.currentUser = data;
       $rootScope.$broadcast('loggedIn');
    });
  }
};
```

This function retrieves the user data that is encoded within the token and sets the current user, to do this it calls on the decodeToken function in the Token Service, which looks like this:

```
self.decodeToken = () => {
  const token = self.getToken();
  return token ? jwtHelper.decodeToken(token) : null;
};

self.getToken = () => {
  return $window.localStorage.getItem('auth-token');
};
```

### Creating recipes










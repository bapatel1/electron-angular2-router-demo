"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var browser_1 = require("angular2/platform/browser");
var core_1 = require("angular2/core");
var router_1 = require('angular2/router');
var common_1 = require('angular2/common');
var http_1 = require('angular2/http');
var Home_1 = require('./Home');
var Users_1 = require('./Users');
var App = (function () {
    function App(http) {
        this.http = http;
        this.tiles = [
            { header: "1", event: "" },
            { header: "2", event: "" }
        ];
        this.users = [];
        this.searchTerm = new common_1.Control();
    }
    App.prototype.getUsers = function () {
        var _this = this;
        this.http.get("https://api.github.com/search/users?q=" + this.searchTerm.value)
            .map(function (response) { return response.json(); })
            .subscribe(function (data) { return _this.users = data; }, function (error) { return console.log(error); });
    };
    App = __decorate([
        router_1.RouteConfig([
            { path: '/home', component: Home_1.Home, name: 'Home' },
            { path: '/users/:userLogin/...', component: Users_1.Users, name: 'Users' },
            { path: '/**', redirectTo: ['Home'] }
        ]),
        core_1.Component({
            selector: "app",
            providers: [common_1.FORM_PROVIDERS, http_1.Http, http_1.ConnectionBackend, http_1.HTTP_PROVIDERS],
            directives: [router_1.ROUTER_DIRECTIVES, common_1.FORM_DIRECTIVES],
            template: "\n    <div id=\"sidebar\" class=\"col-sm-3\">\n     <div *ngFor=\"#tile of tiles\">\n        {{tile.header}}\n     </div>\n     <div class=\"search\">\n       <input [ngFormControl]=\"searchTerm\" class=\"form-control\" placeholder='Seach for users' />\n       <button class=\"btn btn-primary\" (click)=\"getUsers()\">Get Users</button>\n     </div>\n     <div class=\"list-group\">\n       <p class=\"no-users\" *ngIf=\"users.total_count == 0\">No users found</p>\n       <a\n    class=\"users list-group-item\"\n    *ngFor=\"#user of users.items\"\n    [routerLink]=\"['Users', { userLogin: user.login }]\"\n  >\n       <img class=\"img-circle\" src=\"{{user.avatar_url}}\"  />\n         <strong>{{user.login}}</strong>\n       </a>\n     </div>\n   </div>\n   <div id=\"main\" class=\"col-sm-9\">\n     <router-outlet></router-outlet>\n   </div>\n  ",
            styles: ["\n      #main { margin: 10px 0 }\n      #main button { margin-bottom: 5px }\n      .search * { margin: 10px 0; }\n      .no-users { color: red; }\n      .container { width: 100% }\n      img { max-width: 50px; }\n  "]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], App);
    return App;
}());
exports.App = App;
browser_1.bootstrap(App, [
    router_1.ROUTER_PROVIDERS,
    core_1.provide(router_1.APP_BASE_HREF, { useValue: '/' }),
    core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })
]);
//# sourceMappingURL=app.js.map
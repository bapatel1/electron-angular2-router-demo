import {bootstrap} from "angular2/platform/browser";
import {Component, provide } from "angular2/core";
import {NgFor} from "angular2/common";
import {
    ROUTER_DIRECTIVES, RouteConfig, Router,
    ROUTER_PROVIDERS,
    APP_BASE_HREF,
    LocationStrategy,
    HashLocationStrategy
} from 'angular2/router';

import {FORM_PROVIDERS, FORM_DIRECTIVES, Control} from 'angular2/common';
import {Http, ConnectionBackend, HTTP_PROVIDERS} from 'angular2/http';
import {Home} from '../home/Home';
import {Users} from '../users/Users';

@RouteConfig([
    { path: '/home', component: Home, name: 'Home' },
    { path: '/users/:userLogin/...', component: Users, name: 'Users' }, //since users.ts will use another child component, userDetails, we need to put "..." in route.
    { path: '/**', redirectTo: ['Home'] }
])

@Component({
    selector: "app",
    providers: [FORM_PROVIDERS, Http, ConnectionBackend, HTTP_PROVIDERS],
    directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES],
    template: `
    <div id="sidebar" class="col-sm-3">
     <div *ngFor="#tile of tiles">
        {{tile.header}}
     </div>
     <div class="search">
       <input [ngFormControl]="searchTerm" class="form-control" placeholder='Seach for users' />
       <button class="btn btn-primary" (click)="getUsers()">Get Users</button>
     </div>
     <div class="list-group">
       <p class="no-users" *ngIf="users.total_count == 0">No users found</p>
       <a
    class="users list-group-item"
    *ngFor="#user of users.items"
    [routerLink]="['Users', { userLogin: user.login }]"
  >
       <img class="img-circle" src="{{user.avatar_url}}"  />
         <strong>{{user.login}}</strong>
       </a>
     </div>
   </div>
   <div id="main" class="col-sm-9">
     <router-outlet></router-outlet>
   </div>
  `,
    styles: [`
      #main { margin: 10px 0 }
      #main button { margin-bottom: 5px }
      .search * { margin: 10px 0; }
      .no-users { color: red; }
      .container { width: 100% }
      img { max-width: 50px; }
  `]
})


export class App {

    tiles: Array<Object> = [
      {header:"1", event:""},
      {header:"2", event:""}
    ];

    users: Array<Object> = [];
    searchTerm: Control = new Control();

    constructor(public http: Http) { }

    getUsers() {
        this.http.get(`https://api.github.com/search/users?q=${this.searchTerm.value}`)
            .map(response => response.json())
            .subscribe(
            data => this.users = data,
            error => console.log(error)
            );
    }


}

bootstrap(App, [
    ROUTER_PROVIDERS,
    provide(APP_BASE_HREF, { useValue: '/' }),
    provide(LocationStrategy, { useClass: HashLocationStrategy })
]);

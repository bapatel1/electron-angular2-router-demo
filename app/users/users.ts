import {Component} from 'angular2/core';
import {Http} from 'angular2/http';
import {ROUTER_DIRECTIVES, RouteParams, RouteConfig} from 'angular2/router';
import {UserDetail} from "../userdetail/UserDetail";

@RouteConfig([
  { path: '/detail', component: UserDetail, name: 'UserDetail', useAsDefault: true  }
])
@Component({
  template: `
    <div class="panel panel-default">
      <div class="panel-heading">
        <h1>{{userLogin}}</h1>
      </div>
      <div class="panel-body">
        <router-outlet></router-outlet>
      <div>
    </div>
  `,
  directives: [ROUTER_DIRECTIVES, UserDetail]
})

export class Users {
  userLogin: Object;

  constructor(params: RouteParams) {
    this.userLogin = params.get('userLogin');
  }
}

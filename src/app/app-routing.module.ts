import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsModule } from './posts/posts.module'

const routes: Routes = [
  { path: '', redirectTo: '/blog', pathMatch: 'full'},
  { path: '', loadChildren: './posts/posts.module#PostsModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

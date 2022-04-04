import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  AuthGuard } from './auth.guard';


//Components

import { LoginComponent} from './components/login/login.component'
import { ListarpersonalComponent } from './components/listarpersonal/listarpersonal.component'
import { AgregarpersonalComponent } from './components/agregarpersonal/agregarpersonal.component'
import { EditarpersonalComponent } from './components/editarpersonal/editarpersonal.component'
import { AgregarusuariosComponent} from './components/agregarusuarios/agregarusuarios.component'
import { UserviewComponent } from './components/userview/userview.component';




const routes: Routes = [

{
  path:'',
  redirectTo:'/login',
  pathMatch:'full'

},
{
 path: 'listar',
 component: ListarpersonalComponent,
 canActivate: [AuthGuard]


},
{

  path: 'login',
  component: LoginComponent

}
,
{

  path: 'editarpersonal/:id',
  component: EditarpersonalComponent,
  canActivate: [AuthGuard]

},
{

  path: 'agregarpersonal',
  component: AgregarpersonalComponent,
  canActivate: [AuthGuard]
},
{

  path: 'agregarusuario',
  component: AgregarusuariosComponent,
  canActivate: [AuthGuard]

},
{

  path: 'userview',
  component: UserviewComponent,
  canActivate: [AuthGuard]

}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

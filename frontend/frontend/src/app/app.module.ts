import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarpersonalComponent } from './components/listarpersonal/listarpersonal.component';
import { AgregarpersonalComponent } from './components/agregarpersonal/agregarpersonal.component';
import { EditarpersonalComponent } from './components/editarpersonal/editarpersonal.component';
import { LoginComponent } from './components/login/login.component';
import { AgregarusuariosComponent } from './components/agregarusuarios/agregarusuarios.component';
import { AuthGuard}  from './auth.guard'

@NgModule({
  declarations: [
    AppComponent,
    ListarpersonalComponent,
    AgregarpersonalComponent,
    EditarpersonalComponent,
    LoginComponent,
    AgregarusuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

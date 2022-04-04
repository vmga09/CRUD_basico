import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarpersonalComponent } from './components/listarpersonal/listarpersonal.component';
import { AgregarpersonalComponent } from './components/agregarpersonal/agregarpersonal.component';
import { EditarpersonalComponent } from './components/editarpersonal/editarpersonal.component';
import { LoginComponent } from './components/login/login.component';
import { AgregarusuariosComponent } from './components/agregarusuarios/agregarusuarios.component';
import { AuthGuard}  from './auth.guard'
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UserviewComponent } from './components/userview/userview.component';


@NgModule({
  declarations: [
    AppComponent,
    ListarpersonalComponent,
    AgregarpersonalComponent,
    EditarpersonalComponent,
    LoginComponent,
    AgregarusuariosComponent,
    UserviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

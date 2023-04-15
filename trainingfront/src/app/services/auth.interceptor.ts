import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { LoginService } from "./login.service";


//It will be automatically called

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private login:LoginService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //adding token from localstorage
        let authReq=req;
        const token=this.login.getToken();
        console.log("inside interceptor");
        //if its null it means that no token will be passed
        if(token!=null){
            authReq=authReq.clone({setHeaders:{Authorization:`Bearer ${token}`},
        });
        }
        return next.handle(authReq);
    }

}

export const authInterceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true,
    }
]
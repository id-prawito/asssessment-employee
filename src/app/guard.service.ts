import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthServices } from "./auth.service";

@Injectable()
export class GuardServices implements CanActivate{

    constructor(private authService: AuthServices, private router: Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(this.authService.isAuthenticated()){
            return true;
        } else {
            this.router.navigate(['login'])
            return false
        }
    }
}
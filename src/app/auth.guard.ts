import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenHandlerService } from './services/token-handler.service';
import { PathsService } from './services/paths.service';
import { ModalService } from './services/modal.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router:Router = inject(Router);
  const jwthandler:TokenHandlerService = inject(TokenHandlerService);
  const paths:PathsService = inject(PathsService);
  const modal:ModalService = inject(ModalService);
  if(jwthandler.gettoken())
    return true;
  else{
    modal.popupon("Alert!",["Please register to use tracker.","Login if you are a registered user."]);
    router.navigate([paths.home()]);
    return false;
  }
};

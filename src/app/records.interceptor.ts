import { HttpInterceptorFn } from '@angular/common/http';
import { TokenHandlerService } from './services/token-handler.service';
import { inject } from '@angular/core';

export const recordsInterceptor: HttpInterceptorFn = (req, next) => {
  const jwthandler:TokenHandlerService = inject(TokenHandlerService);

  let newreq;

  if(jwthandler.gettoken()){
    newreq=req.clone({setHeaders:{Authorization:jwthandler.gettoken()!}});
    return next(newreq);
  }
  else
    return next(req);
};

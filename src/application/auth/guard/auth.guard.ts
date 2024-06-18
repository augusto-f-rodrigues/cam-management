import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, customer, info, context: ExecutionContext) {
    if (err || !customer) {
      throw err || new UnauthorizedException();
    }
    const request = context.switchToHttp().getRequest();
    request.customer = customer;
    return customer;
  }
}

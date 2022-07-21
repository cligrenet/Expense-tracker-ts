import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwtyoyoyo') {
  constructor() {
    super();
  }
}

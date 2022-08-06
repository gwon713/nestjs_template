import { AuthenticateInput, RegisterBaseUserInput } from '@libs/common/input';
import { AuthenticateOutput, Output } from '@libs/common/model';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { AuthProxyService } from './auth.proxy.service';

@Resolver()
export class AuthProxyResolver {
  constructor(private readonly authProxyService: AuthProxyService) {}
  @Query(() => String)
  healthCheck(): Observable<string> {
    return this.authProxyService.healthCheck().pipe();
  }

  @Query(() => AuthenticateOutput)
  authenticate(
    @Args({
      name: 'input',
      description: '로그인 정보 입력',
      type: () => AuthenticateInput,
    })
    input: AuthenticateInput,
  ): Observable<AuthenticateOutput> {
    return this.authProxyService.authenticate(input).pipe();
  }

  @Mutation(() => Output)
  registerBaseUser(
    @Args({
      name: 'input',
      description: '',
      type: () => RegisterBaseUserInput,
    })
    input: RegisterBaseUserInput,
  ): Observable<Output> {
    return this.authProxyService.registerBaseUser(input);
  }
}

import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/shared/decorators/user.decorator';
import * as authTypes from 'src/auth/auth.types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/me")
  async me(@User() user:authTypes.TokenPayloadType){
  
    
        return await this.userService.getUseById(user.id)
  }
}

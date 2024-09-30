import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
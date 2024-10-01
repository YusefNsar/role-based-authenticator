import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user details' })
  @Get('/')
  getProfile(@Req() req) {
    return this.profileService.getProfile(req.user?.email)
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current user details' })
  @Patch('/')
  updateProfile(@Req() req, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.updateProfile(req.user?.email, updateProfileDto)
  }
}
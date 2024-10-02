import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AllowedRoles } from '../common/decorators';
import { Role } from '../common/types';
import { JwtAuthGuard, RolesGuard } from '../common/guards';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @AllowedRoles(Role.Admin, Role.Viewer)
  @ApiOperation({ summary: 'Get all users (Admin and Viewer only)' })
  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @AllowedRoles(Role.Admin, Role.Viewer)
  @ApiOperation({ summary: 'Get a single user by ID (Admin and Viewer only)' })
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @AllowedRoles(Role.Admin)
  @ApiOperation({ summary: 'Create a new user (Admin only)' })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @AllowedRoles(Role.Admin)
  @ApiOperation({ summary: 'Update a user (Admin only)' })
  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @AllowedRoles(Role.Admin)
  @ApiOperation({ summary: 'Delete a user (Admin only)' })
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}

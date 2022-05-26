import { Controller, Get, Request, Post, UseGuards, Param, Body } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private authService: AuthService,private appService:AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @UseGuards(JwtAuthGuard)
  @Get('subjectall')
  getSubject(@Request() req) {
    return this.appService.allSubject();
  }
  @UseGuards(JwtAuthGuard)
  @Get('findclass/:subject_id')
  findClass(@Request() req,@Param('subject_id') subject_id) {
    return this.appService.findClassService(subject_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('findClassAndTeacher/:subject_id')
  findClassNTeacher(@Request() req,@Param('subject_id') subject_id) {
    return this.appService.findClassJoinTeacher(subject_id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('saveStudentClass')
  saveStudentClass(@Request() req,@Body() StudentClass:any) {
    console.log(StudentClass.studentClass,req.user.student_id)
    return (this.appService.saveStudentClass(StudentClass.studentClass,req.user.student_id))?{error:false,finish:true}:{error:true,finish:false};
  }

  @UseGuards(JwtAuthGuard)
  @Get('getClassStudent')
  getClassStudent(@Request() req) {
    console.log(req.user)
    return ;
  }

}
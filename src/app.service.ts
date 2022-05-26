import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async allSubject(): Promise<any> {
    const subject = await this.connection.query(`SELECT * FROM subject`)
    return subject;
  }

  async findClassService(subject_id:string):Promise<any>{
    const cl = await this.connection.query(`SELECT * FROM class WHERE subject_id = '${subject_id}'`)
    return cl;
  }

  async findClassJoinTeacher(subject_id:string):Promise<any>{
    const res = await this.connection.query(`SELECT class.subject_id,subject.subject_name,subject.credit,teacher.teacher_id,teacher.teacher_fname,teacher.teacher_lname,class.subject_section FROM class JOIN teacher ON class.teacher_id = teacher.teacher_id JOIN subject ON class.subject_id = subject.subject_id WHERE class.subject_id = '${subject_id}'`)
    return res;
  }
  async saveStudentClass(StudentClass:any[],student_id:string):Promise<any>{
    try{
      StudentClass.forEach((value,index)=>{
        this.connection.query(`INSERT INTO studentclass(student_id, subject_id, subject_section) VALUES ('${student_id}','${value.subject_id}','${value.subject_section}')`)
      })
      return true;
    }catch(e){
      return false;
    }
  }
}

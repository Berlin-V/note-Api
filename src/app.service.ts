import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Authentication, Notes } from './entity';
import { Error } from './interface';
import *as  bcrypt from 'bcrypt';
//import { customAlphabet } from 'nanoid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
        constructor(
                @InjectRepository(Authentication)
                private AR: Repository<Authentication>,

                @InjectRepository(Notes)
                private NR: Repository<Notes>,

               private jwtService: JwtService
        ) {}

async createUser (body){
                  const data = await this.AR.findOne({ where: { userMail: body.userMail },});
		 
		  if (data === null){
			 const userMail = body.userMail;
			 const pass = body.password;
			 const userId = Math.random().toString(36).substring(2,7);
			 const saltRounds =10;
                         const password = await bcrypt.hash(pass, saltRounds);
                         const matching = await bcrypt.compare (pass,password);
                         const sec = { userMail, password,userId };
		  	 const auth = await this.AR.save(sec);
			 return auth
		 }
		 else{
			 return "User Already Exit"
		 }
}

async logIn(body){
        console.log(body.userId)
        const get = await this.AR.findOne({where: { userMail:body.userMail },});
        console.log("run get",get)

      try{
        if (get.userMail === body.userMail){
         const hashedPass = get.password;
          const password = body.password;
          const matching = await bcrypt.compare(password,hashedPass);
          console.log(matching)

            if (matching === false){
                    return "Password is incorrect"
            }

            else{
                //const arr=await this.ER.findOne({where:{name:body.userName},});
                const jwt = this.jwtService.sign(get.userId,{secret:'secretKey'})
                console.log('jwt',get.userId,jwt)
                return jwt
            }

                  }
      }
      catch(err){
              return `User doesnt exit: ${err.message}`
}
}


async newNote(headers,body) {
                const auth = this.jwtService.verify(headers.authorization,{secret:'secretKey'})
                console.log (auth)

                        const userId = auth;
			const date  = new Date().toLocaleDateString();
			const time  = new Date().toLocaleTimeString();
                        
			const newNote = { userId,date,time, ...body };
                        console.log(newNote);
                        const postNote = await this.NR.save(newNote);

                        console.log(postNote);

                        return {
                                status: 'SUCCESS',
                                message: 'The Note created successfully',
                        };

                }

async getNote(body) {
try{
        const auth = this.jwtService.verify(body.authorization,{secret:'secretKey'})
        console.log('run auth',auth)
        const arr=await this.NR.findOne({where:{userId:auth},})
        console.log(arr)
        return arr
}
catch(err){
       return `Authorization failed: ${err.message}`
}
}

async deleteNotes(body){
      try{
            const auth = this.jwtService.verify(body.authorization,{secret:'secretKey'})
            await this.NR.update({userId:auth},{deleted:true})
               return (`Note is deleted`)
      }

      catch(err){
              return `Authorization failed: ${err.message}`
}
}

async  updateNotes(body,headers){
      try{
              const auth = this.jwtService.verify(headers.authorization,{secret:'secretKey'})
            console.log('check',auth,body)
        await this.NR.update({userId:auth},body)
         return "Updated Successfully"
         }

      catch(err){
              return `Authorization failed: ${err.message}`
}
}

/** async logOut(body){
         this.jwtService.
        const auth = this.jwtService.delete(body.authorization)
	return "log out successfully"
}**/

/**async getAllNotes (){
       const getAll =await this.NR.find()
       return getAll;
}**/

}


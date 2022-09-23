import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { Error } from './interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

@Post('createUser')
  createUser(@Body()data:any){
         const response = this.appService.createUser(data);
	 return response
  }

@Post ('log-in')
   logIn(@Body() data: any){
          console.log(data)
          const response =  this.appService.logIn(data);
          console.log("auth",response)
          return response
      }

@Post('newNotes')
  newNote(@Body()data:any, @Headers() headers){
         console.log(data)
          const response = this.appService.newNote(headers,data);
          return response;
  }

@Post('get-note')
  getNote(@Body() data: any, @Headers() headers) {
          console.log(headers)
    const response = this.appService.getNote(headers);
      return response
  }

@Post('delete-notes')
  deleteNotes(@Body() data: any, @Headers() headers) {
          console.log(headers)
    const response = this.appService.deleteNotes(headers);
    return response
  }

@Post('update-Notes')
  updateNotes(@Body() data: any, @Headers() headers){
    const response = this.appService.updateNotes(data,headers)
    return response ;
  }

/**@Post('log-out')
  logOut(@Body() data:any, @Headers() headers){
	  const response = this.appService.logOut(headers)
	  return response;
  }**/

/**@Post ('get-AllNotes')
  getAllNotes(){
  const response = this.appService.getAllNotes();
  return response ;
  }**/
}

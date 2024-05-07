import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  StudentArray : any[] = [];
  currentStudentId = "";

  public roomId: string= "";
  public messageText: string ="";
  public messageArray: {user: string, message: string}[] = [];

  public currentUser : any;
  public selectedUser: any;

  name : string = "";
  address: string="";
  constructor(private http: HttpClient){
    this.getAllStudents();
  }

  getAllStudents(){
    this.http.get("http://localhost:5000/user/getAll").subscribe((resultData: any) =>{
      console.log(resultData);
      this.StudentArray = resultData;
    })
  }

  setUpdate(data: any) {
    this.name = data.name
    this.address = data.address;
    this.currentStudentId = data._id;

  }

  UpdateRecords(){
    let bodyData = {
      "name": this.name,
      "address":this.address
    }
    this.http.patch("http://localhost:5000/user/update/"+this.currentStudentId,bodyData).subscribe((resultData: any) =>{
      console.log(resultData);
      alert("updated")
      this.getAllStudents();

    })
  }


  setDelete(data:any) {
    this.http.delete("http://localhost:5000/user/delete/"+data._id).subscribe((resultData: any)=>{
      console.log(resultData);
      this.getAllStudents();

    })
  }

  ngOnInit(): void {

  }

  register(){
    let bodyData = {
      "name": this.name,
      "address": this.address
    };

    this.http.post("http://localhost:5000/users",bodyData,{ withCredentials: true }).subscribe((resultData: any)=>{
      console.log(resultData);
      alert("user added ");
      this.getAllStudents();
      this.name ="",
      this.address=""
    },
    (error) => {
      console.error(error);
      alert('An error occurred');
      alert(error)
    }
    )

  }

  save(){
    if (this.currentStudentId == '') {
      this.register()
    }else{
      this.UpdateRecords()
    }
  }

}

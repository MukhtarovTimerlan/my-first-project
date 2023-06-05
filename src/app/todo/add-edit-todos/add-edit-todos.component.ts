import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-add-edit-todos',
  templateUrl: './add-edit-todos.component.html',
  styleUrls: ['./add-edit-todos.component.css']
})
export class AddEditTodosComponent implements OnInit{

  personList$!:Observable<any[]>;
  statusList$!:Observable<any[]>;
  personTasksList$!:Observable<any[]>
  constructor(private service:UserService) {}
  @Input() todos:any;
  id: number = 0;
  name: string = "";
  password: string = "";
  personId: number = 0;
  statusId: number = 0;
  title: string = "";
  description: string = "";


  ngOnInit(): void {
    this.id = this.todos.id;
    this.name = this.todos.name;
    this.password = this.todos.password;
    this.personList$ = this.service.getUserList();
    this.personTasksList$ = this.service.getRequestsList();
    this.personId = this.todos.personId;
    this.statusId = this.todos.statusId;
    this.title = this.todos.title;
    this.description = this.todos.description;
  }

  addUser() {
    var todos = {
      name:this.name,
      password:this.password,
    }
    this.service.addUser(todos).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess) {
        showAddSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showAddSuccess) {
          showAddSuccess.style.display = "none"
        }
      }, 4000);
    })
  }

  updateUser(){
    var todos = {
      id:this.id,
      name:this.name,
      password:this.password,
    }
    var id:number = this.id;
    this.service.updateUser(id, todos).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if(showUpdateSuccess) {
        showUpdateSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showUpdateSuccess) {
          showUpdateSuccess.style.display = "none"
        }
      }, 4000);
    })
  }

  addTask() {
    var todos = {
      personId:this.personId,
      title:this.title,
      description:this.description,
      statusId:this.statusId
    }
    this.service.addRequests(todos).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess) {
        showAddSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showAddSuccess) {
          showAddSuccess.style.display = "none"
        }
      }, 4000);
    })
  }
}

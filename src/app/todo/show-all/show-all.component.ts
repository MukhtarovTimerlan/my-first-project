import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService} from 'src/app/user.service';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.css']
})
export class ShowAllComponent implements OnInit {

  userList$!:Observable<any[]>;
  todoRequestsList$!:Observable<any[]>;
  todoRequestsList:any=[];

  // Map to display data associated with foreign keys
  todoRequestsMap:Map<number, string> = new Map()
  constructor(private service:UserService){}
  ngOnInit(): void{
    this.userList$ = this.service.getUserList();
    this.todoRequestsList$ = this.service.getRequestsList();
  }
  //Variables (propetries)
  modalTitle:string = '';
  activateAddEditTodosComponent:boolean = false;
  todos:any;

  modalAdd1() {
    this.todos = {
      id:0,
      name:null,
      password:null
    }
    this.modalTitle = "Add User";
    this.activateAddEditTodosComponent = true;
  }
  modalAdd2() {
    this.todos = {
      id:0,
      personId:null,
      title:null,
      description:null,
      statusId:null
    }
    this.modalTitle = "Add Task";
    this.activateAddEditTodosComponent = true;
  }

  modalEdit1(item:any) {
    this.todos = item;
    this.modalTitle = "Edit User";
    this.activateAddEditTodosComponent = true;
  }
  modalEdit2(item:any) {
    this.todos = item;
    this.modalTitle = "Edit Task";
    this.activateAddEditTodosComponent = true;
  }

  delete1(item:any) {
    if(confirm(`Are you sure you want to delete user ${item.id}`)) {
      this.service.deleteUser(item.id).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if(showDeleteSuccess) {
        showDeleteSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showDeleteSuccess) {
          showDeleteSuccess.style.display = "none"
        }
      }, 4000);
      this.userList$ = this.service.getUserList();
      })
    }
  }

  delete2(item:any) {
    if(confirm(`Are you sure you want to delete task ${item.id}`)) {
      this.service.deleteRequests(item.id).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if(showDeleteSuccess) {
        showDeleteSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showDeleteSuccess) {
          showDeleteSuccess.style.display = "none"
        }
      }, 4000);
      this.todoRequestsList$ = this.service.getRequestsList();
      })
    }
  }
  modalClose1() {
    this.activateAddEditTodosComponent = false;
    this.userList$ = this.service.getUserList();
  }
  modalClose2() {
    this.activateAddEditTodosComponent = false;
    this.todoRequestsList$ = this.service.getRequestsList();
  }
}



import { Component, OnInit } from '@angular/core';
import { TaskApiService } from '../../services/task-api.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ProjectApiService } from 'src/app/services/project-api.service';

@Component({
  selector: 'app-taskcreate',
  templateUrl: './taskcreate.component.html',
  styleUrls: ['./taskcreate.component.css'],
})
export class TaskcreateComponent implements OnInit {
  constructor(
    private TaskApiService: TaskApiService,
    private router: Router,
    private ProjectApiService: ProjectApiService
  ) {}
  listUser: Array<any> = [];
  listProject: Array<any> = [];
  performer: any = {};
  projectData: any = {};
  listUserFilter: any = [];
  listProjectFilter: any = [];
  ngOnInit(): void {
    this.ProjectApiService.getProject().subscribe((data) => {
      this.listProject = data.Projects;
      this.listProjectFilter = data.Projects;
    });
  }
  search = '';
  searchProject = ''
  filter(e: any) {
    this.search = e.target.value;
    if (e.target.value !== '') {
      this.listUserFilter =  this.listUser.filter((item: any) => item.userId.name.toLowerCase().includes(e.target.value.toLowerCase()));
    }
  }

  filterProject(e: any){
    this.searchProject = e.target.value;
    if (e.target.value !== '') {
      this.listProjectFilter = this.listProject.filter((project: any) =>
        project.projectName.toLowerCase().includes(e.target.value.toLowerCase())
      );
    }
  }

  onRemoveAss() {
    this.performer = {};
  }

  onAddUser(user: any) {
    this.performer = user
    console.log(user);
    this.search = '';
  }

  onAddProject(data: any){
    this.projectData = data;
    this.listUser = data.member;
    this.listUserFilter = data.member
    this.searchProject = ''
  }

  onRemoveProject(){
    this.projectData = {}
    this.listUser = []
    this.searchProject = ''
    this.search = ''
  }
  

  submitAddTaskForm(f: NgForm) {
    const task = {
      nameTask: f.value.nameTask,
      desc: f.value.desc,
      projectId: this.projectData._id,
      performer: this.performer.userId._id,
      startDate: f.value.startDate,
    };
    console.log('====================================');
    console.log(task);
    console.log('====================================');
    this.TaskApiService.postTask(task).subscribe((data) => {
      if (data.success) {
        this.router.navigate(['list-task']);
      }
    });
  }
}

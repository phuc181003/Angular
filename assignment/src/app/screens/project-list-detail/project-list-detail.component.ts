import { Component, OnInit } from '@angular/core';
import { ProjectApiService } from '../../services/project-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TaskApiService } from '../../services/task-api.service';

@Component({
  selector: 'app-project-list-detail',
  templateUrl: './project-list-detail.component.html',
  styleUrls: ['./project-list-detail.component.css']
})
export class ProjectListDetailComponent implements OnInit {

  constructor(private ProjectApiService: ProjectApiService, private route: ActivatedRoute, private router: Router, private UserService: UserService, private TaskApiService: TaskApiService) { }
  projectEdit:any = {};
  listUser: any = [];
  members: any = [];
  listUserFilter: any = [];
  listTaskFilter: any = []
  search = '';
  listTask: any = []
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.ProjectApiService.getOneProject(id).subscribe((data) => {
        this.projectEdit =  data.project
        this.members = data.project.member
      })
    }
    this.UserService.getUsers().subscribe((data) => {
      this.listUser = data;
      this.listUserFilter = data;
    });

    const searchProject = `?projectId=${id}`
    this.TaskApiService.getTask(searchProject).subscribe((data) => {
        this.listTask = data.tasks
        this.listTaskFilter = data.tasks
        console.log(data.tasks);
    })
    
  }

  taskStatus: any = {}
  isShowModal = false;

  onShowModalStatus(id: String, status: string) {
    console.log(id);
    
    this.taskStatus = {
      id, status
    };
    this.isShowModal = true;
  }

  onSetStatus(status: String){
    this.taskStatus.status = status
  }

  filter(e: any){
    this.search = e.target.value;
    this.listTaskFilter = this.listTask.filter((item: any) =>
        item.nameTask.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(this.listTaskFilter);
    
  }

  updateStatus(){
    const task = this.listTask.find((item: any) => item._id === this.taskStatus.id);
    if(task){
      task.status = this.taskStatus.status
    }
    this.TaskApiService.updateStatus(this.taskStatus.id, {status: this.taskStatus.status}).subscribe((res) => {
      console.log(res);
        if(res.success){
          this.isShowModal = false;
        }
    })

    
  }

}

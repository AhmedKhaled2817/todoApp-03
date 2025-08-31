import { Component } from '@angular/core';

import { Task } from '../task';


@Component({
  selector: 'app-todo-list',
  standalone: false,
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  tasks:Task[]=[];
  newTask:string='';
  editingIndex:number| null=null;
  editingTitle:string='';
  filter:string='all';

  ngOnInit(){
    this.loadFromLocalStorage();
  }

  addNewTask(){
    if(this.newTask !==''){
      this.tasks.push({
        id:this.tasks.length+1,
        title:this.newTask,
        completed:false,
      });
      this.newTask=''; 
      this.saveTasksToLocalStorage();
    }
  }
  deleteTask(index:number){
    this.tasks.splice(index,1);
    this.saveTasksToLocalStorage();
  }

  toggleTask(task:Task){
    task.completed=!task.completed;
    this.saveTasksToLocalStorage();
  }

  editTask(index:number){
    this.editingIndex=index;
    this.editingTitle=this.tasks[index].title;
  }

  saveEdit(index:number){
    if(this.editingTitle !==''){
      this.tasks[index].title=this.editingTitle;
      this.editingIndex=null;
      this.editingTitle='';
      this.saveTasksToLocalStorage();
    }
  }
  cancelEdit(){
    this.editingIndex=null;
    this.editingTitle='';
  }

  getFilteredTasks(){
    if(this.filter==='active'){
      return this.tasks.filter(filter=>!filter.completed)
    }
    else if(this.filter==='completed'){
      return this.tasks.filter(filter=>filter.completed)
    }
    else {
      return this.tasks;
    }
  }

  onFilterChange(newFilter:string){
    this.filter=newFilter;
  }

  // save all tasks in local storage
  saveTasksToLocalStorage(){
        // to check if the code is running in the browser
      if(typeof window !== 'undefined'){
        localStorage.setItem('tasks',JSON.stringify(this.tasks));
      }
  }

  // load tasks from local storage
  loadFromLocalStorage(){
    // to check if the code is running in the browser
    if(typeof window !== 'undefined'){
            let data=localStorage.getItem('tasks');
            if(data){
              this.tasks=JSON.parse(data);
          }
      }
  }

  bubbleSortTasks(){
    let arr=this.tasks;
    for(let i=0; i<arr.length -1; i++){
      for(let j=0; j<arr.length -i -1; j++){
        if(arr[j].title.toLowerCase()> arr[j+1].title.toLowerCase()){
          let temp=arr[j];
          arr[j]=arr[j+1];
          arr[j+1]=temp;
        }
      }
    }
    this.tasks=[...arr];
    this.saveTasksToLocalStorage();
  }

}

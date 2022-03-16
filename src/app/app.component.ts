import { Component, ViewChild } from '@angular/core';

export interface List {
  id: number,
  name: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild("inputEntry") inputEntry: any;
  
  title = 'homework1';

  selectOpt: string = "";
  index = 0;

  lists: List[] = [
    { id: 0, name: "To-do" },
    { id: 1, name: "In Progress" },
    { id: 2, name: "Done" },
  ]

  ngOptions: any = [
    {id: 0, val: "Easy"},
    {id: 1, val: "Medium"} , 
    {id: 2, val: "Hard"}
  ];

  toDoList: any[] = [];
  progressList: any[] = [];
  doneList: any[] = [];

  addTask(inputEntry: any, select: any) {
    if(!inputEntry || !select) {
      alert("Please fill input and select an option!!!");
    } else {
      this.index = select;
      this.selectOpt = this.ngOptions[this.index].val;
      this.toDoList.push({
        id: this.toDoList.length,
        content: inputEntry,
        level: this.selectOpt
      });

      this.inputEntry.nativeElement.value = '';
    }
    
  }

  numerize(arr: any[]) {
    let num = 0;
    arr.forEach((it) => {
      it.id = num;
      num++;
    });
  }

  toProgress(item: any) {
    this.progressList.push({
      id: this.progressList.length,
      content: this.toDoList[item.id].content,
      level: this.toDoList[item.id].level
    });
    this.toDoList = this.toDoList.filter(to => to.id !== item.id);

    this.numerize(this.toDoList);
  }

  toToDo(item: any) {
    this.toDoList.push({
        id: this.toDoList.length,
        content: this.progressList[item.id].content,
        level: this.progressList[item.id].level
    });
    this.progressList = this.progressList.filter(to => to.id !== item.id);

    this.numerize(this.progressList);
  }

  toDone(item: any) {
    this.doneList.push({
        id: this.doneList.length,
        content: this.progressList[item.id].content,
        level: this.progressList[item.id].level
    });
    this.progressList = this.progressList.filter(to => to.id !== item.id);

    this.numerize(this.progressList);
  }

  toProgressFromDone(item: any) {
    this.progressList.push({
      id: this.progressList.length,
      content: this.doneList[item.id].content,
      level: this.doneList[item.id].level
    });
    this.doneList = this.doneList.filter(to => to.id !== item.id);

    this.numerize(this.doneList);
  }

  delete(item: any) {
    this.toDoList = this.toDoList.filter(to => to.id !== item.id);

    this.numerize(this.toDoList);
  }
  
}

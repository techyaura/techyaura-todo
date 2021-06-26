import { Component, Input, OnInit } from '@angular/core';
import { AppService, ProjectService } from '../../../services';
import { TodoLabelType } from '../../../models/todo.model';

@Component({
  selector: 'app-todo-project-list',
  templateUrl: './todo-project-list.component.html',
  styles: [`
    .child-labels{
      background: var(--iq-light-primary) !important;
    }
  `]
})
export class TodoProjectListComponent implements OnInit {

  @Input()
  isSidebarCollapse = false;
  labels: TodoLabelType[];
  currentUrl = '';

  constructor(
    private appService: AppService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.getLabels();
    this.appService.currentUrlDataSource$.subscribe( url => {
      this.currentUrl = url;
    });
  }

  getLabels(): void {
    this.projectService
      .fetchAll()
      .subscribe(response => {
        this.labels = response;
      });
  }
}
import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-buttons',
  standalone: false,
  templateUrl: './filter-buttons.component.html',
  styleUrls: ['./filter-buttons.component.scss']
})
export class FilterButtonsComponent {
  @Input()   currentFilter:string='all';
  @Output()  filterChange=new EventEmitter<string>();
  setFilter(type:string){
    this.filterChange.emit(type);
  }
  
}

import { Component, OnInit } from '@angular/core';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  constructor(private tagsService: TagsService) { }

  ngOnInit() {
    this.getTags();
  }

  getTags() {
    this.tagsService.getTags().subscribe((res) => {
      console.log(res);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tag } from '../tags/tags.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as appActions from '../../store/app.actions';
import { TagsService } from 'src/app/services/tags.service';
import { selectTags } from 'src/app/store/app.selectors';
import * as moment from 'moment';


@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.scss']
})
export class CreateTagComponent implements OnInit {

  queryParams: any;
  myForm!: FormGroup;
  name: string = '';
  isEdit: boolean = false;
  selectedTag$ = this.store.select(selectTags);
  index: number = 0;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private service: TagsService
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      createdOn: ['', [Validators.required]]
    });
    this.route.queryParams.subscribe((params) => {
      if(params) {
        this.queryParams = params;
        this.index = parseInt(this.queryParams?.id);
        this.editTag();
      }
    });

  }

  editTag() {
    if(this.queryParams?.id){
      this.isEdit = true;
      const index = this.queryParams?.id;
      this.store.dispatch(appActions.selectTag({ id: index }));
      this.selectedTag$.subscribe((res) => {
        this.myForm.controls['name'].setValue(res[0].name);
        this.myForm.controls['description'].setValue(res[0].description);
        this.myForm.controls['createdOn'].setValue(this.editDateNTime(res[0].createdOn, 'YYYY-MM-DD'));
      })
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      const payLoad:Tag = this.myForm.value;
      payLoad.createdOn = new Date(payLoad.createdOn).toISOString();
      if(this.isEdit) {
        payLoad.index = this.index;
        this.store.dispatch(appActions.updateTag({ id: this.index, tag: payLoad }));
      } else {
        payLoad.index = this.service.getTotalTags() + 1;
        this.store.dispatch(appActions.addTag({ tag: payLoad }));
      }
      this.router.navigate(['/dashboard']);
    }
  }

  dashboard() {
    this.router.navigate(['/dashboard']);
  }

  editDateNTime(objDate: any, dtFormat: any) {
    return moment(objDate).format(dtFormat);
  }

}
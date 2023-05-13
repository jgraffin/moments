import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMoment } from 'src/app/interfaces/IMoment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.scss'],
})
export class MomentFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<IMoment>();
  @Input() buttonText!: string;
  @Input() momentData: IMoment | null = null;

  momentForm!: FormGroup;

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(this.editId()),
      title: new FormControl(this.editTitle(), [Validators.required]),
      description: new FormControl(this.editDescription(), [
        Validators.required,
      ]),
      image: new FormControl(''),
    });
  }

  editId() {
    return this.momentData ? this.momentData.id : '';
  }

  editTitle() {
    return this.momentData ? this.momentData.title : '';
  }

  editDescription() {
    return this.momentData ? this.momentData.description : '';
  }

  get title() {
    return this.momentForm.get('title')!;
  }

  get description() {
    return this.momentForm.get('description')!;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    this.momentForm.patchValue({
      image: file,
    });
  }

  submit() {
    if (this.momentForm.invalid) {
      return;
    }

    console.log(this.momentForm.value);

    this.onSubmit.emit(this.momentForm.value);
  }
}

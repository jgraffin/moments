import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMoment } from 'src/app/interfaces/IMoment';
import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.scss'],
})
export class EditMomentComponent implements OnInit {
  moment!: IMoment;
  buttonText = 'Editar';

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    });
  }

  async editHandler(momentData: IMoment) {
    // Data that should be sent
    const { id } = this.moment;

    const formData = new FormData();
    formData.append('title', momentData.title);
    formData.append('description', momentData.description);

    if (momentData.image) {
      formData.append('image', momentData.image);
    }

    await this.momentService.updateMoment(id!, formData).subscribe();

    this.messagesService.add(`Moment ${id} foi atualizado com sucesso!`);

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);
  }
}

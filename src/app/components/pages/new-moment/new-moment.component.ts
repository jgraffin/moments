import { Component } from '@angular/core';
import { IMoment } from 'src/app/interfaces/IMoment';
import { MomentService } from 'src/app/services/moment.service';

import { MessagesService } from 'src/app/services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.scss'],
})
export class NewMomentComponent {
  buttonText = 'Compartilhar';

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  createHandler(moment: any) {
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if (moment.image) {
      formData.append('image', moment.image);
    }

    this.momentService.createMoment(formData).subscribe();

    this.messagesService.add('Momento adicionado com sucesso!');

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 500);
  }
}

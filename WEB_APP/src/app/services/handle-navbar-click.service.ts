import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})

export class HandleNavbarClick {


    private subject = new Subject<any>();

    sendMessage(event) {
        this.subject.next(event);
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
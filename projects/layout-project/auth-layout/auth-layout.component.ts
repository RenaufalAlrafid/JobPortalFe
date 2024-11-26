import { Component } from '@angular/core';

@Component({
    selector: 'app-auth-layout',
    templateUrl: './auth-layout.component.html',
    styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent {
    carousalItems = [
        {
            image: 'bg-auth-1.svg',
            span: 'Find Your <br> First Job Here!',
        },
        {
            image: 'bg-auth-2.svg',
            span: 'Improve Your Career <br> Path with Us!',
        },
        {
            image: 'bg-auth-3.svg',
            span: 'Meet a Great Team <br> with Excellent Teamwork!',
        },
    ];
}

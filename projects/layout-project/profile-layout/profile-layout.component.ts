import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
    selector: 'app-profile-layout',
    templateUrl: './profile-layout.component.html',
    styleUrls: ['./profile-layout.component.scss'],
})
export class ProfileLayoutComponent {
    label: string[] = [
        'Personal Information',
        'Experience',
        'Education',
        'Certification',
    ];

    sidebarMenus: { label: string; link: string; isRoute: boolean }[] = [];
    private routerSubscription: Subscription;

    constructor(private aRouter: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.makeSidebarMenu();
        this.routerSubscription = this.router.events.subscribe(() => {
            this.makeSidebarMenu();
        });
    }

    makeSidebarMenu() {
        const parentPath =
            this.aRouter.snapshot.parent?.routeConfig?.path || '';
        const routes = this.aRouter.snapshot.children;

        this.sidebarMenus = this.label.map((label) => {
            const keyword = this.getKeyword(label);

            const matchingRoute = routes.find((route) =>
                route.routeConfig?.path?.includes(keyword)
            );
            const link =
                label === 'Personal Information' ? `personal` : `${keyword}`;
            return {
                label,
                link: link,
                isRoute: !!matchingRoute,
            };
        });
    }

    getKeyword(label: string): string {
        const keywords: { [key: string]: string } = {
            'Personal Information': 'personal',
            Experience: 'experience',
            Education: 'education',
            Certification: 'certification',
        };

        return keywords[label] || label.toLowerCase();
    }
}

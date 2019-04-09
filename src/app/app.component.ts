import { Component } from '@angular/core';
import { Platform , MenuController  } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { timer } from 'rxjs/observable/timer';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent {

  showSplash = true ;
  public appPages = [
    {
      title: 'Delivery hierarchy',
      url: '/home',
      icon: 'git-merge',
      open: ''
    },
    {
      title: 'Internal metrics',
      icon : 'stats',
      expand : 'add',
      hide: true,
      open: '',
      submenu : [
        {
          title: 'Revenue',
          url: '/revenue',
          icon: 'cash'
        },
        {
          title: 'Head Count',
          url: '/head-count',
          icon: 'contacts'
        },
        {
          title: 'SRF Details',
          url: '/srf',
          icon: 'document'
        }
      ]
    },
    {
      title: 'Run The Business',
      icon : 'planet',
      expand : 'add',
      open: '',
      hide: true,
      submenu : [
        {
          title: 'Cost',
          url: '/cost',
          icon: 'cash'
        },
        {
          title: 'Schedule',
          url: '/schedule',
          icon: 'contacts'
        }
      ]
    },
    {
      title: 'Enhance the business ',
      icon : 'trending-up',
      expand : 'add',
      open: '',
      hide: true,
      submenu : [
        {
          title: 'Automation',
          url: '/automation',
          icon: 'cash'
        },
        {
          title: 'Innovation',
          url: '/innovation',
          icon: 'contacts'
        },
        {
          title: 'Trends',
          url: '/trends',
          icon: 'document'
        }
      ]
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menu: MenuController,
    private router: Router

  ) {
    this.initializeApp();
  }
  doLogout() {
    this.router.navigate(['/form']);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(4000).subscribe(() => this.showSplash = false );
    });
  }
}

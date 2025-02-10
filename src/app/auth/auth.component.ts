import {
    Component,
    OnDestroy,
    AfterViewInit,
    Renderer2,
    Inject,
  } from '@angular/core';
  import { DOCUMENT } from '@angular/common';
  
  @Component({
    selector: 'app-auth',
    template: '<div id="supertokensui"></div>',
  })
  export class AuthComponent implements AfterViewInit, OnDestroy {
    constructor(
      private renderer: Renderer2,
      @Inject(DOCUMENT) private document: Document
    ) {}
  
    ngAfterViewInit() {
      // Carga el script de SuperTokens
      this.loadSuperTokensScript();
    }
  
    ngOnDestroy() {
      // Elimina el script al destruir el componente
      const script = this.document.getElementById('supertokens-script');
      if (script) {
        script.remove();
      }
    }
  
    private loadSuperTokensScript() {
      const script = this.renderer.createElement('script');
      script.type = 'text/javascript';
      script.src =
        'https://cdn.jsdelivr.net/gh/supertokens/prebuiltui@v0.48.0/build/static/js/main.81589a39.js';
      script.id = 'supertokens-script';
      script.onload = () => {
        this.initializeSuperTokens();
      };
      this.renderer.appendChild(this.document.body, script);
    }
  
    private initializeSuperTokens() {
      // Inicializa SuperTokens UI
      (window as any).SuperTokens.init({
        appInfo: {
          appName: 'Agencia',
          apiDomain: 'http://localhost:3000',
          websiteDomain: 'http://localhost:4200',
          apiBasePath: '/auth',
          websiteBasePath: '/auth',
        },
        recipeList: [
          (window as any).SuperTokensEmailPassword.init(),
          (window as any).SuperTokensSession.init(),
        ],
      });
    }
  }
  
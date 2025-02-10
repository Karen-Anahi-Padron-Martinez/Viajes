import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkModeKey = 'darkMode';

  constructor() {
    this.loadTheme();
  }

  toggleDarkMode(): void {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem(this.darkModeKey, JSON.stringify(isDarkMode));
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.darkModeKey);
    if (savedTheme && JSON.parse(savedTheme)) {
      document.body.classList.add('dark-mode');
    }
  }
}

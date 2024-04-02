import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable()
export class PrefixTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const TITLES = ['Musify', this.buildTitle(snapshot)].filter(text => text);

    this.title.setTitle(TITLES.join(' - '));
  }
}

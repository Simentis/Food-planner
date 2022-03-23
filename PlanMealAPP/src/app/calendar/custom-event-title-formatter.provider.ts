import { LOCALE_ID, Inject, Injectable } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { formatDate } from '@angular/common';
import locale from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();registerLocaleData(locale);
  }

  // you can override any of the methods defined in the parent class

  override month(event: CalendarEvent): string {
    return `<b>${formatDate(event.start, 'h:m a', this.locale)}</b> ${
      event.title
    }`;
  }

  override week(event: CalendarEvent): string {
    return `<b>${formatDate(event.start, 'h:m a', this.locale)}</b> ${
      event.title
    }`;
  }

  override day(event: CalendarEvent): string {
    return `<b>${formatDate(event.start, 'h:m a', this.locale)}</b> ${
      event.title
    }`;
  }
}
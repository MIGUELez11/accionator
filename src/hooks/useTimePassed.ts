import { DEFAULT_LANGUAGE } from '@/i18n/tolgee/shared';
import { useTolgee } from '@tolgee/react';
import { useEffect, useState } from 'react';

const TIME_CONSTANTS = {
  SECOND: 1000,
  MINUTE: 1000 * 60,
  HOUR: 1000 * 60 * 60,
  DAY: 1000 * 60 * 60 * 24,
} as const;

export function getTimePassed(date: Date, locale: string) {
  if (!date || isNaN(date?.getTime())) {
    throw new Error('Invalid date provided');
  }

  const diffMs = Date.now() - date.getTime();
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  let since;

  if (diffMs < TIME_CONSTANTS.MINUTE) {
    since = formatter.format(-Math.floor(diffMs / TIME_CONSTANTS.SECOND), 'seconds');
  } else if (diffMs < TIME_CONSTANTS.HOUR) {
    since = formatter.format(-Math.floor(diffMs / TIME_CONSTANTS.MINUTE), 'minutes');
  } else if (diffMs < TIME_CONSTANTS.DAY) {
    since = formatter.format(-Math.floor(diffMs / TIME_CONSTANTS.HOUR), 'hours');
  } else {
    since = formatter.format(-Math.floor(diffMs / TIME_CONSTANTS.DAY), 'days');
  }

  return since;
}

export function useTimePassed(date: Date) {
  const tolgee = useTolgee(['language']);
  const locale = tolgee.getLanguage() ?? DEFAULT_LANGUAGE;

  const [timePassed, setTimePassed] = useState<string>('');

  useEffect(() => {
    const updateTimePassed = () => setTimePassed(getTimePassed(date, locale));
    updateTimePassed();

    const diffMs = Date.now() - date.getTime();
    let interval: number;

    if (diffMs < TIME_CONSTANTS.MINUTE) {
      interval = window.setInterval(updateTimePassed, TIME_CONSTANTS.SECOND);
    } else if (diffMs < TIME_CONSTANTS.HOUR) {
      interval = window.setInterval(updateTimePassed, TIME_CONSTANTS.MINUTE);
    } else if (diffMs < TIME_CONSTANTS.DAY) {
      interval = window.setInterval(updateTimePassed, TIME_CONSTANTS.HOUR);
    } else {
      interval = window.setInterval(updateTimePassed, TIME_CONSTANTS.DAY);
    }

    return () => clearInterval(interval);
  }, [date, locale]);

  return timePassed;
}

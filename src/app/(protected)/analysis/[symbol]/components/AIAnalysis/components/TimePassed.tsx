import { useEffect, useState } from 'react';

function getTimePassed(date: Date) {
  const diffMs = Date.now() - date.getTime();
  const formatter = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });

  let since;
  if (diffMs < 1000 * 60) {
    // less than a minute - update every second
    since = formatter.format(-Math.floor(diffMs / 1000), 'seconds');
  } else if (diffMs < 1000 * 60 * 60) {
    // less than an hour - update every minute
    since = formatter.format(-Math.floor(diffMs / (1000 * 60)), 'minutes');
  } else if (diffMs < 1000 * 60 * 60 * 24) {
    // less than a day - update every hour
    since = formatter.format(-Math.floor(diffMs / (1000 * 60 * 60)), 'hours');
  } else {
    // more than a day - update every day
    since = formatter.format(-Math.floor(diffMs / (1000 * 60 * 60 * 24)), 'days');
  }

  return since;
}

function useTimePassed(date: Date) {
  const [timePassed, setTimePassed] = useState<string>('');

  useEffect(() => {
    const updateTimePassed = () => setTimePassed(getTimePassed(date));
    updateTimePassed();

    const diffMs = Date.now() - date.getTime();
    let interval: number;

    if (diffMs < 1000 * 60) {
      // Update every second if less than a minute
      interval = window.setInterval(updateTimePassed, 1000);
    } else if (diffMs < 1000 * 60 * 60) {
      // Update every minute if less than an hour
      interval = window.setInterval(updateTimePassed, 1000 * 60);
    } else if (diffMs < 1000 * 60 * 60 * 24) {
      // Update every hour if less than a day
      interval = window.setInterval(updateTimePassed, 1000 * 60 * 60);
    } else {
      // Update every day if more than a day
      interval = window.setInterval(updateTimePassed, 1000 * 60 * 60 * 24);
    }

    return () => clearInterval(interval);
  }, [date]);

  return timePassed;
}

export function TimePassed({ date }: { date: Date }) {
  const timePassed = useTimePassed(new Date(date));
  return <div className="text-sm text-muted-foreground">{timePassed}</div>;
}

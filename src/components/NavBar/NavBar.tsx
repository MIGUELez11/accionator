import { NavBarLink } from './components/NavBarLink';

const pages = {
  screener: {
    href: '/screener',
    label: 'Screener',
  },
  plan: {
    href: '/plan',
    label: 'Plan de inversión',
  },
};

export function NavBar() {
  return (
    <div className="flex flex-row gap-6">
      {Object.entries(pages).map(([key, value]) => (
        <NavBarLink href={value.href} key={key}>
          {value.label}
        </NavBarLink>
      ))}
    </div>
  );
}

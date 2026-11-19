import Link from "next/link";
import { BtsIcon, type IconName } from "@/components/icons/BtsIcon";

type Crumb = { label: string; href: string };

type Props = {
  current: string;
  icon?: IconName;
  crumbs?: Crumb[];
};

export function BtsBreadcrumbs({ current, icon = "stations", crumbs = [] }: Props) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/" className="with-ico">
            <BtsIcon name="home" size={14} />
            Home
          </Link>
        </li>
        {crumbs.map((crumb) => (
          <li key={crumb.href}>
            <Link href={crumb.href}>{crumb.label}</Link>
          </li>
        ))}
        <li aria-current="page">
          <span className="crumb-current with-ico">
            <BtsIcon name={icon} size={14} />
            {current}
          </span>
        </li>
      </ol>
    </nav>
  );
}
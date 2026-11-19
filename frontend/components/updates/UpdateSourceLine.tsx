import { BtsIcon } from "@/components/icons/BtsIcon";
import { officialSourceHref } from "@/lib/news-source";

type Props = {
  sourceSite?: string;
  sourceName?: string;
};

export function UpdateSourceLine({ sourceSite, sourceName }: Props) {
  const site = sourceSite?.trim() || "nhsrcl.in";
  const label = sourceName?.trim() || "NHSRCL";
  return (
    <p className="update-source">
      Source:{" "}
      <a href={officialSourceHref(site)} target="_blank" rel="noopener noreferrer" className="with-ico">
        {site}
        <BtsIcon name="external" size={12} />
      </a>
      <span className="update-source-org"> ({label})</span>
    </p>
  );
}
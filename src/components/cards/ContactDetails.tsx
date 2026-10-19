import type { Company, SiteContent } from "@/content/types";
import { Icon, type AnyIconName } from "@/components/ui/Icon";

/** Figma 07 Components / Contact Row, composed into the list of company contacts. */
function ContactRow({ icon, label, children }: { icon: AnyIconName; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-md">
      <Icon name={icon} className="shrink-0 text-accent-default" />
      <div className="flex flex-col gap-2xs">
        <dt className="type-eyebrow text-text-muted">{label}</dt>
        <dd className="type-body-m text-text-primary">{children}</dd>
      </div>
    </div>
  );
}

const valueLink = "rounded-sm transition-colors hover:text-accent-default";

export function ContactDetails({ company, labels }: { company: Company; labels: SiteContent["contact"] }) {
  const { address } = company;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${address.street}, ${address.postalCode} ${address.city}`,
  )}`;

  return (
    <dl className="flex flex-col gap-lg">
      <ContactRow icon="map-pin" label={labels.addressLabel}>
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={valueLink}>
          {address.street}
          <br />
          {address.postalCode} {address.city} - {address.country}
        </a>
      </ContactRow>
      <ContactRow icon="phone" label={labels.phoneLabel}>
        <a href={`tel:${company.phone.replace(/\s/g, "")}`} className={valueLink}>
          {company.phone}
        </a>
      </ContactRow>
      <ContactRow icon="mail" label={labels.emailLabel}>
        <a href={`mailto:${company.email}`} className={valueLink}>
          {company.email}
        </a>
      </ContactRow>
      <ContactRow icon="clock" label={labels.hoursLabel}>
        {labels.hours}
      </ContactRow>
    </dl>
  );
}

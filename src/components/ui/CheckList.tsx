import { Icon } from "./Icon";

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-md">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-sm type-body-m text-text-primary">
          <Icon name="check" className="mt-[1px] shrink-0 text-accent-default" />
          {item}
        </li>
      ))}
    </ul>
  );
}

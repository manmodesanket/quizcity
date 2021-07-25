import { HeaderProps } from "./header.types";

export default function Header({ title }: HeaderProps) {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-center">{title}</h1>
    </div>
  );
}

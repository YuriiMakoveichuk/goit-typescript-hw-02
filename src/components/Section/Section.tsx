import css from "./Section.module.css";

interface Props {
  children: React.ReactElement;
}

export const Section = ({ children }: Props) => {
  return <section className={css.section}>{children}</section>;
};

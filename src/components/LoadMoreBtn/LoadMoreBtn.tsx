import css from "./LoadMoreBtn.module.css";

type Props = {
  children: React.ReactElement;
  onClick: () => void;
  disabled: boolean;
};

const LoadMoreBtn = ({ children, onClick, disabled }: Props) => {
  return (
    <button className={css.btn} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default LoadMoreBtn;

import { OpenModal } from "../../App";
import css from "./ImageCard.module.css";

type Props = {
  small: string;
  regular: string;
  description: string;
  openModal: OpenModal;
};

const ImageCard = ({ small, regular, description, openModal }: Props) => {
  return (
    <div className={css.box}>
      <img
        src={small}
        alt={description}
        onClick={() => openModal(regular, description)}
      />
    </div>
  );
};

export default ImageCard;

import { Image, OpenModal } from "../../App";
import ImageCard from "../ImageCard/ImageCard";

import css from "./ImageGallery.module.css";

type Props = {
  images: Image[];
  openModal: OpenModal;
};

const ImageGallery = ({ images, openModal }: Props) => {
  return (
    <ul className={css.list}>
      <>
        {images.map(({ id, description, urls: { small, regular } }) => (
          <li key={id} className={css.item}>
            <ImageCard
              small={small}
              regular={regular}
              description={description}
              openModal={openModal}
            />
          </li>
        ))}
      </>
    </ul>
  );
};

export default ImageGallery;

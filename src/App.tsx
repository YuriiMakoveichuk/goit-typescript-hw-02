import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { getImages } from "./apiServer/apiImages";
import Loader from "./components/Loader/Loader";
import { Section } from "./components/Section/Section";
import { Container } from "./components/Container/Container";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import { ImageModal } from "./components/ImageModal/ImageModal";

export interface Image {
  id: number;
  src: string;
  urls: {
    small: string;
    regular: string;
  };
  description: string;
}

export type SubmitSearchBar = (value: string) => void;
export type OpenModal = (regular: string, alt: string) => void;
export type CloseModal = () => void;
export type Response = {
  results: Image[];
  total_pages: number;
};

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalUrl, setModalUrl] = useState<string>("");
  const [modalAlt, setModalAlt] = useState<string>("");

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      setIsLoading(true);
      setIsVisible(false);
      setError(null);
      setIsEmpty(false);
      try {
        const { results, total_pages }: Response = await getImages(query, page);

        if (!results.length) {
          return setIsEmpty(true);
        }

        setImages((prevImages) => [...prevImages, ...results]);
        setIsVisible(page < total_pages);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [page, query]);

  const handleSubmit: SubmitSearchBar = (value) => {
    setQuery(value);
    setImages([]);
    setPage(1);
  };

  const lodeMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal: OpenModal = (regular, alt) => {
    setIsOpen(true);
    setModalUrl(regular);
    setModalAlt(alt);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalUrl("");
    setModalAlt("");
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <Section>
        <Container>
          <>
            {images.length > 0 && (
              <ImageGallery images={images} openModal={openModal} />
            )}
            {isVisible && (
              <LoadMoreBtn onClick={lodeMore} disabled={isLoading}>
                <>{isLoading ? "Loading" : "Load more"}</>
              </LoadMoreBtn>
            )}
            {!images.length && isEmpty && <span>sorry </span>}
            {isLoading && <Loader />}
            {error && <span>error</span>}
            {isEmpty && <span>no images</span>}
          </>
        </Container>
      </Section>
      <ImageModal
        modalIsOpen={isOpen}
        closeModal={closeModal}
        src={modalUrl}
        alt={modalAlt}
      />
    </>
  );
}

export default App;

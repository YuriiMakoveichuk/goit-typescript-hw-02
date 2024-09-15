import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { getImages } from "./apiServer/apiImages";
import Loader from "./components/Loader/Loader";
import { Section } from "./components/Section/Section";
import { Container } from "./components/Container/Container";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import { ImageModal } from "./components/ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalAlt, setModalAlt] = useState("");

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      setIsLoading(true);
      setIsVisible(false);
      setError(null);
      setIsEmpty(false);
      try {
        const { results, total_pages } = await getImages(query, page);

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

  const handleSubmit = (value) => {
    setQuery(value);
    setImages([]);
    setPage(1);
  };

  const lodeMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (url, alt) => {
    setIsOpen(true);
    setModalUrl(url);
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
          {images.length > 0 && (
            <ImageGallery images={images} openModal={openModal} />
          )}
          {isVisible && (
            <LoadMoreBtn onClick={lodeMore} disabled={isLoading}>
              {isLoading ? "Loading" : "Load more"}{" "}
            </LoadMoreBtn>
          )}
          {!images.length && isEmpty && <span>sorry </span>}
          {isLoading && <Loader />}
          {error && <span>error</span>}
          {isEmpty && <span>no images</span>}
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

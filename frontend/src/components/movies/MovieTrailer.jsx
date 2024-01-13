import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./assets/movieTrailer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";

const MovieTrailer = ({ videos }) => {

  const [trailerKey, setTrailerKey] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchTrailerKey = async () => {
      try {
        const trailer = videos.find((video) => video.type === "Trailer" || video.type === "Teaser");
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    fetchTrailerKey();
  }, [videos]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (!trailerKey) {
    return null;
  }

  return (
    <div>
      <div className="div-click-trailer" onClick={openModal}>
        <FontAwesomeIcon icon={faCirclePlay} style={{ color: "#ffffff", cursor: "pointer" }} />
        &nbsp;&nbsp;Trailer
      </div>
      <div className="modal-container-trailer">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Movie Trailer Modal"
          className="modal-content"
          overlayClassName="modal-overlay"
          ariaHideApp={false}
        >
          {trailerKey ? (
            <iframe
              title="Bande-annonce"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              allowFullScreen
              className="modal-video"
            ></iframe>
          ) : (
            <div>No trailer available</div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default MovieTrailer;

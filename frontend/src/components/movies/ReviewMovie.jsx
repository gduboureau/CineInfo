import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./assets/review.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import Modal from "react-modal";

const ReviewMovie = ({ images, movie }) => {
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [commentText, setCommentText] = useState("");
    const commentsPerPage = 3;
    const isUserLoggedIn = !!sessionStorage.getItem("token");


    useEffect(() => {
        fetch(`http://localhost:8080/movies/${id}/comments`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                const sortedComments = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setComments(sortedComments);
            });
    }, [id]);

    const visibleComments = comments.slice(activeIndex, activeIndex + commentsPerPage);

    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "numeric", year: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    const handlePrevClick = () => {
        setActiveIndex((prevIndex) => Math.max(0, prevIndex - commentsPerPage));
    };

    const handleNextClick = () => {
        setActiveIndex((prevIndex) => Math.min(comments.length - 1, prevIndex + commentsPerPage));
    };

    const randomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        return {
            background: `url('https://image.tmdb.org/t/p/original/${images[randomIndex].file_path}') center/cover`,
        };
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCommentText("");
    };

    const handleCommentChange = (event) => {
        setCommentText(event.target.value);
    };

    const handleCommentSubmit = () => {
        if (commentText.trim() !== "") {
            closeModal();
            fetch(`http://localhost:8080/movies/${id}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    comment: commentText,
                    movieId: id,
                    date: new Date(),
                }),
            });
            window.location.reload();
        }
    };


    return (
        <div className="review-container">
            <div className="review-comments">
                {visibleComments.length > 0 && (
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        onClick={handlePrevClick}
                        className={`arrow-icon ${activeIndex === 0 ? "disabled" : ""}`}
                    />
                )}
                <div className="review-cards-container">
                    {visibleComments.length > 0 ? (
                        visibleComments.map((comment, index) => (
                            <div
                                key={comment.id}
                                className={`review-card ${index === 0 ? "active" : ""}`}
                                style={randomImage()}
                            >
                                <div className="review-content">
                                    <div className="comment-header">
                                        <img src={comment.image} alt={`user pp ${comment.id}`}/>
                                        <div className="account-pseudo-date">
                                            <p>
                                                <span>@{comment.username},</span> &nbsp;
                                                le {formatDate(comment.date)}
                                                {comment.rating && (
                                                    <span> - {comment.rating}/5</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p>{comment.comment}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-comment">Soyez la première personne à laisser un avis.</div>
                    )}
                </div>
                {visibleComments.length > 0 && (
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        onClick={handleNextClick}
                        className={`arrow-icon ${activeIndex >= comments.length - commentsPerPage ? "disabled" : ""}`}
                    />
                )}
            </div>
            {isUserLoggedIn ? (
                <div className="add-comment">
                    Vous avez vu le film ?
                    <button onClick={openModal}>Laissez un avis !</button>
                    <div className="modal-container-comment">
                        <Modal
                            isOpen={showModal}
                            onRequestClose={closeModal}
                            contentLabel="Movie Comment Modal"
                            className="modal-content-comment"
                            overlayClassName="modal-overlay"
                            ariaHideApp={false}
                        >
                            <div className="add-comment-container" >
                                <div className="header-comment">
                                    <FontAwesomeIcon size="xl" className="icon-add-comment" icon={faComment} flip="horizontal" />
                                    Mon avis sur {movie.original_title}
                                </div>
                                <div className="comment-input-container">
                                    <textarea
                                        value={commentText}
                                        onChange={handleCommentChange}
                                        placeholder="Partagez votre avis sur ce film, votre commentaire sera visible par tous les utilisateurs. N'oubliez pas de mettre une note. Et surtout, ne spoilez pas !"
                                    />
                                </div>
                                <div className="submit-button-comment">
                                    <button onClick={handleCommentSubmit}>Soumettre</button>
                                </div>
                                <div className="alert-comment-section">
                                    Nous vous rappelons qu'il est interdit de poster des commentaires à caractère injurieux, violents ou encore racistes. Les commentaires de ce type seront supprimés et l'utilisateur se verra banni.
                                    Nous vous remercions de votre compréhension.
                                </div>
                                <FontAwesomeIcon className="close-modal-comments" icon={faXmark} onClick={closeModal} />
                            </div>
                        </Modal>
                    </div>
                </div>
            ) : (
                <div className="add-comment">
                    Vous devez être connecté pour laisser un avis.
                </div>
            )}
        </div>
    );
};

export default ReviewMovie;

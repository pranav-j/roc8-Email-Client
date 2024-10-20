import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/slices/emailStatusLocalSlice";
import "../styles/emailView.css";

const EmailView = () => {
    const dispatch = useDispatch();
    const { emailId } = useSelector((state) => state.selectionReducer);
    const [emailDetails, setEmailDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { emails } = useSelector((state) => state.emailReducer);
    const { emailStatus } = useSelector((state) => state.emailStatusReducer);
    const emailViewed = emails.find((email) => email.id === emailId);
    const isFavorite = emailStatus.some((email) => email.id === emailId && email.fav);

    useEffect(() => {
        if (emailId) {
            setLoading(true);
            fetch(`https://flipkart-email-mock.vercel.app/?id=${emailId}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch email details.");
                    }
                    return response.json();
                })
                .then((data) => {
                    setEmailDetails(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [emailId]);

    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(emailId));
    };

    if (loading) return <p className="status-message">Loading...</p>;
    if (error) return <p className="status-message">Error: {error}</p>;
    if (!emailDetails) return null;

    return (
        <div className="email-vieww">
            <span className="avatar">{emailViewed.from.name[0].toUpperCase()}</span>
            <div className="email-details">
                <div className="subject-fav-div">
                    <span className="body-subject">{emailViewed.subject}</span>
                    <button onClick={handleToggleFavorite}>
                        {isFavorite ? "Remove from Favorites" : "Mark as Favorite"}
                    </button>
                </div>
                <span className="email-date">
                    {new Date(emailViewed.date).toLocaleString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
                <div
                    className="email-body"
                    dangerouslySetInnerHTML={{ __html: emailDetails.body }}
                />
            </div>
        </div>
    );
};

export default EmailView;

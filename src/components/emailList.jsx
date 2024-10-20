import { useEffect, useState } from "react";
import { fetchEmails } from "../redux/slices/emailSlice";
import { useDispatch, useSelector } from "react-redux";
import { setEmailId, resetEmailId } from "../redux/slices/selectionSlice";
import { addEmailToViewed } from "../redux/slices/emailStatusLocalSlice";
import "../styles/emailList.css";

const EmailList = () => {
    const dispatch = useDispatch();
    const { emails, status, error } = useSelector((state) => state.emailReducer);
    const { emailFilter, emailId } = useSelector((state) => state.selectionReducer);
    const { emailStatus } = useSelector((state) => state.emailStatusReducer);
    const [page, setPage] = useState(1);

    let filteredEmails = emails;

    useEffect(() => {
        dispatch(fetchEmails(page));
    }, [dispatch, page]);

    const handleViewEmail = (id) => {
        dispatch(setEmailId(id));
        dispatch(addEmailToViewed(id));
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        dispatch(resetEmailId());
    };

    if (emailStatus.length > 0) {
        const viewedEmailIds = emailStatus.map((status) => status.id);
        const favoriteEmailIds = emailStatus
            .filter((status) => status.fav)
            .map((status) => status.id);

        if (emailFilter === 'unread') {
            filteredEmails = emails.filter((email) => !viewedEmailIds.includes(email.id));
        } else if (emailFilter === 'read') {
            filteredEmails = emails.filter((email) => viewedEmailIds.includes(email.id));
        } else if (emailFilter === 'favorites') {
            filteredEmails = emails.filter((email) => favoriteEmailIds.includes(email.id));
        }
    }

    return (
        <div>
            {status === 'pending' && <p className="status-message">Loading...</p>}
            {status === 'rejected' && <p className="status-message">Error: {error}</p>}
            {filteredEmails && filteredEmails.map((email, index) => (
                <div 
                    className={`email-card ${email.id === emailId ? 'active' : ''}`} 
                    key={index} 
                    onClick={() => handleViewEmail(email.id)}
                >
                    <span className="avatar">{email.from.name[0].toUpperCase()}</span>
                    <div className="email-details">
                        <p className="email-from">
                            From: <strong>{email.from.name} &lt;{email.from.email}&gt;</strong>
                        </p>
                        <h2 className="email-subject">Subject: {email.subject}</h2>
                        <p className="email-description">{email.short_description}</p>
                        <div className="email-footer">
                            <span className="email-date">
                                {new Date(email.date).toLocaleString(undefined, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </span>
                            {emailStatus.some((status) => status.id === email.id && status.fav) && (
                                <span className="email-favorite">Favorite</span>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            <div className="pagination">
                <button 
                    className={`page-button ${page === 1 ? 'active' : ''}`} 
                    onClick={() => handlePageChange(1)}
                >
                    1
                </button>
                <button 
                    className={`page-button ${page === 2 ? 'active' : ''}`} 
                    onClick={() => handlePageChange(2)}
                >
                    2
                </button>
            </div>
        </div>
    );
};

export default EmailList;

import { useDispatch, useSelector } from "react-redux";
import { resetEmailId, setEmailFilter } from "../redux/slices/selectionSlice";
import "../styles/header.css"

const Header = () => {
    const dispatch = useDispatch();
    const { emailFilter } = useSelector((state) => state.selectionReducer);
    const handleFilterChange = (filter) => {
        dispatch(setEmailFilter(filter));
        dispatch(resetEmailId());
    };

    return (
        <div className="header">
            <span>Filter By:</span>
            <button
                className={emailFilter === 'all' ? "selected-button" : "unsellected-button"}
                onClick={() => handleFilterChange('all')}
            >
                All
            </button>
            <button
                className={emailFilter === 'unread' ? "selected-button" : "unsellected-button"}
                onClick={() => handleFilterChange('unread')}
            >
                Unread
            </button>
            <button
                className={emailFilter === 'read' ? "selected-button" : "unsellected-button"}
                onClick={() => handleFilterChange('read')}
            >
                Read
            </button>
            <button
                className={emailFilter === 'favorites' ? "selected-button" : "unsellected-button"}
                onClick={() => handleFilterChange('favorites')}
            >
                Favorites
            </button>
        </div>
    );
};

export default Header;
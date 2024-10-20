import './App.css';
import Header from './components/header';
import EmailList from './components/emailList';
import EmailView from './components/emailView';
import { useSelector } from 'react-redux';

function App() {
  const { emailId } = useSelector((state) => state.selectionReducer);

  return (
    <>
      <Header />
      <div className='main-body'>
        <div className="email-list">
          <EmailList />
        </div>
        {emailId && (
          <div className={`email-view ${emailId ? 'active' : ''}`}>
            <EmailView />
          </div>
        )}
      </div>
    </>
  );
}

export default App;

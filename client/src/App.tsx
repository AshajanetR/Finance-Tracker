import './App.css'
import { BrowserRouter as Router,Routes,Route, Link } from 'react-router-dom';

import { Auth } from './pages/auth';
import { Dashboard } from './pages/dashboard';
import { FinancialRecordsProvider } from './contexts/financial-recors-context';
import { SignedIn, UserButton } from '@clerk/clerk-react';
// import { dark } from '@clerk/themes';

function App() {
 return (
 <Router>
    <div className="app-container">
      <div className='navbar'>
         <Link to ="/">Dashboard</Link>
         <Link to ="/auth">Create account</Link>
         <SignedIn>
            <UserButton/>
            {/* showName appearance={{baseTheme:dark}} */}
        </SignedIn>
      </div>
      <Routes>
        <Route path="/"
         element={
            <FinancialRecordsProvider>
               <Dashboard/>
            </FinancialRecordsProvider>
         }/>
        <Route path="/auth" element={<Auth/>}/>
      </Routes>
    </div>
 </Router>

 );
}

export default App;

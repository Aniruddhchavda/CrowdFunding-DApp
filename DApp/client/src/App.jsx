import { Navbar, Welcome, Footer, Services, Transactions } from "./components";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
     <Routes>
       <Route path='/add' element={
       <div className="min-h-screen">
         <div className="gradient-bg-welcome">
       <Navbar />
       <Welcome/>
       </div>
       </div>
       }/>
       <Route path='/application' element={
        <div className="min-h-screen">
        <div className="gradient-bg-welcome">
       <Navbar />
       <Transactions/>
       </div>
       </div>
      }/>

      <Route path='/' element={
 
         <div className="min-h-screen">
        <div className="gradient-bg-welcome">
        <Navbar />
       </div>
          <Services />
        </div>
       
       }/>
     </Routes>
    </BrowserRouter>

  );

  };

export default App;

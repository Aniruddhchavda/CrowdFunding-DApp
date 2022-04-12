import { Navbar, Welcome, Footer, Services, Transactions,Admin , Account} from "./components";
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

      <Route path='/secterkey1441' element={
              <div className="min-h-screen">
              <div className="gradient-bg-welcome">
              <Navbar />
              <Admin/>
              </div>
              </div>
      }></Route>

<Route path='/account' element={
              <div className="min-h-screen">
              <div className="gradient-bg-welcome">
              <Navbar />
              <Account/>
              </div>
              </div>
      }></Route>

      <Route path='/' element={
 
         <div className="min-h-screen">
        <div className="gradient-bg-welcome">
        <Navbar />
       
          <Services />
          </div>
        </div>
       
       }/>
     </Routes>
    </BrowserRouter>

  );

  };

export default App;

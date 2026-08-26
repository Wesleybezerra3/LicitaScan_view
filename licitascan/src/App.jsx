import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  replace,
} from "react-router-dom";
import { Toaster } from 'sonner' 
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import Editais from "./pages/Editais";


function App() {
  return (
    <>
       <Router>
          <Toaster expand={true} richColors />
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Navigate to='dashboard' replace/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="editais" element={<Editais/>}/>
          </Route>

          {/* <Dashboard/> */}
        </Routes>
      </Router>
    </>
  )
}

export default App

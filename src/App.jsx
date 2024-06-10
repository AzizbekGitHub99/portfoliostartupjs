import { BrowserRouter, Route, Routes, } from "react-router-dom";
import { useSelector } from "react-redux";

import HomePage from "./pages/public/home";
import LoginPage from "./pages/public/login";
import RegisterPage from "./pages/public/register";
import PublicLayout from "./components/layout/public";
import AdminLayout from "./components/layout/private";
import WarningModal from "./components/warning-modal";
import useRolePage from "./hooks/useRolePage";
import ClientUsersPage from "./pages/public/users";
import PortfolioUIPage from "./pages/public/portfolio";

const App = () => {
  const {  user } = useSelector((state) => state.auth);
  const rolePage = useRolePage()
  return (
    <BrowserRouter>
      {user?.role === 'user' ? <WarningModal /> : null}
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="clients" element={< ClientUsersPage/>} />
        </Route>
          <Route path="/clients/portfolio/:userId" element={<PortfolioUIPage />} />
          <Route  element={ <AdminLayout /> }>
            {
              rolePage.map(({key, element: Element}) => (
                <Route path={key}  element={<Element />} key={key} />
              ))
            }
          </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

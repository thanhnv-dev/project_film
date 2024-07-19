import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/Sidebar";
import sidebar_menu from "./constants/sidebar-menu";
import "./App.css";
import Films from "./pages/films";
import CmtsPage from "./pages/cmts";
import UsersPage from "./pages/users";
import LoginPage from "./login/LoginPage";
import FilmsDetails from "./pages/films/details";
import UserDetails from "./pages/users/details";
import CreateFilm from "./pages/films/create";
import CreateUser from "./pages/users/create";
import RequireAuth from "./router/RequireAuth";

function App() {
  // const getTokenLocal = localStorage.getItem("token");
  return (
    <Router>
      <div className="dashboard-container">
        {/* {getTokenLocal ? <SideBar menu={sidebar_menu} /> : null} */}
        <RequireAuth>
          <SideBar menu={sidebar_menu} />
        </RequireAuth>
        <div className="dashboard-body">
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route
              exact
              path="/films"
              element={
                <RequireAuth>
                  <Films />
                </RequireAuth>
              }
            />
            <Route path="/films/:idfilm" element={<FilmsDetails />} />
            <Route path="/users/:userId" element={<UserDetails />} />
            <Route path="/films/create" element={<CreateFilm />} />
            <Route path="/users/create" element={<CreateUser />} />
            <Route
              exact
              path="/cmts"
              element={
                <RequireAuth>
                  <CmtsPage />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/users"
              element={
                <RequireAuth>
                  <UsersPage />
                </RequireAuth>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppProvider from "./utils/AppProvider";
import { Header, ProtectedRoute, Sidebar, SquarePayment } from "./components";
import {
  HomePage,
  AuthPage,
  Logout,
  PrivatePage,
  PostPage,
  SavedPage,
  Profile,
  AboutPage,
} from "./pages/";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {ShareProvider} from './components/Bookmark'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Header />
        <div className="main-container">
          <Sidebar />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/post" element={<PostPage />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path="/saved" element={<SavedPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route
                path="/private"
                element={
                  <ProtectedRoute>
                    <PrivatePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/logout" element={<Logout />} />
              <Route path="/payment" element={<SquarePayment />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

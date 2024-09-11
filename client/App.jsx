import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppProvider from "./utils/AppProvider";
import CartProvider from './utils/CartProvider';
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
  ItemPage,
  CategoryPage,
  Success
} from "./pages/";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {ShareProvider} from './components/Bookmark'

export default function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/post");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data.payload);
      } catch (err) {
        setError(`Error fetching posts: ${err.message}`);
        console.error("Error fetching posts:", err);
      }
    }

    fetchPosts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ShareProvider>
      <AppProvider>
        <CartProvider> {/* Wrap your app with CartProvider */}
          <BrowserRouter>
            <Header />
            <div className="main-container">
              <Sidebar />
              <div className="content-container">
                <Routes>
                  <Route path="/" element={<HomePage posts={posts} />} />
                  <Route path="/category/:categoryName" element={<CategoryPage posts={posts} />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/post/:id" element={<ItemPage posts={posts} />} />
                  <Route path="/post" element={<PostPage />} />
                  <Route path="/success" element={<Success />} />
                  <Route path="/saved" element={
                      <ProtectedRoute>
                        <SavedPage />
                      </ProtectedRoute>
                    }
                  />
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
        </CartProvider>
      </AppProvider>
    </ShareProvider>
  );
}

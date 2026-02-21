import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/dashbaord";
import Posts from "./pages/posts";
import Market from "./pages/market";
import Reports from "./pages/reports";
import Users from "./pages/users";
import Communities from "./pages/communities";
import Pages from "./pages/pages";
import Login from "./auth/login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login route — NO LAYOUT */}
        <Route path="/login" element={<Login />} />

        {/* All other routes — WITH LAYOUT */}
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/market" element={<Market />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/users" element={<Users />} />
                <Route path="/communities" element={<Communities />} />
                <Route path="/pages" element={<Pages />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

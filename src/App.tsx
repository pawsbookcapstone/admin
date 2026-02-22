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
import Subscriptions from "./pages/subscriptions";
import Verifications from "./pages/verifications";
import { AppsProvider } from "./AppsProvider";
import Gcash from "./pages/gcash";

function App() {
  return (
    <AppsProvider>
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
                  <Route path="/subscriptions" element={<Subscriptions />} />
                  <Route path="/verifications" element={<Verifications />} />
                  <Route path="/gcash" element={<Gcash />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </AppsProvider>
  );
}

export default App;

import { BrowserRouter as Router } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";
import Layout from "@/components/Layout";
import AppRoutes from "@/Routes";

function App() {
  return (
    <Router>
      <Layout>
        <AppRoutes />
      </Layout>
      <Toaster />
    </Router>
  );
}

export default App;

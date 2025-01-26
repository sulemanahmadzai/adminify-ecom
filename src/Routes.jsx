import { Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Products from "@/pages/Products";
import Inbox from "@/pages/Inbox";
import Chat from "@/pages/Chat";
import Orders from "@/pages/Orders";
import Stock from "@/pages/Stock";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/stock" element={<Stock />} />
    </Routes>
  );
}

export default AppRoutes;

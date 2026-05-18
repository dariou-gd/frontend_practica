import { Outlet } from "react-router";
import Nav from "./Nav";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Nav />

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;

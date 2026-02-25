import { Outlet } from 'react-router-dom';
import Navbar from '../Student/Navbar';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="bg-slate-950 min-h-screen">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;

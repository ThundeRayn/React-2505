import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import StatusBar from './blocks/StatusBar';
import BottomNav, { type TabName } from './blocks/BottomNav';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import TodoPage from './pages/TodoPage';
import GalleryPage from './pages/GalleryPage';
import ProfilePage from './pages/ProfilePage';

// Legacy pages — preserved from original codebase
import CatSalary from './pages/CatSalary';

const TAB_ROUTES: Record<TabName, string> = {
  home: '/',
  todo: '/todo',
  gallery: '/gallery',
  profile: '/profile',
};

const ROUTE_TO_TAB: Record<string, TabName> = {
  '/': 'home',
  '/todo': 'todo',
  '/gallery': 'gallery',
  '/profile': 'profile',
};

function AppShell() {
  // Pull auth state from context (provided by AuthProvider).
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab from current route
  const activeTab: TabName = ROUTE_TO_TAB[location.pathname] || 'home';

  const handleTabChange = (tab: TabName) => {
    navigate(TAB_ROUTES[tab]);
  };

  if (loading) {
    // While Supabase resolves the initial session, show a blocking loader.
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>Loading...</p>
      </div>
    );
  }

  if (!user) {
    // No authenticated user -> render LoginPage instead of the router.
    return <LoginPage />;
  }

  return (
    <>
      <div className="app-background" />
      <div className="app-shell">
        <StatusBar />
        <div className="page-content">
          <Routes>
            {/* Only reachable when user is authenticated (see gate above). */}
            <Route path="/" element={<HomePage />} />
            <Route path="/todo" element={<TodoPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* Legacy routes */}
            <Route path="/legacy/salary" element={<CatSalary />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}

export default App;

import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Events } from './components/Events';
import { Gallery } from './components/Gallery';
import { Posts } from './components/Posts';
import { JoinForm } from './components/JoinForm';
import { Footer } from './components/Footer';
import { FormsPage } from './components/FormsPage';
import { ContentProvider } from './context/ContentContext';
import { AdminGate, isAdminAuthed } from './components/admin/AdminGate';
import { AdminPanel } from './components/admin/AdminPanel';

type Route = 'site' | 'admin' | 'formlar';

function useRoute(): Route {
  const getRoute = (): Route => {
    const hash = window.location.hash;
    if (hash.startsWith('#admin')) return 'admin';
    if (hash.startsWith('#formlar')) return 'formlar';
    return 'site';
  };

  const [route, setRoute] = useState<Route>(getRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}

function AdminRoute() {
  const [authed, setAuthed] = useState(isAdminAuthed());
  if (!authed) return <AdminGate onSuccess={() => setAuthed(true)} />;
  return <AdminPanel />;
}

function SiteRoute() {
  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Events />
        <Posts />
        <Gallery />
        <JoinForm />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const route = useRoute();

  return (
    <ContentProvider>
      {route === 'admin' && <AdminRoute />}
      {route === 'formlar' && <FormsPage />}
      {route === 'site' && <SiteRoute />}
    </ContentProvider>
  );
}

export default App;

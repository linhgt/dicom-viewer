import { lazy, LocationProvider, Route, Router, useLocation } from 'preact-iso';
import { useEffect } from 'preact/hooks';

const ViewerPage = lazy(() => import('../pages/viewer'));

function RedirectToViewer() {
  const { route } = useLocation();

  useEffect(() => {
    route('/viewer', true);
  }, [route]);

  return null;
}

export default function AppRouter() {
  return (
    <LocationProvider>
      <Router>
        <Route path='/' component={RedirectToViewer} />
        <Route path='/viewer' component={ViewerPage} />
      </Router>
    </LocationProvider>
  );
}

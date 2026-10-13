
import { useEffect, useState } from 'react';
import LandingPage from './LandingPage';
import SplashScreen from './SplashScreen';

export default function StartupPage() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowSplash(false);
    }, 2300);

    return () => window.clearTimeout(timer);
  }, []);

  return showSplash ? <SplashScreen /> : <LandingPage />;
}

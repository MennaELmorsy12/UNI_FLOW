import { motion } from 'motion/react';
import {
  LandingNavbar,
  LandingHero,
  LandingFeatures,
  LandingBylawsShowcase,
  LandingRoles,
  LandingCta,
  LandingFooter,
} from '../../components/landing';

export default function LandingPage() {
  return (
    <motion.div
      className="landing-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <LandingNavbar />
      <main id="landing-main">
        <LandingHero />
        <LandingFeatures />
        <LandingBylawsShowcase />
        <LandingRoles />
        <LandingCta />
      </main>
      <LandingFooter />
    </motion.div>
  );
}

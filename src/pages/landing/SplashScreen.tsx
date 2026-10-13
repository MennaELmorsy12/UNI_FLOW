
import { GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

export default function SplashScreen() {
  return (
    <main className="splash-screen">
      <motion.div
        className="splash-content"
        initial={{ opacity: 0, y: 25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          className="splash-logo"
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <GraduationCap size={48} strokeWidth={1.7} />
        </motion.div>

        <h1 className="splash-title">
          Uni<span>Flow</span>
        </h1>

        <p className="splash-subtitle">
          Your University, One Smart Portal.
        </p>

        <div className="splash-loader">
          <motion.div
            className="splash-loader-fill"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          />
        </div>

        <p className="splash-loading-text">
          Preparing your experience...
        </p>
      </motion.div>

      <div className="splash-orb splash-orb-one" />
      <div className="splash-orb splash-orb-two" />
    </main>
  );
}

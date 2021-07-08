import React from 'react';
import { motion } from 'framer-motion';

const pageTransition = {
  initial: {
    bottom: 0,
  },
  animate: {
    bottom: '100%',
    transition: { duration: 1, ease: [0.9, 0, 0.1, 1] },
  },
  exit: {
    bottom: 0,
    transition: { duration: 1, ease: [0.9, 0, 0.1, 1] },
  },
};
export default function Setting() {
  return (
    <>
      <motion.div className="transition transition-1" initial="initial" animate="animate" exit="exit" variants={pageTransition} />
      <div>
        <h1>Setting</h1>
      </div>
    </>
  );
}

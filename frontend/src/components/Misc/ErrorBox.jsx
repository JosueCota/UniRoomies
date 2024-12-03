import React from 'react';
import styles from "./errorbox.module.css";
import { animate, color, motion } from "motion/react";

const ErrorBox = ({error}) => {
  return (

    <motion.div  id={styles.snackbar}
    initial={{scale: 0}}
    animate={{
        scale:[1, 1.1, 1],
        opacity:[1, .95, 1]
    }}
    transition={{repeat: Infinity, duration:2}}
    >
        {error?.data?.message || error.error || error}
    </motion.div>
  )
}

export default ErrorBox

import React from 'react';
import styles from "./errorbox.module.css";
import { motion } from "motion/react";

const ErrorBox = ({error}) => {
  return (

    <motion.div  id={styles.snackbar}
    initial={{scale: 0}}
    animate={{
        scale:[1,1.2,1]
    }}>
        {error?.data?.message || error.error || error}
    </motion.div>
  )
}

export default ErrorBox

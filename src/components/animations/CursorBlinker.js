import { motion } from "framer-motion";

const cursorVariants = {
    blinking: {
        opacity: [0, 0, 1, 1],
        transition: {
            duration: 1,
            repeat: Infinity,
            repeatDelay: 0,
            ease: "linear",
            times: [0, 0.5, 0.5, 1]
        }
    }
};

export default function CursorBlinker({ cursorColor }) {
    return (
        <motion.span
            variants={cursorVariants}
            animate="blinking"
            style={{
                width: '1px', height: '15px', backgroundColor: cursorColor || '#000', display: 'inline-block'
            }}
        />
    );
}

import React, { FC, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import FocusTrap from "focus-trap-react";

interface IProps {
	isOpen: boolean;
	onClose: () => void;
	shoundBeCloseOutside?: boolean;
}

const backdropVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};
const contentVariants = {
	hidden: { y: 105, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
};

const Modal: FC<IProps> = ({
	children,
	isOpen,
	onClose,
	shoundBeCloseOutside,
}) => {
	const backdropRef = useRef(null!);

	const handleClose = useCallback(
		(e) =>
			shoundBeCloseOutside && e.target === backdropRef.current && onClose(),
		[onClose, shoundBeCloseOutside]
	);

	const escapeListener = useCallback(
		(e: KeyboardEvent) => e.key === "Escape" && onClose(),
		[onClose]
	);

	useEffect(() => {
		if (backdropRef.current) {
			document.addEventListener("keydown", escapeListener);

			return () => document.removeEventListener("keydown", escapeListener);
		}
	}, [escapeListener]);

	return createPortal(
		<AnimatePresence exitBeforeEnter>
			{isOpen && (
				<Backdrop
					variants={backdropVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
					ref={backdropRef}
					onClick={handleClose}
				>
					<FocusTrap focusTrapOptions={{ initialFocus: false }}>
						<Content variants={contentVariants}>{children}</Content>
					</FocusTrap>
				</Backdrop>
			)}
		</AnimatePresence>,
		document.getElementById("modal") as HTMLElement
	);
};

export default Modal;

const Backdrop = styled(motion.div)`
	position: fixed;
	inset: 0;
	display: grid;
	place-items: center;
	background: rgba(0, 0, 0, 0.53);
	z-index: 999;
`;

const Content = styled(motion.div)`
	display: flex;
	border-radius: 3px;
	background: #1a1159;
`;

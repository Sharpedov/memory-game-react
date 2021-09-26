import { Button } from "@mui/material";
import React, { FC } from "react";
import styled from "styled-components";

interface IProps {
	size?: "small" | "medium" | "large";
	onClick?: () => void;
	disabled?: boolean;
}

interface IStyled {
	disabled?: boolean;
}

const CustomButton: FC<IProps> = ({ children, size, onClick, disabled }) => {
	return (
		<StyledButton
			variant="contained"
			size={size}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</StyledButton>
	);
};

export default CustomButton;

const StyledButton = styled(Button)<IStyled>`
	font-size: 1.3rem;

	&.Mui-disabled {
		opacity: 1;
		background: #c3c3;
	}
`;

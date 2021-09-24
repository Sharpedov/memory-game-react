import { Button } from "@mui/material";
import styled from "styled-components";

const App = () => {
	return (
		<div>
			<h1>Hello</h1>
			<StyledButton>Button</StyledButton>
		</div>
	);
};

export default App;

const StyledButton = styled(Button)`
	background: #000;
	color: pink;
`;

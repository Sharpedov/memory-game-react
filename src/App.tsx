import React from "react";
import Game from "./components/game";
import styled from "styled-components";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IconButton } from "@mui/material";

const App = () => {
	return (
		<Container>
			<Wrapper>
				<Navbar>
					<a
						target="_blank"
						href="https://github.com/Sharpedov/memory-game-react"
						rel="noopener noreferrer"
					>
						<StyledIconButton>
							<GitHubIcon className="navbarIconButton__icon" />
						</StyledIconButton>
					</a>
				</Navbar>
				<Game />
			</Wrapper>
		</Container>
	);
};

export default App;

const Container = styled.div`
	padding: 20px 15px;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 700px;
	width: 100%;
	margin: 0 auto;
`;

const Navbar = styled.nav`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const StyledIconButton = styled(IconButton)`
	color: #fff;
	padding: 7px;

	.navbarIconButton__icon {
		font-size: 2.7rem;
	}

	&:hover {
		background: rgba(255, 255, 255, 0.1);
	}
`;

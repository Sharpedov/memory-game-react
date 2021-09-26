import React, { FC, useCallback } from "react";
import { CardActionArea } from "@mui/material";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectFirstCard, selectSecondCard } from "src/store/slices/gameSlice";

interface IProps {
	id: number;
	img: any;
	index: number;
	isFound: boolean | null;
	disabled: boolean;
}

interface IStyled {
	visible?: boolean;
	isFound?: boolean;
	disabled?: boolean;
	className?: any;
}

const mapState = (state: any) => ({
	firstCard: state.game.firstSelectedCard,
	secondCard: state.game.secondSelectedCard,
});

const Card: FC<IProps> = ({ id, img, index, isFound, disabled }: IProps) => {
	const { firstCard, secondCard } = useSelector(mapState);
	const dispatch = useDispatch();

	const handleSelectCard = useCallback(() => {
		firstCard === null
			? dispatch(selectFirstCard({ id, index }))
			: dispatch(selectSecondCard({ id, index }));
	}, [id, index, dispatch, firstCard]);

	return (
		<Container
			onClick={handleSelectCard}
			visible={firstCard?.index === index || secondCard?.index === index}
			disabled={
				disabled || firstCard?.index === index || secondCard?.index === index
			}
			className={isFound && "isFound"}
		>
			<FrontOfCard></FrontOfCard>
			<BackOfCard
				visible={firstCard?.index === index || secondCard?.index === index}
			>
				<CardImage src={img} draggable="false" />
			</BackOfCard>
		</Container>
	);
};

export default Card;

const Container = styled(CardActionArea)<IStyled>`
	position: relative;
	padding-top: 100%;
	background: rgba(255, 255, 255, 0.1);
	cursor: pointer;
	border-radius: 1px;
	transform: ${({ visible }) =>
		visible ? " rotateY(-180deg)" : "rotateY(0deg)"};

	transition: transform 0.3s ease;
	transition: background 0.25s cubic-bezier(0.5, 1, 0.89, 1),
		transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);

	&.disabled {
		pointer-events: none;
	}

	&.isFound {
		pointer-events: none;
		background: rgba(255, 255, 255, 0.02);
	}

	> span {
		background: none;
	}

	&:hover {
		background: rgba(255, 255, 255, 0.2);
	}
`;

const FrontOfCard = styled.div`
	position: absolute;
	inset: 0;
`;

const BackOfCard = styled.div<IStyled>`
	position: absolute;
	inset: 0;
	opacity: ${({ visible }) => (visible ? "1" : "0")};
	pointer-events: none;
	transform: rotateY(-180deg);
	transition: opacity 0.1s ease;
`;
const CardImage = styled.img`
	position: absolute;
	inset: 0;
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

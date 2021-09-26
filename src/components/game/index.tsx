import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import styled from "styled-components";
import CustomButton from "../customButton";
import Card from "src/components/card";
import { useDispatch, useSelector } from "react-redux";
import {
	checkIsMatches,
	resetGame,
	startGame,
} from "src/store/slices/gameSlice";
import { setTimeout } from "timers";
import { gameCardsData } from "src/data/gameCards";
import Modal from "src/components/modal";

interface IStyled {
	className?: any;
}

const mapState = (state: any) => ({
	isStarted: state.game.isStarted,
	gameCards: state.game.cards as [
		{ id: number; img: any; isFound: boolean | null }
	],
	firstCard: state.game.firstSelectedCard,
	secondCard: state.game.secondSelectedCard,
	totalMoves: state.game.totalMoves,
	parisFound: state.game.parisFound,
});

const tilesArr = [12, 16, 20];

const Game = () => {
	const {
		isStarted,
		gameCards,
		firstCard,
		secondCard,
		totalMoves,
		parisFound,
	} = useSelector(mapState);
	const dispatch = useDispatch();
	const [disableCards, setDisableCards] = useState(false);
	const timeoutCheckIsMatchesRef = useRef(null! as any);
	const timeoutDisableCardsRef = useRef(null! as any);
	const [selectedTilesNumber, setSelectedTilesNumber] = useState<number>(
		tilesArr[1]
	);
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

	const swapArr = useCallback((arr: [], i: number, j: number) => {
		const temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}, []);

	const gameCardsSlice = useMemo(
		() => gameCardsData.slice(0, selectedTilesNumber / 2),
		[selectedTilesNumber]
	);

	const suffleCards = useCallback(
		(arr: any) => {
			const arrLength = arr.length;
			for (let i = arrLength; i > 0; i--) {
				const randomIndex = Math.floor(Math.random() * i);
				const currentIndex = i - 1;
				swapArr(arr, currentIndex, randomIndex);
			}
			return arr;
		},
		[swapArr]
	);

	const handleStartGame = useCallback(() => {
		if (isStarted) {
			clearTimeout(timeoutCheckIsMatchesRef.current);
			clearTimeout(timeoutDisableCardsRef.current);
			dispatch(resetGame());
			return;
		}
		dispatch(startGame(suffleCards([...gameCardsSlice, ...gameCardsSlice])));
	}, [dispatch, suffleCards, gameCardsSlice, isStarted]);

	useEffect(() => {
		if (firstCard && secondCard) {
			timeoutCheckIsMatchesRef.current = setTimeout(
				() => dispatch(checkIsMatches()),
				1000
			);
			setDisableCards(true);
			timeoutDisableCardsRef.current = setTimeout(
				() => setDisableCards(false),
				1000
			);
		}
	}, [firstCard, secondCard, dispatch]);

	useEffect(() => {
		!!parisFound &&
			parisFound === gameCardsSlice.length &&
			setModalIsOpen(true);
	}, [parisFound, gameCardsSlice, isStarted]);

	return (
		<>
			<Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
				<ModalBody>
					<ModalContent>
						<span>Moves: {totalMoves}</span>
						<span>Pairs found: {parisFound}</span>
					</ModalContent>
					<ModalActions>
						<CustomButton
							onClick={() => {
								dispatch(resetGame());
								setModalIsOpen(false);
							}}
						>
							Reset game
						</CustomButton>
					</ModalActions>
				</ModalBody>
			</Modal>
			<Container>
				<Header>
					<HeaderTop>
						<span>Moves: {totalMoves}</span>
						<span>Pairs found: {parisFound}</span>
					</HeaderTop>
					<HeaderBottom>
						<CustomButton size="medium" onClick={handleStartGame}>
							{isStarted ? "Reset" : "Start"}
						</CustomButton>
						<TilesRow className={isStarted && "disabled"}>
							{tilesArr.map((tile, i) => (
								<Tile
									key={`tile-${i}`}
									className={selectedTilesNumber === tile && "active"}
									onClick={() => setSelectedTilesNumber(tile)}
								>
									{tile}
								</Tile>
							))}
						</TilesRow>
					</HeaderBottom>
				</Header>
				<Content>
					{gameCards.map((card, i) => (
						<Card
							key={`card-${card.id}-${i}`}
							index={i}
							id={card.id}
							img={card.img}
							isFound={card.isFound}
							disabled={disableCards}
						/>
					))}
				</Content>
			</Container>
		</>
	);
};

export default Game;

const ModalBody = styled.div`
	display: flex;
	flex-direction: column;
	width: 92vw;
	max-width: 400px;
	padding: 1.5rem;
`;

const ModalContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const ModalActions = styled.div`
	display: flex;
	margin-top: 15px;
	align-items: center;
	justify-content: flex-end;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const Header = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
	padding: 20px 0;

	> span {
		font-size: 1.8rem;
	}
`;

const HeaderTop = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
const HeaderBottom = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Content = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 10px;

	@media (min-width: 768px) {
		grid-template-columns: repeat(5, 1fr);
	}
`;

const TilesRow = styled.div<IStyled>`
	display: flex;
	align-items: center;
	gap: 0 15px;
	margin: 15px 0;

	&.disabled {
		pointer-events: none;
		opacity: 0.65;
	}
`;

const Tile = styled.div<IStyled>`
	cursor: pointer;
	font-size: 1.6rem;
	opacity: 0.6;
	user-select: none;
	transition: opacity 0.15s ease;

	&:hover {
		opacity: 0.8;
	}

	&.active {
		opacity: 1;
	}
`;

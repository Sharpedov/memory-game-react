import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICardsArr {
	id: number;
	img: any;
	isFound?: boolean;
}

interface ISelectedCardPayload {
	id: number;
	index: number;
}

const initialState = {
	isStarted: false,
	cards: [] as any,
	firstSelectedCard: null as ISelectedCardPayload | null,
	secondSelectedCard: null as ISelectedCardPayload | null,
	parisFound: 0,
	totalMoves: 0,
};

const gameSlice = createSlice({
	name: "game",
	initialState,
	reducers: {
		startGame: (state, action: PayloadAction<ICardsArr>) => {
			state.isStarted = true;
			state.cards = action.payload;
		},
		selectFirstCard: (state, action: PayloadAction<ISelectedCardPayload>) => {
			state.totalMoves += 1;
			state.firstSelectedCard = action.payload;
		},
		selectSecondCard: (state, action: PayloadAction<ISelectedCardPayload>) => {
			state.totalMoves += 1;
			state.secondSelectedCard = action.payload as ISelectedCardPayload;
		},
		checkIsMatches: (state) => {
			if (
				state.firstSelectedCard?.id === state.secondSelectedCard?.id &&
				state.secondSelectedCard !== null
			) {
				state.cards = state.cards.map((card: any) =>
					card?.id === state.firstSelectedCard?.id
						? {
								...card,
								isFound: true,
						  }
						: card
				);
				state.parisFound += 1;
				state.firstSelectedCard = null;
				state.secondSelectedCard = null;
			}
			state.firstSelectedCard = null;
			state.secondSelectedCard = null;
		},
		resetGame: (state) => {
			state.isStarted = false;
			state.cards = [];
			state.firstSelectedCard = null;
			state.secondSelectedCard = null;
			state.parisFound = 0;
			state.totalMoves = 0;
		},
	},
});

export const {
	startGame,
	selectFirstCard,
	selectSecondCard,
	checkIsMatches,
	resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;

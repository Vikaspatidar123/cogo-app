import styled from '@cogoport/front/styled';

const DEFAULT_THEME = 'blue';

const CARD_THEME = {
	blue: {
		bg   : '#d9e5fc',
		text : '#1a4696',
	},
	offer: {
		text : 'white',
		bg   : '#5143aa',
	},
};

export const Container = styled.div`
	padding: 16px;
	border-radius: 4px;
	margin-bottom: 16px;
	background-color: ${({ theme = DEFAULT_THEME }) => CARD_THEME[theme].bg};
	${({ bg }) => (bg ? `background-image: url(${bg})` : '')};
	background-repeat: no-repeat;
	background-size: cover;
`;

export const Title = styled.h5`
	font-size: 14px;
	font-weight: bold;
	line-height: 18px;
	color: ${({ theme = DEFAULT_THEME }) => CARD_THEME[theme].text};
	margin: 0 0 8px;
`;

export const Description = styled.p`
	font-size: 12px;
	line-height: 16px;
	color: ${({ theme = DEFAULT_THEME }) => CARD_THEME[theme].text};
	margin: 0 0 16px;
`;

export const Action = styled.button`
	border: none;
	padding: none;
	background: transparent;
	font-size: 14px;
	font-weight: 600;
	line-height: 18px;
	text-align: right;
	color: ${({ theme = DEFAULT_THEME }) => CARD_THEME[theme].text};
	margin-left: auto;
	display: block;
	cursor: pointer;
	outline: none;

	&:hover {
		text-decoration: underline;
	}
`;

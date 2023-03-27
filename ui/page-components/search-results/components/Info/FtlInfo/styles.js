import styled, { keyframes } from '@cogoport/front/styled';

const slide = keyframes`
	0% {
		width: 0px;
		opacity: 0;
 	}

 	100% {
	 	width: calc(100% - 267px);
		opacity: 1;
  	}
`;

export const Container = styled.div`
	width: 100%;
	border-radius: 10px;
	display: flex;
	background: #f9f9f9;
	padding: 3px 16px;

	&.app {
		border: 1px solid #e0e0e0;
	}

	@media (max-width: 760px) {
		border: 1px solid #bdbdbd;
		flex-direction: column;
	}

	@media (max-width: 1164px) {
		background: #ffffff;
	}
`;

export const InfoWrapper = styled.div`
	@media (max-width: 760px) {
		margin-bottom: 124px;

		&.edit {
			margin-bottom: 248px;
		}
	}
`;

export const EditContainer = styled.div`
	display: flex;
	align-items: flex-end;
	width: 100%;
	background: white;
	padding: 4px 10px;
	border-radius: 10px;

	&.app {
		border: 1px solid #e0e0e0;
	}
`;

export const Pill = styled.div`
	background-color: #dce1ff;
	padding: 2px 6px;
	border-radius: 4px;
	font-size: 10px;
	margin-top: 8px;
	text-transform: uppercase;
	width: fit-content;

	@media (max-width: 760px) {
		margin-right: 10px;
		margin-top: 0px;
	}
`;

export const Line = styled.div`
	border-right: 1px solid #e0e0e0;

	@media (max-width: 760px) {
		border: none;
		border-top: 1px solid #d6d6d6;
		width: 100%;
	}

	&.mobile {
		border: 1px solid #e0e0e0;
		height: 100%;
		width: 1px;
	}
`;

export const ButtonWrap = styled.div`
	background-color: #ffffff;
	padding: 0px 4px 2px 4px;
	border-radius: 0px 0px 4px 4px;
	width: fit-content;
	margin-top: 47px;

	display: flex;
	flex: 1;
	justify-content: flex-end;
	margin-left: auto;

	@media (min-width: 768px) {
		display: none;
	}
`;

export const ServiceWrap = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-right: 12px;
	border-right: 2px solid #f2f2f2;

	@media (max-width: 760px) {
		justify-content: flex-start;
		flex-direction: row;
	}

	& svg {
		width: 25px;
		height: 25px;
	}
`;

export const FlexRow = styled.div`
	display: flex;
	width: 100%;
	color: #828282;
	font-size: 12px;
`;

export const FlexCol = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	font-size: 10px;
	flex: 1;
	padding: 5px 8px 6px 12px;

	@media (max-width: 1350px) {
		padding-left: 10px;
	}

	@media (max-width: 500px) {
		padding-left: 10px;
	}
`;

export const ContainerValues = styled.div`
	color: #000000;
	margin-left: 10px;
	max-width: 200px;
	white-space: nowrap;
	display: flex;
	overflow: hidden;
	text-overflow: ellipsis;

	.moreTruck {
		color: #5936f0;
		text-decoration: underline;
		margin-left: 4px;
	}

	@media (min-width: 1371px) and (max-width: 1416px) {
		max-width: 150px;
	}

	@media (min-width: 1290px) and (max-width: 1370px) {
		max-width: 85px;
	}

	@media (min-width: 1164px) and (max-width: 1291px) {
		max-width: 80px;
	}

	@media (min-width: 760px) and (max-width: 1163px) {
		max-width: 180px;
	}

	@media (max-width: 760px) {
		max-width: 150px;
	}
`;

export const AnimatedContainer = styled.div`
	animation: ${slide} 0.4s linear;
`;

export const RatesCount = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 30px;
`;

export const Count = styled.div`
	color: #000000;
	font-size: 18px;
	font-weight: 700;
	text-align: center;
`;

export const Div = styled.div`
	display: flex;
	align-items: center;
	background: #dfe1ef;
	border-radius: 4px;
	margin: 5px;
	padding: 4px;
	font-size: 10px;
`;

export const Date = styled.div`
	font-size: 10px;
	width: 20%;
	display: flex;
	align-items: center;
	justify-content: center;
	border-right: 2px solid #f2f2f2;
`;

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	width: 100%;
`;

export const ToolTipContent = styled.div`
	font-size: 12px;
	padding: 5px;

	border-bottom: 1px solid black;
`;
export const ButtonStyled = styled.button`
	border-radius: 4px;
	border: none;
	background: transparent;
	cursor: pointer;
	padding-left: 12px;
	font-size: 14px;
	display: flex;
	align-items: center;
	outline: none;
	border-left: 2px solid #f2f2f2;
	&:hover {
		font-weight: bold;
	}
	&:focus-visible {
		outline: auto blue;
	}
`;

export const ServiceTypeText = styled.div`
	font-size: 10px;
	color: #8fbdb1;
	margin-top: 2px;
`;

export const ContentContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

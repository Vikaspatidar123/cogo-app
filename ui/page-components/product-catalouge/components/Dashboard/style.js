// import styled from '@cogoport/front/styled';

// export const Container = styled.div`
// 	background: #f9fafc;
// 	padding: 5px;
// `;

// export const Revenue = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: center;
// 	align-items: center;
// 	margin-top: 40px;

// 	.amount {
// 		font-size: 35px;
// 		text-align: center;
// 		margin-bottom: 10px;
// 	}
// 	.footer {
// 		display: flex;
// 		justify-content: center;
// 		align-items: center;
// 		gap: 2px;
// 	}
// 	.arrow {
// 		transform: rotate(-40deg);
// 	}
// 	.month {
// 		margin-left: 6px;
// 		font-size: 10px;
// 		border-bottom: 2px dotted #f68b21;
// 	}
// 	@media (max-width: 760px) {
// 		margin-top: 15px;
// 	}
// `;
// export const Title = styled.div`
// 	font-weight: 300;

// 	&.mainHeading {
// 		font-size: 17px;
// 	}
// `;

// export const Card = styled.div`
// 	background: #fff;
// 	border-radius: 6px;
// 	position: relative;
// 	padding: 14px 15px;
// 	margin-bottom: 20px;
// 	box-shadow: 0px 5px 20px 0px #0000000d;

// 	.head {
// 		margin-top: 10px;
// 	}

// 	.loader {
// 		width: 48px;
// 		height: 48px;
// 		border-radius: 50%;
// 		display: inline-block;
// 		position: relative;
// 		border: 3px solid;
// 		margin: 70px 0px 0px 130px;
// 		border-color: #fff #fff transparent transparent;
// 		box-sizing: border-box;
// 		animation: rotation 1s linear infinite;
// 	}
// 	.loader::after,
// 	.loader::before {
// 		content: '';
// 		box-sizing: border-box;
// 		position: absolute;
// 		left: 0;
// 		right: 0;
// 		top: 0;
// 		bottom: 0;
// 		margin: auto;
// 		border: 3px solid;
// 		border-color: transparent transparent #ff3d00 #ff3d00;
// 		width: 40px;
// 		height: 40px;
// 		border-radius: 50%;
// 		box-sizing: border-box;
// 		animation: rotationBack 0.5s linear infinite;
// 		transform-origin: center center;
// 	}
// 	.loader::before {
// 		width: 32px;
// 		height: 32px;
// 		border-color: #fff #fff transparent transparent;
// 		animation: rotation 1.5s linear infinite;
// 	}

// 	@keyframes rotation {
// 		0% {
// 			transform: rotate(0deg);
// 		}
// 		100% {
// 			transform: rotate(360deg);
// 		}
// 	}
// 	@keyframes rotationBack {
// 		0% {
// 			transform: rotate(0deg);
// 		}
// 		100% {
// 			transform: rotate(-360deg);
// 		}
// 	}
// `;

// export const Bar = styled.div`
// 	position: absolute;
// 	top: 0px;
// 	left: 0px;
// 	width: 100%;
// 	height: 4px;
// 	background: #fada03;
// 	border-radius: 6px 6px 0 0;
// `;

// export const Row = styled.div`
// 	display: flex;
// 	justify-content: space-between;
// 	align-items: center;

// 	.icon {
// 		padding: 4px 15px;
// 		border: 0.5px solid #aeaeae;
// 		border-radius: 6px;
// 	}
// `;

// export const SelectDiv = styled.div`
// 	.core-ui-select__control {
// 		min-height: 25px;
// 		font-size: 12px;
// 	}

// 	.core-ui-select__control {
// 		width: 125px;
// 		border: none !important;
// 		float: right;
// 		box-shadow: none;
// 		color: #f68b21;

// 		.core-ui-select__single-value {
// 			border: none;
// 			color: #f68b21 !important;
// 		}

// 		&:hover {
// 			border: none;
// 		}

// 		&:focus-within {
// 			border: none !important;
// 			box-shadow: none !important;
// 		}

// 		.core-ui-select__control--is-focused {
// 			border: none !important;
// 			outline: none;
// 			box-shadow: none;
// 		}

// 		.core-ui-select__menu {
// 			max-width: 100px !important;
// 			min-width: 0px !important;
// 		}
// 	}
// 	.core-ui-select__menu {
// 		max-width: 100px !important;
// 		min-width: 0px !important;
// 	}

// 	.core-ui-select__indicators {
// 		margin: 6px 0;
// 		padding-left: 6px;
// 		border-left: 1px dashed #333;
// 	}

// 	.core-ui-select__value-container {
// 		padding-right: 0;
// 	}

// 	.core-ui-select__control {
// 		border-radius: 10px;
// 	}
// `;

// export const BorderLine = styled.div`
// 	border: 1px solid #f68b21;
// 	width: 95px;
// 	position: absolute;
// 	right: 10%;
// 	margin-top: 35px;
// `;

// export const SideContainer = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	border: 1px solid #14cf27;
// 	background: #f7faef;
// 	color: #14cf27;
// 	padding: 0px 3px 0px;
// 	position: absolute;
// 	right: 6%;
// 	font-size: 10px;
// `;

// export const BarGraphContainer = styled.div`
// 	display: flex;
// 	width: 100%;
// 	cursor: pointer;

// 	.top {
// 		width: 100%;
// 		margin-top: 10px;
// 	}

// 	.head {
// 		display: flex;
// 		margin-bottom: 15px;
// 	}

// 	.name {
// 		width: 100px;
// 		font-size: 13px;
// 		color: #65677a;
// 	}
// `;

// export const EmptyIcon = styled.div`
// 	svg {
// 		height: 100px;
// 	}
// 	div {
// 		max-width: none;
// 	}
// `;

// export const SubContainer = styled.div`
// 	position: absolute;
// 	top: 79px;
// 	padding: 0px 80px;
// `;

// export const BarGraph = styled.div`
// 	width: 180px;
// 	height: 5px;
// 	background: #e0e0e0;
// 	border-radius: 10px;
// 	margin: 6px 0px;
// `;

// export const GraphData = styled.div`
// 	height: 5px;
// 	background: ${({ active }) => active};
// 	width: ${(props) => props.percent}%;
// 	border-radius: 10px;
// 	animation: fill-bar 3s;

// 	@keyframes fill-bar {
// 		from {
// 			width: 0%;
// 		}
// 		to {
// 			width: 100%;
// 		}
// 	}
// `;

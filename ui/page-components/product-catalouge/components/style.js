// import styled from '@cogoport/front/styled';
// import Button from '@cogoport/front/components/admin/Button';
// import { IcMPlus } from '@cogoport/icons-react';
// import Loading from '../assets/loading.svg';

// export const Container = styled.div`
// 	display: flex;
// 	flex-direction: ${({ direction }) => direction || 'row'};

// 	@media (max-width: 760px) {
// 		background: #ffffff !important;
// 	}
// `;

// export const WidthDiv = styled.div`
// 	width: ${({ width }) => width || '70px'};
// `;

// export const Section = styled.div`
// 	width: 30%;
// 	width: ${({ width }) => width || '30'};
// `;

// export const Heading = styled.div`
// 	@media (min-width: 768px) {
// 		display: flex;
// 		justify-content: space-between;
// 		margin: 25px 10px;
// 	}

// 	.flex {
// 		display: flex;
// 		cursor: pointer;

// 		@media (max-width: 760px) {
// 			float: right;
// 			margin-top: 10px;
// 		}
// 	}
// `;
// export const TitleDiv = styled.div``;

// export const StyledButton = styled(Button)`
// 	background: #221f20;
// 	border-radius: 4px;
// 	margin: 0 12px;
// 	text-transform: capitalize !important;
// 	height: 32px;
// 	width: 106px;
// `;

// export const SubTitle = styled.div`
// 	font-weight: 500;
// 	font-size: 14px;
// 	color: #333333;
// `;

// export const StyledLoading = styled(Loading)`
// 	height: 100px !important;
// `;

// export const StyledDiv = styled.div`
// 	.ui-tabs {
// 		background: #ffffff !important;
// 		justify-content: flex-start;
// 	}
// 	.ui-tabs-list {
// 		gap: 10px;
// 		padding: 10px 0 !important;

// 		.ui-tabs-list-container {
// 			display: block !important;
// 			margin: 0 10px !important;
// 			background: #fff !important;
// 			padding: 10px !important;
// 			box-shadow: 0px 0px 7px 1px #dde0e0 !important;
// 			border: none !important;
// 			height: 100px !important;
// 			border-radius: 10px !important;
// 			transition: none;
// 			text-overflow: ellipsis;
// 			white-space: pre-wrap;
// 			max-width: 165px;

// 			@media (max-width: 760px) {
// 				width: 148px;
// 			}
// 		}

// 		.ui-tabs-list-container:hover {
// 			border: 1px solid #d5483a !important;
// 			svg::after {
// 				visibility: hidden !important;
// 			}
// 		}
// 		.active p {
// 			transition: none !important;
// 			border: none !important;
// 		}
// 		.active {
// 			border: 1px solid #d5483a !important;
// 			background-color: #fffbfb !important;
// 		}
// 	}
// 	.ui-tabs-list.horizontal {
// 		@media (max-width: 760px) {
// 			flex-wrap: wrap;
// 			display: flex;
// 			flex-direction: row;
// 			justify-content: space-between;
// 		}
// 	}
// `;

// export const StyledTabHeading = styled.div`
// 	font-size: 12px;
// 	color: #6b6d81;
// 	width: 100%;
// 	height: 100%;
// `;

// export const ColoredIcon = styled.div`
// 	padding-bottom: 5px;
// `;

// export const ScrollContent = styled.div`
// 	@media (min-width: 768px) {
// 		background: #ffffff;
// 		box-shadow: 0px 6px 60px rgba(71, 111, 211, 0.15),
// 			0px 2.2px 18.612px rgba(71, 111, 211, 0.1);
// 		border-radius: 10px;
// 		padding: 20px;
// 		max-width: 100%;
// 		overflow-x: auto;
// 		margin: 20px 10px 10px 0px;

// 		.scroll {
// 			display: flex;
// 			justify-content: space-between;
// 			align-items: center;
// 		}
// 	}

// 	@media (max-width: 760px) {
// 		margin-top: 60px;
// 		display: flex;
// 		flex-direction: column;
// 	}
// `;

// export const TabDiv = styled.div`
// 	.ui-tabs-list.horizontal.two {
// 		border-bottom: none;
// 	}

// 	.ui-tabs-list-title.horizontal.two.active {
// 		color: #221f20 !important;
// 	}
// 	.ui-tabs-list-title.horizontal.two {
// 		color: 65677a !important;
// 	}
// 	.ui-tabs-list-badge {
// 		background: #ee3425 !important;
// 		border-radius: 4px !important;
// 		color: #ffffff !important;
// 	}
// `;
// export const Label = styled.div`
// 	font-weight: 500;
// 	font-size: 12px;
// 	color: #6b6d81;
// `;

// export const TotalRecords = styled.div`
// 	width: fit-content;
// 	height: fit-content;
// 	background: #ee3425;
// 	border-radius: 4px;
// 	color: #ffffff;
// 	padding: 0px 6px;
// 	margin: 1px 10px;
// `;

// export const TabHeader = styled.div`
// 	display: flex;
// 	flex-direction: row;

// 	svg {
// 		margin: 3px 5px;
// 	}
// `;

// export const BorderBottom = styled.div`
// 	border: 1.75px solid #fada03;
// 	background-color: #fada03;
// 	width: 155px;
// 	height: 1px;
// 	margin: 5px 0px 15px;
// `;

// export const TitleStyled = styled.div`
// 	font-family: 'Poppins';
// 	font-style: normal;
// 	font-weight: 600;
// 	font-size: 14px;
// 	line-height: 150%;
// 	text-align: center;
// `;

// export const ProductAnalyticsTabCtn = styled.div`
// 	width: 100%;
// 	background: #eceff8;

// 	.ui-tabs-list {
// 		justify-content: space-around;
// 		margin-bottom: 0px !important;

// 		.ui-tabs-list-container {
// 			.ui-tabs-list-title {
// 				color: #000 !important;
// 			}

// 			padding: 20px 50px 20px 50px !important;

// 			p {
// 				font-size: 16px !important;
// 				font-weight: 600 !important;
// 			}
// 		}

// 		.ui-tabs-list-container.active {
// 			border-bottom: 2px solid red !important;

// 			.ui-tabs-list-title {
// 				color: red !important;
// 			}
// 		}`;

// export const IcnContainer = styled.div`
// 	cursor: pointer;
// 	.animatedArrow {
// 		position: absolute;
// 	}
// 	.animatedArrow:hover {
// 		animation: bounceAlpha 0.8s linear infinite;
// 		animation-direction: normal;

// 		@keyframes bounceAlpha {
// 			0% {
// 				opacity: 1;
// 				transform: translateX(0px) scale(1);
// 			}
// 			100% {
// 				opacity: 0;
// 				transform: translateX(10px) scale(0.9);
// 			}
// 		}
// 	}
// `;

// export const ScrollContainer = styled.div`
// 	overflow: scroll;
// 	scroll-behavior: smooth;
// 	display: flex;
// 	flex-direction: row;
// 	width: 97%;

// 	::-webkit-scrollbar {
// 		display: none;
// 	}
// `;

// export const TitleSection = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: space-between;
// 	align-items: flex-start;
// 	.title {
// 		margin: 0;

// 		@media (max-width: 760px) {
// 			margin-top: 30px;
// 			width: max-content;
// 		}
// 	}
// 	.flex {
// 		display: flex;
// 		flex-direction: row;
// 	}
// `;

// export const LineWrapper = styled.div`
// 	display: flex;
// 	justify-content: flex-start;
// 	width: 81%;
// 	align-items: center;
// `;

// export const Line = styled.hr`
// 	height: 3px;
// 	border-width: 0;
// 	background-color: #f68b21;
// 	flex-grow: 1;
// `;

// export const Back = styled.div`
// 	display: flex;
// 	cursor: pointer;
// 	position: absolute;
// 	top: 162px;

// 	.archived {
// 		display: flex;
// 		margin-bottom: 10px;
// 	}

// 	.back {
// 		margin: 0px 5px;
// 		color: #221f20;
// 	}
// `;

// export const IconButton = styled.div`
// 	margin: 3px 4px 0px 14px;
// `;

// export const PlusIcon = styled(IcMPlus)`
// 	transform: rotate(90deg);
// `;

// export const StyledFilterSection = styled.div`
// 	@media screen and (max-width: 767px) {
// 		bottom: 10px;
// 		right: 20px;
// 		position: fixed;
// 		z-index: 2;

// 		.btn {
// 			cursor: pointer;
// 			border: none;
// 			background: #db4634;
// 			box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
// 			border-radius: 90px;

// 			svg {
// 				vertical-align: middle;
// 			}
// 		}

// 		.core-ui-button-root {
// 			background: transparent;
// 			border: none;
// 			border-radius: 50%;
// 			color: #2c3e50;
// 			animation: pulse 1.6s ease infinite;
// 			@keyframes pulse {
// 				0% {
// 					box-shadow: 0 0 0 0 rgba(14, 104, 194, 0.4);
// 				}
// 				70% {
// 					box-shadow: 0 0 0 10px rgba(14, 104, 194, 0);
// 				}
// 				100% {
// 					box-shadow: 0 0 0 0 rgba(14, 104, 194, 0);
// 				}
// 			}
// 			@keyframes pulse-ring {
// 				0% {
// 					transform: scale(0.33);
// 				}
// 				80%,
// 				100% {
// 					opacity: 0;
// 				}
// 			}
// 			@keyframes pulse-dot {
// 				0% {
// 					transform: scale(0.8);
// 				}
// 				50% {
// 					transform: scale(1);
// 				}
// 				100% {
// 					transform: scale(0.8);
// 				}
// 			}
// 		}
// 	}
// `;

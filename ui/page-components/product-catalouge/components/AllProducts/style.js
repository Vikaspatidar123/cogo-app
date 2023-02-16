// import styled from '@cogoport/front/styled';
// import { IcMOverflowDot } from '@cogoport/icons-react';

// export const CardDiv = styled.div`
// 	display: flex;
// 	justify-content: ${({ justify }) => justify || ''};
// 	flex-wrap: wrap;
// 	gap: 18px;
// `;

// export const Card = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: space-between;
// 	border: 1px solid #e0e6e9;
// 	border-radius: 6px;
// 	padding: 10px 16px;
// 	width: 31%;

// 	@media (max-width: 760px) {
// 		width: 300px;
// 	}

// 	:hover {
// 		cursor: pointer;
// 		border: 0.5px solid #ee3425;
// 		box-shadow: 0px 0px 20px #e0e6e9;
// 		border-radius: 9px;
// 	}
// `;

// export const Row = styled.div`
// 	display: flex;
// 	justify-content: space-between;
// 	svg {
// 		width: 20px;
// 	}
// 	&.second {
// 		margin-bottom: 15px;
// 	}
// `;

// export const Text = styled.div`
// 	font-size: 13px;
// 	color: #65677a;

// 	&.subCategory {
// 		border-bottom: 1px dashed #f68b21;
// 	}

// 	&.product {
// 		font-weight: 500;
// 		font-size: 14px;
// 		color: #221f20;
// 	}
// `;

// export const Icon = styled(IcMOverflowDot)`
// 	cursor: pointer;
// 	transform: rotate(90deg);
// `;

// export const Info = styled.div`
// 	background: #fff;
// 	width: 90px;
// 	cursor: pointer;
// 	.text {
// 		margin: 0px;
// 		display: flex;
// 		align-items: center;
// 		padding: 7px 5px;
// 		text-align: left;
// 		font-size: 14px;
// 	}
// 	.text p {
// 		margin: 0;
// 		font-size: 10px;
// 		margin-left: 10px;
// 	}
// 	.edit {
// 		border-bottom: 1px solid #d3d3d3;
// 	}
// 	.info {
// 		display: flex;
// 	}
// `;

// export const PageContainer = styled.div`
// 	.pagination {
// 		float: right;
// 		display: flex;
// 		justify-content: center;
// 		color: black;
// 		.paginationContainer {
// 			margin: 10px !important;
// 		}

// 		.page,
// 		.break {
// 			border: none !important;
// 			background: transparent !important;
// 			font-weight: 500 !important;
// 		}

// 		.selected {
// 			background: #fef3e9 !important;
// 			color: black;
// 		}

// 		.next,
// 		.previous {
// 			background: transparent !important;
// 			border: none !important;

// 			svg {
// 				stroke-width: 0.5px;
// 				stroke: #333;
// 			}

// 			svg path {
// 				fill: #333;
// 			}
// 		}

// 		.disabled {
// 			cursor: not-allowed;
// 			svg {
// 				stroke-width: 0.5px;
// 				stroke: #9a9ea5;
// 			}

// 			svg path {
// 				fill: #9a9ea5;
// 			}
// 		}
// 	}

// 	@media (max-width: 767px) {
// 		.pagination {
// 			margin-top: 45px;
// 			width: -webkit-fill-available;
// 		}
// 	}
// `;

// export const Loader = styled.div`
// 	.loader {
// 		position: relative;
// 		font-size: 48px;
// 		letter-spacing: 2px;
// 	}
// 	.loader:before {
// 		content: 'Loading';
// 		color: #fff;
// 	}
// 	.loader:after {
// 		content: '';
// 		width: 20px;
// 		height: 20px;
// 		background-color: #ff3d00;
// 		border-radius: 50%;
// 		position: absolute;
// 		inset: 0;
// 		margin: auto;
// 		top: -70px;
// 		animation: motion 3s ease-in-out infinite;
// 	}

// 	@keyframes motion {
// 		0%,
// 		50%,
// 		100% {
// 			transform: translateX(0) scale(1);
// 		}
// 		25% {
// 			transform: translateX(-100px) scale(0.3);
// 		}
// 		75% {
// 			transform: translateX(100px) scale(0.3);
// 		}
// 	}
// `;

// export const DisplayName = styled.div`
// 	margin: 3px 45px 0px 0px;
// `;

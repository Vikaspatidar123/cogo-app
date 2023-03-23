import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
`;

export const MoreBtn = styled.button`
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	text-decoration-line: underline;
	border: none;
	background: transparent;
	margin: 0 auto;
	color: #5936f0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const TouchPointName = styled.div`
	background-color: #e8e2ff;
	border-radius: 4px;
	font-size: 10px;
	color: #333333;
	padding: 4px;
	margin: 8px 0;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

export const Name = styled.div`
	color: #5936f0;
`;

export const TouchPointContainer = styled.div`
	padding: 8px 8px 8px 16px;
	position: relative;

	.circle {
		position: absolute;
		top: 12px;
		left: 4px;
		width: 8px;
		height: 8px;
		background: #5936f0;
		border-radius: 50%;
		z-index: 1;
	}

	.line {
		position: absolute;
		top: 12px;
		left: 7.5px;
		height: 100%;
		border: 0.5px dashed #5936f0;
		z-index: 0;
	}
`;

export const Wrapper = styled.div`
	margin-top: 0px;

	.round {
		color: #a8acce;
	}
`;

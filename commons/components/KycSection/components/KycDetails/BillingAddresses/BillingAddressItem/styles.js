import styled from '@cogoport/front/styled';

export const Container = styled.div`
	padding: 10px 15px;
	border-radius: 8px;
	display: flex;
	background-color: #f2f2f2;

	margin-bottom: ${(props) => `${props.marginBottom}px`};

	@media (max-width: 768px) {
		padding: 12px;
		margin-top: 12px;
	}
`;

export const ButtonGroup = styled.div`
	position: absolute;
	top: 16px;
	right: 16px;
	display: flex;
	flex-direction: row;
	gap: 8px;
	& .svg-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		& svg {
			cursor: pointer;
			width: 16px;
			height: 16px;
		}
	}

	& .separator {
		border: 0.5px solid #4f4f4f;
	}
`;

export const IndexContainer = styled.div`
	width: 20px;
`;

export const Index = styled.div`
	background: #e0e0e0;
	width: 20px;
	height: 20px;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
`;

export const AddressContainer = styled.div`
	font-size: 12px;
	line-height: 16px;
	margin: 0 32px 0 16px;
	width: 100%;

	.gst-number {
		margin-top: 16px;
	}

	@media (max-width: 768px) {
		margin: 0 0 0 12px;
	}
`;

export const DocContainer = styled.div`
	background: #ffffff;
	border: 1px solid #e0e0e0;
	border-radius: 4px;
	padding: 8px 20px 6px 20px;
	margin: 8px 0;
	display: flex;
	justify-content: space-between;
`;

export const DocText = styled.div`
	font-weight: 400;
	font-size: 12px;
`;

export const LinkText = styled.div`
	font-weight: 500;
	font-size: 10px;
	color: #034afd;
	text-decoration-line: underline;
	cursor: pointer;
`;

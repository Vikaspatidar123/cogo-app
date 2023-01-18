import styled from '@cogoport/front/styled';

export const Container = styled.a`
	padding: 12px 16px;
	margin: 0 -17px;
	border-radius: 4px;

	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	cursor: pointer;

	&:hover {
		.partner-name {
			text-decoration: underline;
		}
	}

	${({ disabled }) =>
		!disabled
			? ''
			: `
		background: #f5fafe;
		cursor: not-allowed;

		&:hover {
			.partner-name {
				text-decoration: none;
			}
		}
	`}

	.core-ui-avatar-root {
		width: 32px;
		height: 32px;
	}

	.core-ui-avatar-text {
		font-size: 16px;
	}
`;

export const Name = styled.div`
	width: 140px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;

	color: #4f4f4f;
	font-size: 12px;
	font-weight: 500;
`;

export const Main = styled.div`
	display: flex;
	flex-direction: row;
`;

export const Type = styled.div`
	color: #4f4f4f;
	font-size: 9px;
	font-weight: 400;
`;

export const PartnerDetails = styled.div`
	margin-left: 8px;
`;

import { IcMStar, IcCStar } from '@cogoport/icons-react';
import styled from '@cogoport/front/styled';

export const AddBookmarkIcn = styled(IcCStar)`
	width: 22px;
	height: 22px;
	cursor: pointer;
	path:last-child {
		fill: #ffce75;
	}
	@media (max-width: 768px) {
		width: 12px;
		height: 12px;
	}
`;

export const RemoveBookmarkIcn = styled(IcMStar)`
	width: 22px;
	height: 22px;
	cursor: pointer;
	@media (max-width: 768px) {
		width: 12px;
		height: 12px;
	}
`;

export const Container = styled.div`
	margin-left: 12px;

	svg {
		vertical-align: text-bottom;
	}
`;

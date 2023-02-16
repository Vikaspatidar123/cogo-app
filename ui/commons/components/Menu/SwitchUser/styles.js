import styled from '@cogoport/front/styled';
import animate, { fadeInRight } from '@cogoport/front/animate';
import { Button } from '@cogoport/front/components/admin';

export const Container = styled.div`
	width: 100%;
	background: #fff;
	margin-top: 4px;
`;

export const StyledButton = styled(Button)`
	background: #2c3e50 !important;
	text-transform: capitalize;
`;

export const Header = styled.div`
	padding: 4px 4px 12px;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const Separator = styled.div`
	width: 100%;
	border: 1px solid #f2f2f2;

	margin: 0;
`;

export const List = styled.div`
	padding: 8px 20px 8px 8px;

	max-height: 500px;
	overflow-y: auto;
`;

export const FadeOutScale = animate({
	enter: {
		...fadeInRight,
		easing: 'easeInOutQuad',
		translateX: [15, 0],
		opacity: [0.25, 1],
	},
});

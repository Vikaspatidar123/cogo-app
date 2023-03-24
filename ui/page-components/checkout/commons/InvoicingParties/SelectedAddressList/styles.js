import animate, { fadeIn } from '@cogoport/front/animate';
import styled from '@cogoport/front/styled';

export const Container = styled.section`
	border: 1px solid #cddbff;
	border-radius: 4px;
	background-color: #ffffff;

	margin-bottom: ${(props) => props.marginBottom};
`;

export const ContentVisible = styled.div`
	display: flex;
	flex-direction: column;

	padding: 16px;
`;

export const HeadingContainer = styled.div`
	margin-bottom: 8px;
`;

export const BillingDetailsContainer = styled.div`
	margin-bottom: 8px;
`;

export const SelectedServicesInvoiceToContainer = styled.div``;

export const FadeIn = animate({
	enter: {
		...fadeIn,
		easing   : 'easeOutCubic',
		duration : 500,
	},
	exit: {
		opacity  : [1, 0],
		easing   : 'easeInCubic',
		duration : 300,
	},
});

export const ContentHidden = styled.div`
	border-top: 1px solid #cddbff;
`;

export const HiddenContentTogglerContainer = styled.div`
	cursor: pointer;

	background-color: #f2f6ff;
	border-radius: 0 0 4px 4px;
	padding: 4px;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	& svg {
		width: 16px;
		height: 8px;

		transform: ${(props) => `rotate(${props.showHiddenContent ? '180deg' : '0deg'});`};
		transition: transform 0.5s;
	}
`;

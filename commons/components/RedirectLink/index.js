import { Container, Label, AnchorLink } from './styles';

function RedirectLink({
	label = '',
	href = '/',
	withPrefix = false,
	linkLabel = '',
}) {
	return (
		<Container>
			<Label>{label}</Label>
			<AnchorLink href={href} withPrefix={withPrefix}>
				{linkLabel}
			</AnchorLink>
		</Container>
	);
}

export default RedirectLink;

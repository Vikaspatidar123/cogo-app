import IconMenu from './menu.svg';
import { Container } from './styles';

function HamBurger({ show = false, setShow = () => {} }) {
	return (
		<Container>
			<IconMenu
				width={25}
				height={25}
				cursor="pointer"
				onClick={() => {
					setShow(!show);
				}}
			/>
		</Container>
	);
}

export default HamBurger;

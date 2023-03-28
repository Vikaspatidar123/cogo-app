import { Container } from './styles';

function ErrorMessage({ message }) {
	return <Container>{message || ''}</Container>;
}

export default ErrorMessage;

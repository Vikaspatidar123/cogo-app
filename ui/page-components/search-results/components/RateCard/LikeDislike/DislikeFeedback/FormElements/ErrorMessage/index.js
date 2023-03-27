import { Container } from './styles';

const ErrorMessage = ({ message }) => {
	return <Container>{message || ''}</Container>;
};

export default ErrorMessage;

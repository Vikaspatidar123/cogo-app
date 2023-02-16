import Archive from '../../../assets/archive.svg';
import {
	IconDiv,
	Heading,
	Text,
	ButtonDiv,
	SecondaryButton,
	PrimaryButton,
	ModalDiv,
	Container,
} from './style';

const ArchiveModal = ({ archive, setArchive, refetchArchive }) => {
	return (
		<ModalDiv show={archive} onClose={() => setArchive(false)}>
			<Container>
				<IconDiv>
					<Archive height={50} width={40} marginBottom={8} />
				</IconDiv>
				<Heading>Are you sure you want to archive this product?</Heading>
				<Text>You can retrive your archived product anytime from the archived tab</Text>
			</Container>
			<ButtonDiv>
				<SecondaryButton onClick={() => setArchive(false)}>No</SecondaryButton>
				<PrimaryButton
					onClick={() => {
						refetchArchive();
					}}
				>
					Yes
				</PrimaryButton>
			</ButtonDiv>
		</ModalDiv>
	);
};

export default ArchiveModal;

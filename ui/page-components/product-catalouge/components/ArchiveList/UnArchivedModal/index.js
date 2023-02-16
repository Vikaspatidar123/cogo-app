import React from 'react';
import Archive from '../../../assets/archive.svg';
import {
	IconDiv,
	Heading,
	Text,
	ButtonDiv,
	SecondaryButton,
	PrimaryButton,
	Container,
} from './styles';

const UnArchiveModal = ({ archive, setArchive, refetchArchive }) => {
	return (
		<Container show={archive} onClose={() => setArchive(false)}>
			<IconDiv>
				<Archive height={50} width={40} marginBottom={8} />
			</IconDiv>
			<Heading>Are you sure you want to UnArchive this product?</Heading>
			<Text>
				You can retrive your Unarchived product anytime from the All Categories tab
			</Text>
			<ButtonDiv>
				<SecondaryButton onClick={() => setArchive(false)}>No</SecondaryButton>
				<PrimaryButton onClick={() => refetchArchive()}>Yes</PrimaryButton>
			</ButtonDiv>
		</Container>
	);
};

export default UnArchiveModal;

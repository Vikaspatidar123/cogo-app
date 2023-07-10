import { IcMDocument, IcMImage } from '@cogoport/icons-react';

const fileIconMapping = {
	document: <IcMDocument height={22} width={22} />,

	img: <IcMImage height={22} width={25} />,
};
const FILE_ICON_MAPPING = {
	jpeg    : fileIconMapping.img,
	jpg     : fileIconMapping.img,
	png     : fileIconMapping.img,
	svg     : fileIconMapping.img,
	mp3     : fileIconMapping.document,
	aac     : fileIconMapping.document,
	mp4     : fileIconMapping.img,
	gif     : fileIconMapping.img,
	default : fileIconMapping.document,
};

const FILE_TYPE_MAPPING = {
	jpeg    : 'image',
	jpg     : 'image',
	png     : 'image',
	svg     : 'image',
	mp3     : 'audio',
	aac     : 'audio',
	mp4     : 'video',
	gif     : 'video',
	default : 'document',
};

function getFileAttributes({ fileName = '', finalUrl }) {
	const splitFileName = fileName.split('.');
	let fileExtension = '';
	let uploadedFileName = '';

	if (splitFileName.length > 1) {
		fileExtension = splitFileName.pop();
		uploadedFileName = splitFileName.join('');
	} else {
		fileExtension = 'document';
		uploadedFileName = fileName;
	}

	const fileType = FILE_TYPE_MAPPING[fileExtension] || FILE_TYPE_MAPPING.default;
	const fileIcon = FILE_ICON_MAPPING[fileExtension] || FILE_ICON_MAPPING.default;

	return {
		uploadedFileName,
		fileIcon,
		fileType,
		finalUrl,
	};
}

export default getFileAttributes;

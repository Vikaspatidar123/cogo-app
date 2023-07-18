import { IcMDocument, IcMImage } from '@cogoport/icons-react';

const FILE_TYPE_ICONS_MAPPING = {
	document : <IcMDocument height={22} width={22} />,
	img      : <IcMImage height={22} width={25} />,
};

const { img, document } = FILE_TYPE_ICONS_MAPPING;

const FILE_TYPE_ICON_MAPPING = {
	image : img,
	audio : document,
	video : img,
	document,
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
	let fileExtension = 'document';
	let uploadedFileName = fileName;

	if (splitFileName.length > 1) {
		fileExtension = splitFileName.pop();
		uploadedFileName = splitFileName.join('');
	}

	const fileType = FILE_TYPE_MAPPING[fileExtension] || FILE_TYPE_MAPPING.default;

	const fileIcon = FILE_TYPE_ICON_MAPPING[fileType] || FILE_TYPE_ICON_MAPPING.default;

	return {
		uploadedFileName,
		fileIcon,
		fileType,
		finalUrl,
	};
}

export default getFileAttributes;

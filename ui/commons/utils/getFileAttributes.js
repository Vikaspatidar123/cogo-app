import { IcMDocument, IcMImage } from '@cogoport/icons-react';

const FILE_ICON_MAPPING = {
	document : <IcMDocument height={22} width={22} />,
	img      : <IcMImage height={22} width={25} />,
};

const fileTypeMapping = {
	image : ['jpeg', 'jpg', 'png', 'svg'],
	audio : ['mp3', 'aac'],
	video : ['mp4', 'gif'],
};

let fileIcon = null;
let fileExtension = '';
let uploadedFileName = '';
let fileType = '';

function getFileAttributes({ fileName = '', finalUrl }) {
	const splitFileName = fileName.split('.');

	if (splitFileName.length > 1) {
		fileExtension = splitFileName.pop();
		uploadedFileName = splitFileName.join('');
	} else {
		fileExtension = 'document';
		uploadedFileName = fileName;
	}

	if (fileTypeMapping.image.includes(fileExtension)) {
		fileIcon = FILE_ICON_MAPPING.img;
		fileType = 'image';
	} else if (fileTypeMapping.audio.includes(fileExtension)) {
		fileIcon = FILE_ICON_MAPPING.pdf;
		fileType = 'audio';
	} else if (fileTypeMapping.video.includes(fileExtension)) {
		fileIcon = FILE_ICON_MAPPING.img;
		fileType = 'video';
	} else {
		fileIcon = FILE_ICON_MAPPING.document;
		fileType = 'document';
	}

	return {
		uploadedFileName,
		fileIcon,
		fileType,
		finalUrl,
	};
}

export default getFileAttributes;

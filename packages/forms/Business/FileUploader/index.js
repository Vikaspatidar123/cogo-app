import { Upload, Toast } from '@cogoport/components';
import { IcMDocument } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import GLOBAL_CONSTANTS from '../../../../ui/commons/constants/globals';
import { publicRequest, request } from '../../../request';

import styles from './styles.module.css';

const MAX_FILE_SIZE = GLOBAL_CONSTANTS.DEFAULT_FILE_SIZE;

const checkFileUploadSize = ({ fileInfo, maxSizeInByte }) => {
	const defaultMaxSize = maxSizeInByte < MAX_FILE_SIZE ? maxSizeInByte : MAX_FILE_SIZE;
	const validFileSize = fileInfo.map((val) => val.size > +defaultMaxSize);

	if (!validFileSize.includes(true)) return true;

	const sizeInMb = (defaultMaxSize / GLOBAL_CONSTANTS.ONE_MB_IN_BYTE).toFixed(2);
	Toast.error(`File Upload failed, Maximum size allowed - ${sizeInMb} MB`);

	return false;
};

function FileUploader(props) {
	const {
		onChange = () => {},
		showProgress,
		multiple = false,
		docName,
		accept,
		maxSizeInByte = MAX_FILE_SIZE,
		...rest
	} = props;

	const [fileName, setFileName] = useState(null); // remove
	const [loading, setLoading] = useState(true); // remove
	const [urlStore, setUrlStore] = useState([]);
	const [progress, setProgress] = useState({});

	useEffect(() => {
		if (multiple) {
			onChange(urlStore);
		} else {
			onChange(urlStore[0]);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [multiple, urlStore]);

	const onUploadProgress = (index) => (file) => {
		setProgress((previousProgress) => ({
			...previousProgress,
			[`${index}`]: (() => {
				const { loaded, total } = file;
				const percentCompleted = Math.floor((loaded * 100) / total);

				return percentCompleted;
			})(),
		}));
	};

	const uploadFile = (index) => async (file) => {
		const { data } = await request({
			method : 'GET',
			url    : '/get_media_upload_url',
			params : {
				file_name: file.name,
			},
		});

		const { url, headers } = data;

		await publicRequest({
			url,
			data    : file,
			method  : 'PUT',
			headers : {
				...headers,
				'Content-Type': file.type,
			},
			onUploadProgress: onUploadProgress(index),
		});

		const finalUrl = url.split('?')[0];

		return finalUrl;
	};

	const handleChange = async (values) => {
		const isValidFileSize = checkFileUploadSize({ fileInfo: values, maxSizeInByte });
		if (!isValidFileSize) return;

		try {
			setLoading(true);

			if (!isEmpty(values)) {
				setProgress({});

				const promises = values.map((value, index) => uploadFile(index)(value));

				const allUrls = await Promise.all(promises);
				setUrlStore(allUrls);
				setFileName(values);
			}
		} catch (error) {
			Toast.error('File Upload failed.......');
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Upload
				{...rest}
				value={fileName}
				multiple={multiple}
				onChange={handleChange}
				loading={loading}
				multipleUploadDesc="Upload files"
				fileData={urlStore}
				className={styles.upload}
				accept={accept}
			/>

			{loading
        && !isEmpty(progress)
        && Object.keys(progress).map((key) => (
	<div className={styles.progress_container}>
		<IcMDocument
			style={{ height: '30', width: '30', color: '#2C3E50' }}
		/>
		<div>
			<div className={styles.file_name}>
				{`File uploading (${progress[key]}%)...`}
			</div>
			<div className={styles.progress_bar}>
				<div
					className={styles.progress}
					style={{ width: `${progress[key]}%` }}
				/>
			</div>
		</div>
	</div>
        ))}
		</>
	);
}

export default FileUploader;

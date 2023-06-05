import { Toast } from '@cogoport/components';
import { format } from '@cogoport/utils';
import React, {
	useImperativeHandle,
	forwardRef,
	useState,
	useEffect,
} from 'react';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

const File = getField('file');

function ChildBlocks({ id, mainData, blocks, setBlocks }, ref) {
	const [showActions, setShowActions] = useState(false);

	const removeBlock = () => {
		const objectIs = blocks.find((obj) => obj.id === id);
		const isOld = objectIs?.mainData?.id !== undefined;
		const newBlocks = blocks;
		if (isOld) {
			const data = newBlocks.find((obj) => obj.id === id);
			if (data.mainData.status === 'active') {
				data.mainData.status = 'inactive';
			} else {
				data.mainData.status = 'active';
			}

			setBlocks([...newBlocks]);
		} else {
			const exceptBlock = blocks.filter((obj) => obj.id !== id);
			setBlocks(exceptBlock);
		}
	};

	useEffect(() => {
		const textarea = document.getElementById(`textarea${id}`);
		const scHeight = textarea.scrollHeight;
		textarea.style.height = `${scHeight}px`;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleTextArea = (e) => {
		const scHeight = e.target.scrollHeight;
		if (e) {
			e.target.style.height = `${scHeight}px`;
		}
	};

	const handleChange = (e) => {
		const newBlocks = blocks;
		const row = newBlocks.find((obj) => obj.id === id);
		row.mainData.instruction = e.target.value;
		setBlocks([...newBlocks]);
	};

	const getFileName = (url) => {
		const values = url?.split('/');
		const lastVal = values[values.length - 1];
		const words = lastVal.split('%');
		let filename = '';
		words.forEach((word) => {
			filename += word;
		});
		return filename;
	};

	const fileControl = [
		{
			name        : 'file',
			type        : 'file',
			placeholder : '  ',
			uploadText  : 'Attach',
			uploadIcon  : 'upload-attach',
			uploadType  : 'aws',
			multiple    : true,
		},
	];
	const { control, handleSubmit } = useForm();

	const getFileValue = async () => {
		const fileValue = {};
		fileValue.id = id;
		await handleSubmit(
			(val) => {
				fileValue.file = val;
			},
			(err) => {
				Toast.error(err);
			},
		)();

		return { fileValue };
	};

	useImperativeHandle(ref, () => ({ getFileValue }));

	return (
		<li style={{ fontSize: '10px' }}>
			<div>
				<div className={styles.sop_line_item}>
					<div
						role="presentation"
						className={styles.input_container}
						onMouseDown={() => setShowActions(true)}
					>
						<textarea
							onKeyUp={(e) => handleTextArea(e)}
							onChange={(e) => handleChange(e)}
							className="text_area"
							id={`textarea${id}`}
							placeholder="Start typing to add SOP"
							name="instruction"
							style={{
								textDecoration:
									mainData.status === 'inactive' && mainData.id
										? 'line-through'
										: null,
								width: showActions ? '90%' : '70%',
							}}
							value={mainData?.instruction}
						/>

						{mainData?.id ? (
							<div className={styles.heading_edit_child}>
								{mainData?.status === 'inactive'
									? `Deleted at ${format(mainData?.updated_at, 'dd MMM yyyy')} 
									by ${mainData?.last_updated_by?.name}`
									: `Last Edited by ${format(mainData?.updated_at, 'dd MMM yyyy')}`}
							</div>
						) : null}
					</div>

					{showActions ? (
						<span
							role="presentation"
							className={styles.remove_icon_container}
							onClick={() => removeBlock()}
						>
							x
						</span>
					) : null}
				</div>

				{showActions ? (
					<div className={styles.attach}>
						<File {...fileControl[0]} control={control} />
					</div>
				) : null}
			</div>

			<div className={styles.links_container}>
				{(mainData?.url_links || []).map((url) => (
					<div className={styles.link}>
						<div className={styles.file_name}>{getFileName(url)}</div>

						{url ? (
							<>
								<div
									role="presentation"
									className={styles.view_file}
									onClick={() => window.open(url, '_blank')}
								>
									View
								</div>

								<div
									role="presentation"
									className={styles.download_file}
									onClick={() => window.open(url, '_blank')}
								>
									Download
								</div>
							</>
						) : null}
					</div>
				))}
			</div>
		</li>
	);
}

export default forwardRef(ChildBlocks);

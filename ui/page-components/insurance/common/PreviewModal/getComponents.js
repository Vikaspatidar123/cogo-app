import { Tooltip, Avatar } from '@cogoport/components';
import { IcMFsea } from '@cogoport/icons-react';

import styles from './styles.module.css';

const getComponents = () => {
	function SectionTitle({ title }) {
		return				(
			<div className={styles.details_header}>
				<div className={styles.left_line_div} />
				<div className={styles.dot_div} />
				<div className={styles.text_div}>{title}</div>
				<div className={styles.dot_div} />
				<div className={styles.right_line_div} />
			</div>
		);
	}

	function HeaderTitle({ transitMode }) {
		return (
			<div className={styles.heading}>
				<IcMFsea width={20} height={20} />
				<div className={styles.heading_text}>
					{transitMode}
					{' '}
					INSURANCE
				</div>
			</div>
		);
	}

	function DetailsContainer({
		label, labelClassName = 'label', value, valueClassName = 'value', className = 'name',
		tooltip = false,
	}) {
		return (
			<div className={styles[className]}>
				<div className={styles[labelClassName]}>{label}</div>
				{tooltip ? (
					<Tooltip content={value} placement="top">
						<div className={styles[valueClassName]}>{value}</div>
					</Tooltip>
				) : <div className={styles[valueClassName]}>{value}</div>}
			</div>
		);
	}

	function AvatarComponent({ name }) {
		return (
			<div className={styles.name_div}>
				<div className={styles.left_line} />
				<div className={styles.content}>
					<Avatar personName={name} size="35px" />
					<div className={styles.avatar_name}>{name}</div>
				</div>
				<div className={styles.right_line} />
			</div>
		);
	}

	return { DetailsContainer, HeaderTitle, SectionTitle, AvatarComponent };
};

export default getComponents;

// import React from 'react';

// import Header from './CardHeader';
// import CardItem from './Carditem';
// import { Container } from './styles';
import CardHeader from './CardHeader';
import CardItem from './CardItem';
import styles from './styles.module.css';

function CardList({
	fields = [],
	data = [],
	loading = false,
	showCode = false,
	detail = {},
}) {
	return (
		<div className={styles.container}>
			<CardHeader fields={fields} showCode={showCode} detail={detail} />

			{(data || []).map((item, i) => (
				<CardItem
					item={item}
					loading={loading}
					fields={fields}
					isLast={data?.length === i + 1}
				/>
			))}
		</div>
	);
}

export default CardList;

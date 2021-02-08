import React from 'react';
import { AppWidth, DocWidth, Flex, P } from '@tpr/core';
import styles from './highlight.module.scss';

type HighlightProps = {
	title?: string;
	name: string;
	psr: string;
	testId?: string;
};
export const Highlight: React.FC<HighlightProps> = ({
	title = 'Scheme return',
	name = '',
	psr = '',
}) => {
	return (
		<DocWidth className={styles.highlight}>
			<div className={styles.leftBackground} />
			<AppWidth className={styles.highlightContent}>
				<Flex cfg={{ flex: '0 0 auto' }} className={styles.schemeReturn}>
					<P
						cfg={{
							fontWeight: 4,
							fontSize: 3,
							lineHeight: 5,
							color: 'white',
							ml: 6,
						}}
					>
						{title}
					</P>
				</Flex>
				<Flex
					cfg={{
						flex: '1 1 auto',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<P
						cfg={{
							fontWeight: 4,
							fontSize: 3,
							lineHeight: 5,
							px: 4,
							color: 'white',
						}}
						className={styles.truncate}
					>
						{name}
					</P>
					<Flex
						cfg={{
							flex: '0 0 auto',
							alignItems: 'center',
							justifyContent: 'flex-end',
						}}
						className={styles.psrNumber}
					>
						<div className={styles.separator}></div>
						<P
							cfg={{
								fontWeight: 4,
								fontSize: 3,
								lineHeight: 6,
								color: 'white',
								px: 6,
							}}
						>
							PSR: {psr}
						</P>
					</Flex>
				</Flex>
			</AppWidth>
		</DocWidth>
	);
};

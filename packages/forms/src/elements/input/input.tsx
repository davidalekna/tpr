import React from 'react';
import { classNames, Flex, LayoutProps } from '@tpr/core';
import styles from './input.module.scss';
export type InputProps = {
	type: string;
	width?: LayoutProps['width'];
	testId?: string;
	label?: string;
	touched?: boolean;
	after?: any;
	decimalPlaces?: number;
	[key: string]: any;
};
export const Input: React.FC<InputProps> = ({
	type = 'text',
	width,
	testId,
	label,
	touched = false,
	className,
	after: After,
	decimalPlaces,
	...rest
}) => {
	return (
		<Flex cfg={{ flex: width ? '0 0 auto' : '1 1 auto', width }}>
			<input
				type={type}
				data-testid={testId}
				aria-label={label}
				step={
					type !== 'number'
						? null
						: decimalPlaces
						? Math.pow(10, -decimalPlaces)
						: 1
				}
				className={classNames([
					styles.inputText,
					className,
					{
						[styles['inputText-error']]: touched,
					},
				])}
				{...rest}
			/>
			{After && <span className={styles.after}>{After}</span>}
		</Flex>
	);
};

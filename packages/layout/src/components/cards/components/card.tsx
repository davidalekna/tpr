import React from 'react';
import { Flex, H3, P, Button, ButtonProps, classNames, Hr } from '@tpr/core';
import styles from './card.module.scss';

type StyledCardProps = { complete: boolean };
export const StyledCard: React.FC<StyledCardProps> = ({
	complete = false,
	children,
}) => {
	return (
		<div
			className={classNames([
				styles.card,
				{ [styles['card-completed']]: complete },
			])}
		>
			{children}
		</div>
	);
};

export const StyledCardToolbar: React.FC = ({ children }) => {
	return <div className={styles.cardToolbar}>{children}</div>;
};

type ToolbarProps = { title: string; subtitle?: string };
export const Toolbar: React.FC<ToolbarProps> = ({ title, subtitle }) => {
	return (
		<Flex cfg={{ flexDirection: 'column', mt: 4, mb: 3 }}>
			<Flex
				cfg={{ flexDirection: 'column', pb: 2 }}
				className={styles.toolbarBottomBorder}
			>
				<P cfg={{ color: 'neutral.3', fontSize: 3 }}>Edit trustee</P>
				<H3 cfg={{ fontWeight: 3 }}>{title}</H3>
			</Flex>
			{subtitle && (
				<Flex cfg={{ py: 3 }} className={styles.toolbarBottomBorder}>
					<P cfg={{ color: 'neutral.3' }}>{subtitle}</P>
				</Flex>
			)}
		</Flex>
	);
};

type FooterButtonProps = {
	type?: 'button' | 'submit';
	title?: string;
	appearance?: 'primary' | 'outlined';
	intent?: 'none' | 'success' | 'warning' | 'danger';
	loadingMessage?: string;
	onClick?: (...args: any[]) => void;
	disabled?: boolean;
	cfg?: ButtonProps['cfg'];
};
export const FooterButton: React.FC<FooterButtonProps> = ({
	intent,
	appearance,
	type,
	onClick,
	disabled,
	loadingMessage = 'Saving...',
	title,
	cfg,
}) => {
	return (
		<Button
			intent={intent}
			appearance={appearance}
			type={type}
			onClick={onClick}
			disabled={disabled}
			cfg={cfg}
		>
			{disabled ? loadingMessage : title}
		</Button>
	);
};

export const Footer: React.FC = ({ children }) => {
	return (
		<Flex
			cfg={{
				flex: '0 0 auto',
				flexDirection: 'column',
				alignItems: 'flex-start',
				justifyContent: 'flex-start',
				width: 10,
				mt: 5,
			}}
		>
			<Hr cfg={{ mb: 6 }} />
			<Flex>{children}</Flex>
		</Flex>
	);
};

export const StatusMessage = ({ complete, icon: Icon }) => {
	return (
		<Flex cfg={{ alignItems: 'center' }} height="22px">
			<Icon size={18} fill={complete ? '#207e3b' : '#d4351c'} />
			<P
				cfg={{ ml: 1, fontSize: 2, color: complete ? 'success.2' : 'danger.2' }}
			>
				{complete ? 'No issues' : 'Incomplete'}
			</P>
		</Flex>
	);
};
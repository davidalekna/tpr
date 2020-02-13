import React from 'react';
import styled from 'styled-components';
import {
	compose,
	space,
	color,
	border,
	layout,
	flexbox,
	typography,
} from 'styled-system';
import {
	BorderProps,
	ColorProps,
	FlexboxProps,
	SpaceProps,
	LayoutProps,
	TypographyProps,
} from 'styled-system';

export const DocWidth = styled.div<
	BorderProps & ColorProps & FlexboxProps & SpaceProps
>`
	display: flex;
	width: 100%;

	${space}
	${border}
	${color}
	${flexbox}
`;

export const AppWidth = styled.div`
	width: 100%;
	max-width: 1000px;
`;

export const Container: React.FC = ({ children, ...rest }) => {
	return (
		<DocWidth
			justifyContent="center"
			bg="#eeeeee"
			borderTop="5px solid #777"
			{...rest}
		>
			<AppWidth>{children}</AppWidth>
		</DocWidth>
	);
};

/**
 * There will be 2 grid components for the Body component
 * 1. Grid component with 1 column with rows layout
 * 2. Grid component with 2 columns first for sidebar and second for rows layout
 */
export const BodyWithSidebar = () => null;

type FlexProps = FlexboxProps &
	SpaceProps &
	LayoutProps &
	TypographyProps &
	ColorProps &
	BorderProps;

export const Flex = styled('div').attrs(() => ({
	display: 'flex',
}))<FlexProps>(compose(flexbox, space, layout, typography, color, border));

type TextProps = TypographyProps & SpaceProps & ColorProps;

export const Text = styled('span').attrs(() => ({
	overflowWrap: 'break-word',
	lineHeight: '1em',
}))<TextProps>(compose(typography, space, color));

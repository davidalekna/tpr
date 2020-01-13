import React, { ReactElement } from 'react';
import DataBrowser, { DataBrowserProps } from '@alekna/react-data-browser';
import { NetworkStatus, ApolloError } from 'apollo-client';

// ISSUE: can't find a way to pass a generic to TableBaseProps when using React.FC 🤔

type TableBaseProps<T> = {
	fixedColW: number;
	data: T | T[];
	error?: ApolloError;
	networkStatus: NetworkStatus;
	loading: boolean;
	children: (utils: ViewSwitchProps) => ReactElement;
};

const views = ['list', 'error', 'loading', 'refetch', 'fetchMore'];
export const TableBase = <T extends {}, K extends DataBrowserProps & TableBaseProps<T>>({
	fixedColW = 40,
	data,
	children,
	networkStatus,
	error,
	loading = false,
	...dataBrowserProps
}: K) => {
	return (
		<DataBrowser views={views} viewType="loading" {...dataBrowserProps}>
			{dataBrowserUtils => {
				const renderBody = body({ fixedColW, data, networkStatus, error, loading });
				return (
					<div>
						<div>static table head</div>
						{children(renderBody(dataBrowserUtils))}
					</div>
				);
			}}
		</DataBrowser>
	);
};

type ViewSwitchProps = {
	fieldReducer: (fieldValue: unknown, fieldName: string, row: any) => ReactElement;
	onRowClick?: (row: any) => void;
	rowOptions?: (props: { toggleMenu: Function; row: any; history: any }) => ReactElement;
	onBottomTouch?: () => void;
	fixedColW?: number;
	refetching?: boolean;
	maxBodyHeight?: number;
	data: unknown | unknown[];
	bottomTouchOffset?: number;
	emptyDataMessage?: string;
};

/** This function will manage Apollo data fetching states and renders the body accordingly */
const body = <T extends {}>({
	loading,
	error,
	networkStatus,
	...baseUtils
}: Omit<TableBaseProps<T>, 'children'>): Function => {
	return (_: DataBrowserProps) => (_: ViewSwitchProps): ReactElement => {
		if (networkStatus === 3) return <div>fetch more in progress</div>;
		if (networkStatus === 4) return <div>refetch in progress</div>;
		if (loading) return <div>loading</div>;
		if (error) return <div>error</div>;

		return <div>data is ready</div>;
	};
};

import React from 'react';
import { Flex } from '@tpr/core';
import { useInHouseAdminContext } from '../../context';
import { Content } from '../../../components/content';
import useSetState from '../../../hooks/use-set-state';
import AutoComplete from './AutoComplete';
import ManualComplete from './ManualComplete';
import Postcode from './Postcode';
import { cardType, cardTypeName } from '../../../common/interfaces';

export const AddressPage: React.FC = () => {
	const { current, i18n } = useInHouseAdminContext();
	const { inHouseAdmin } = current.context;
	const [state, setState] = useSetState({
		loading: false,
		manual: false,
		postCode: inHouseAdmin.address.postCode,
		lookup: false,
		options: [],
	});
	const { loading, manual, postCode, lookup, options } = state;

	return (
		<Content
			type={cardType.inHouseAdmin}
			typeName={cardTypeName.inHouseAdmin}
			title={i18n.address.title}
		>
			<Postcode
				lookup={lookup}
				loading={loading}
				postCode={postCode}
				setPostcode={(postCode: string) => setState({ postCode })}
				showLookup={(lookup: boolean) => setState({ lookup })}
				setLoading={(loading: boolean) => setState({ loading })}
				setOptions={(options: any[]) => setState({ options })}
			/>
			<Flex cfg={{ flexDirection: 'column' }}>
				{manual ? (
					<ManualComplete />
				) : (
					<AutoComplete
						loading={loading}
						options={options}
						onClick={() => setState({ manual: true })}
					/>
				)}
			</Flex>
		</Content>
	);
};

import React from 'react';
import { Flex, H4 } from '@tpr/core';
import { useTrusteeContext } from '../../context';
import { Content } from '../../../components/content';
import useSetState from '../../../hooks/use-set-state';
import AutoComplete from './AutoComplete';
import ManualComplete from './ManualComplete';
import Postcode from './Postcode';

const AddressPage: React.FC = () => {
	const { current, i18n } = useTrusteeContext();
	const { trustee } = current.context;
	const [state, setState] = useSetState({
		loading: false,
		manual: false,
		postcode: trustee.address.postcode,
		lookup: false,
		options: [],
	});
	const { loading, manual, postcode, lookup, options } = state;

	return (
		<Content type="trustee" title={i18n.address.title}>
			<Postcode
				lookup={lookup}
				loading={loading}
				postcode={postcode}
				setPostcode={(postcode: string) => setState({ postcode })}
				showLookup={(lookup: boolean) => setState({ lookup })}
				setLoading={(loading: boolean) => setState({ loading })}
				setOptions={(options: any[]) => setState({ options })}
			/>
			<Flex cfg={{ flexDirection: 'column' }}>
				<H4 cfg={{ fontWeight: 3, my: 1 }}>{i18n.address.auto.title}</H4>
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

export default AddressPage;

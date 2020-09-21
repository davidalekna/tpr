import React, { useState } from 'react';
import { useThirdPartyContext } from '../../../context';
import {
	Breadcrumbs,
	BreadcrumbLink,
} from '../../../../components/breadcrumbs';
import Confirm from '../../../../common/views/remove/confirm/confirm';
import { cardType, cardTypeName, ThirdPartyI18nProps } from '@tpr/core';

const getBreadcrumbLinks = (
	labels: Partial<ThirdPartyI18nProps['remove']['confirm']['breadcrumbs']>,
): BreadcrumbLink[] => [
	{
		to: 'BACK',
		underline: true,
		name: labels.link1,
	},
	{
		name: labels.link2,
		disabled: true,
	},
];

export const ConfirmRemove: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const { current, send, onRemove, i18n } = useThirdPartyContext();
	const breadcrumbLinks = getBreadcrumbLinks(
		i18n?.remove?.confirm?.breadcrumbs,
	);
	const { thirdParty, remove } = current.context;

	async function handleRemove() {
		setLoading(true);
		await onRemove(
			{
				schemeRoleId: thirdParty.schemeRoleId,
				date: remove.date,
			},
			thirdParty,
		)
			.then(() => {
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
			});
	}

	return (
		<Confirm
			cardType={cardType.thirdParty}
			cardTypeName={cardTypeName.thirdParty}
			breadcrumbs={() => <Breadcrumbs links={breadcrumbLinks} send={send} />}
			removeTitle={i18n.remove.confirm.title}
			removeMessage1={i18n.remove.confirm.dialog.message1}
			removeMessage2={i18n.remove.confirm.dialog.message2}
			removeBtnTitle={i18n.remove.confirm.buttons.remove}
			cancelBtnTitle={i18n.remove.confirm.buttons.cancel}
			handleRemove={handleRemove}
			handleCancel={() => send('CANCEL')}
			loading={loading}
		/>
	);
};

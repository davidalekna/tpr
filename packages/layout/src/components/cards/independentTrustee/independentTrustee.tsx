import React from 'react';
import {
	IndependentTrusteeProvider,
	IndependentTrusteeProviderProps,
	useIndependentTrusteeContext,
} from './context';
import { Section } from '@tpr/core';
import { Toolbar } from '../components/toolbar';
import { UnderlinedButton } from '../components/button';
import RemovedBox from '../components/removedBox';
import { Preview } from './views/preview/preview';
import { Regulator } from './views/regulator/regulator';
import { ReasonRemove } from './views/remove/reason/reason';
import { ConfirmRemove } from './views/remove/confirm/confirm';
import { cardTypeName } from '../common/interfaces';
import { IndependentTrusteeContext } from './independentTrusteeMachine';
import { concatenateStrings } from '../../../utils';
import { Subtitle } from '../common/views/preview/components';
import styles from '../cards.module.scss';

const CardContentSwitch: React.FC = () => {
	const { current } = useIndependentTrusteeContext();

	switch (true) {
		case current.matches('preview'):
			return <Preview />;
		case current.matches({ edit: 'regulator' }):
			return <Regulator />;
		case current.matches({ remove: 'reason' }):
			return <ReasonRemove />;
		case current.matches({ remove: 'confirm' }):
			return <ConfirmRemove />;
		case current.matches({ remove: 'deleted' }):
			return <RemovedBox type={cardTypeName.independent} />;
		default:
			return null;
	}
};

const IndependentTrusteeButton: React.FC<{ title: string }> = ({ title }) => (
	<UnderlinedButton isMainHeading={true}>{title}</UnderlinedButton>
);

const RemoveButton: React.FC = () => {
	const { current, send, i18n } = useIndependentTrusteeContext();
	return (
		<UnderlinedButton
			isOpen={
				current.matches({ remove: 'reason' }) ||
				current.matches({ remove: 'confirm' })
			}
			onClick={() => {
				current.context.lastBtnClicked = 2;
				if (
					current.matches({ remove: 'reason' }) ||
					current.matches({ remove: 'confirm' })
				) {
					send('CANCEL');
				} else {
					send('REMOVE');
				}
			}}
			notHeading={true}
		>
			{i18n.preview.buttons.two}
		</UnderlinedButton>
	);
};

const isComplete = (context: IndependentTrusteeContext) => {
	return context.preValidatedData ? true : context.complete;
};

export const IndependentTrusteeCard: React.FC<IndependentTrusteeProviderProps> = React.memo(
	({ testId, cfg, ...rest }) => {
		return (
			<IndependentTrusteeProvider {...rest}>
				{({ current: { context }, i18n }) => {
					return (
						<Section
							cfg={cfg}
							data-testid={testId}
							className={styles.card}
							ariaLabel={concatenateStrings([
								context.independentTrustee.organisationName,
								i18n.preview.trusteeType,
							])}
						>
							<Toolbar
								buttonLeft={() => (
									<IndependentTrusteeButton title={i18n.preview.buttons.one} />
								)}
								buttonRight={RemoveButton}
								complete={isComplete(context)}
								subtitle={() => (
									<Subtitle
										main={context.independentTrustee.organisationName}
										secondary={i18n.preview.trusteeType}
									/>
								)}
								statusText={
									isComplete(context)
										? i18n.preview.statusText.confirmed
										: i18n.preview.statusText.unconfirmed
								}
							/>
							<CardContentSwitch />
						</Section>
					);
				}}
			</IndependentTrusteeProvider>
		);
	},
);

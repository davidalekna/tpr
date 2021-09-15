import { rollup } from '../../config/rollup.config';

export default rollup({
	name: 'forms',
	extraExternal: [
		'@tpr/core',
		'@tpr/icons',
		'@tpr/theming',
		'@types/lodash.merge',
		'@types/lodash.isequal',
		'@types/match-sorter',
		'@types/qs',
		'@financial-times/accessible-autocomplete/react',
		'@testing-library/react',
		'date-fns',
		'downshift',
		'final-form',
		'lodash.merge',
		'lodash.isequal',
		'match-sorter',
		'qs',
		'react-final-form',
		'react-dom/test-utils',
	],
});

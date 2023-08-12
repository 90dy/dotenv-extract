require('tsm');

const path = require('path');

const { projectRoot } = require('./src/variables')

require(path.resolve(
	path.dirname(
		require.resolve(projectRoot + '/package.json'),
	),
	'./dotenv',
));

module.exports = {
	plugins: [
		'transform-inline-environment-variables'
	]
}

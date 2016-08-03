Package.describe({
	name: 'milligram:milligram-cssnext',
	version: '1.0.0',
	summary: 'A minimalist CSS framework on CSSNext version.',
	git: 'https://github.com/milligram/milligram-cssnext.git',
	documentation: 'readme.md'
});

Package.onUse(function (api) {
	api.versionsFrom('METEOR@1.0');
	api.addFiles([
		'dist/milligram.css'
	], 'client');
});

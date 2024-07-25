install:
	npm install

gendiff:
	node src/bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint

test:
	npx jest
	
test-coverage:
	npx jest --coverage --coverageProvider=v8
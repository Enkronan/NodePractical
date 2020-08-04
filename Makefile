REPORTER = list
MOCHA_OPTS = --ui tdd -c

test:
	clear
	echo Starting test **********************
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	tests/*.js
	echo Ending test

start:
	nodemon app
export

REPORTER = list
MOCHA_OPTS = --ui tdd -c
SECRET_KEY = 0b8550b438679920aee2e0ea5fcc8e41

seeding:
	echo Seeding blog-test *****************************************************
	./seed.sh

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

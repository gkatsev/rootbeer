BABEL_CMD=./node_modules/.bin/babel
MOCHA_CMD=./node_modules/.bin/mocha

SRC_JS = $(shell find src -name "*.js")
LIB_JS = $(patsubst src/%.js,lib/%.js,$(SRC_JS))

build: js

test: build
	$(MOCHA_CMD) lib/**/__tests__/*-test.js --require ./lib/test-init.js

js: $(LIB_JS) lib/bin/rootbeer

$(LIB_JS): lib/%.js: src/%.js
	mkdir -p $(dir $@) && $(BABEL_CMD) $< -o $@ --experimental

lib/bin/rootbeer:
	mkdir -p $(dir $@) && $(BABEL_CMD) src/bin/rootbeer -o $@ --experimental

clean:
	rm -rf lib/

.PHONY: build test js clean

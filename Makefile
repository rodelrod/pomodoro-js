# Put all NPM-installed executables in the PATH
export PATH := node_modules/.bin:$(PATH)
SCRIPTDIR := $(shell pwd)
SRC := $(SCRIPTDIR)/src
BUILD := $(SCRIPTDIR)/public

html: pack-js

electron: html
	electron-packager --platform=linux --arch=x64 --out=electron-build --overwrite . PomodoroTimer

test:
	@npm test

start:
	@npm start

# Webpack JS and associated CSS files
# -----------------------------------
BUNDLES := $(addprefix $(BUILD)/, js/bundle.js js/bundle.js.map css/bundle.css css/bundle.css.map) 
JSSOURCES := $(wildcard $(SRC)/js/*.js)

pack-js: $(BUNDLES)
$(BUNDLES): $(JSSOURCES)
	webpack -d


# Build HTML version automatically when watched source files change
# -----------------------------------------------------------------
watch:
	watchman watch-project $(SCRIPTDIR)
	watchman -- trigger $(SCRIPTDIR) remake 'src/js/*.js' -- make html


.PHONY: test watch html electron move-html move-css pack-js

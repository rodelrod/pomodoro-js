# Put all NPM-installed executables in the PATH
export PATH := node_modules/.bin:$(PATH)
SCRIPTDIR := $(shell pwd)
SRC := $(SCRIPTDIR)/src
BUILD := $(SCRIPTDIR)/public

html: move-html move-css pack-js

electron: html
	electron-packager --platform=linux --arch=x64 --out=electron-build --overwrite . PomodoroTimer

test:
	@npm test

# Move static HTML and CSS files from SRC to BUILD
# ------------------------------------------------

# HTML
SRC_HTML := $(wildcard $(SRC)/*.html)
BUILD_HTML := $(patsubst $(SRC)/%,$(BUILD)/%,$(SRC_HTML))

move-html: $(BUILD_HTML)
$(BUILD)/%.html: $(SRC)/%.html
	cp -f $< $@

# CSS
SRC_CSS := $(wildcard $(SRC)/css/*.css)
BUILD_CSS := $(patsubst $(SRC)/%,$(BUILD)/%,$(SRC_CSS))

move-css: $(BUILD_CSS)
$(BUILD)/css/%.css: $(SRC)/css/%.css
	cp -f $< $@


# Webpack JS and associated CSS files
# -----------------------------------
BUNDLES := $(addprefix $(BUILD)/, js/bundle.js js/bundle.js.map css/bundle.css css/bundle.css.map) 
JSSOURCES := $(wildcard $(SRC)/js/*.js)

pack-js: $(BUNDLES)
$(BUNDLES): $(JSSOURCES)
	webpack -d


# Run make automatically when watched source files change
# -------------------------------------------------------
watch:
	watchman watch-project $(SCRIPTDIR)
	watchman -- trigger $(SCRIPTDIR) remake 'src/js/*.js' 'src/css/*.css' 'src/*.html' -- make all


.PHONY: test watch html electron move-html move-css pack-js

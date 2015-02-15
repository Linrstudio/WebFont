var fs = require('fs')
  , path = require('path')
  , async = require('async')
  , svg2ttf = require('svg2ttf')
  , ttf2woff = require('ttf2woff')
  , _ = require('underscore')
  , svg = require('./lib/svg')
;

var CONFIG_FILE = 'config.json';

function createSvg (dir, config, done) {
  config = config || {};

  var mapFunction = function (charConfig, done) {
    var file = path.resolve(dir, charConfig.file);
    svg.optimize(config, file, function (err, data) {
      if (err) {
        return done(err);
      }
      return done(null, {
        unicode: charConfig.unicode,
        d: data
      });
    });
  }
  async.map(config.charmap, mapFunction, function (err, data) {
    if (err) {
      return done(err);
    }
    svg.create(_.extend({}, config, { charmap: data }), done);
  });
}

function loadConfig (configFile, done) {
  fs.readFile(configFile, 'utf-8', function (err, data) {
    var config;
    if (err) {
      return done(err);
    }
    try {
      if(data){
		data = data.replace(/\r|\n|\t/g,'');
		config = JSON.parse(data);
		if(config){
			var tmp = config.charmap,
				arr = [];
			if(tmp){
				tmp.forEach(function(el, i){
					if(fs.existsSync(el.file) === true){
						arr.push(el);
					}
				})
			}
			config.charmap = arr;
		}
	  }else{
		data = '{}';
	  }
    } catch (err) {
      return done("Invalid JSON file (" + err + ")");
    }
    return done(null, config);
  });
}

function generateFont (inputDir, outputDir, done) {

  async.auto({
    loadConfig: function (next) {
      loadConfig(path.join(inputDir, '/', CONFIG_FILE), next);
    },
    createSvg: ['loadConfig', function (next, data) {
      createSvg(inputDir, data.loadConfig, next);
    }],
    saveSvg: ['loadConfig', 'createSvg', function (next, data) {
      var file = path.resolve(outputDir, data.loadConfig.id + '.svg');
      fs.writeFile(file, data.createSvg, function (err) {
        if (err) {
          return next(err);
        }
        return next(null, file);
      });
    }],
    createTtf: ['loadConfig', 'createSvg', function (next, data) {
      var ttf = svg2ttf(data.createSvg, data.loadConfig);
      if (! ttf) {
        return next('Could not create TTF file');
      }
      return next(null, ttf.buffer);
    }],
    saveTtf: ['loadConfig', 'createTtf', function (next, data) {
      var file = path.resolve(outputDir, data.loadConfig.id + '.ttf');
      fs.writeFile(file, new Buffer(data.createTtf), function (err) {
        if (err) {
          return next(err);
        }
        return next(null, file);
      });
    }],
    createWoff: ['loadConfig', 'createTtf', function (next, data) {
      var woff = ttf2woff(data.createTtf, data.loadConfig);
      if (! woff) {
        return next('Could not create WOFF file');
      }
      return next(null, woff.buffer);
    }],
    saveWoff: ['loadConfig', 'createWoff', function (next, data) {
      var file = path.resolve(outputDir, data.loadConfig.id + '.woff');
	  
      fs.writeFile(file, new Buffer(data.createWoff), function (err) {
        if (err) {
          return next(err);
        }
        return next(null, file);
      });
    }]
  }, function (err, data) {
    if (err) {
      return done(err);
    }
    return done(null, { svg: data.saveSvg, ttf: data.saveTtf, woff: data.saveWoff });
  });
}

exports.generateFont = generateFont;
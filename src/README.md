Generates web-fonts based on individual vector files

License
=======

MIT

Running instructions
====================

* npm install
* ./webfont-generator <input dir> <output dir>
* (example: ./webfont-generator ./example-font .)

Implementation details
======================

1. Takes a config file (config.json - residing in input dir)

Config dir must contain at minimum the following properties:

{
  "id": "<basename for generated files>",
  "familyname": "<name of font>",
  "copyright": "<copyright details>",
  "charmap": [
    {
      "unicode": "<unicode for characters, e.g. a, - or &#xf000>",
      "file": "<filename for individual vector file>"
    }
  ]
}

Optional: SVG parameters 'horizAdvX', 'unitsPerEm', 'ascent', 'descent' - though sensible defaults provided

2. Creates an SVG font containing above SVG vector files

Goes through various SVG optimization steps, like normalizing all SVG files to the same boundaries

Further optimization steps provided by SVGO, see https://github.com/svg/svgo for more detail

3. Creates a TTF font based on SVG font

4. Creates a WOFF font based on TTF font

5. Currently does not generate a CSS file, so use content: '<unicode>' in your CSS

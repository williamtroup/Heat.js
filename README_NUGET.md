# Heat.js v5.0.0 - Beta 8

[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Heat.js%2C%20a%20free%20JavaScript%heat%20map&url=https://github.com/williamtroup/Heat.js&hashtags=javascript,heat,map)
[![npm](https://img.shields.io/badge/npmjs-v5.0.0-blue)](https://www.npmjs.com/package/jheat.js)
[![nuget](https://img.shields.io/badge/nuget-v5.0.0-purple)](https://www.nuget.org/packages/jHeat.js/)
[![license](https://img.shields.io/badge/license-MIT-green)](https://github.com/williamtroup/Heat.js/blob/main/LICENSE.txt)
[![discussions Welcome](https://img.shields.io/badge/discussions-Welcome-red)](https://github.com/williamtroup/Heat.js/discussions)
[![coded by William Troup](https://img.shields.io/badge/coded_by-William_Troup-yellow)](https://william-troup.com/)

> 🌞 A highly customizable JavaScript library for generating interactive heatmaps. It transforms data into smooth, visually intuitive heat layers, making patterns and intensity easy to spot at a glance.


## What features does Heat.js have?

- 😏 Zero-dependencies and extremely lightweight!
- 🦾 100% TypeScript, allowing greater support for React, Angular, and other libraries!
- 💻 Full API available via public functions.
- 🎏 60 languages available!
- 📱 Fully styled in CSS/SASS, fully responsive, and compatible with the Bootstrap library!
- 🌈 Full CSS theme support (using :root variables), with dark and light themes (31 available by default).
- 🔍 6 views supported: Map, Line, Chart, Days, Months, and Color Ranges!
- 🔍 Yearly statistics (shows total for day, week, month, and year).
- 📃 Auto spawning support (when HTML is added via 3rd party libraries).
- ☑️ Configuration dialog support per view.
- ⭐ Fully configurable per DOM element via binding options.
- 🎥 Toggling colors on/off support.
- 🔨 9 export formats supported.
- 🔨 7 import formats supported.
- 💁 Trend types allows data to be split up and viewed separately.
- ❓ Customizable tooltips.
- 💧 Data pulling (does not support trend types).
- 🌈 Color ranges support different colors per view.
- 💥 Custom year month range support (Jan-Dec, or Apr-Mar).


## Where can I find the documentation?

All the documentation can be found [here](https://www.heatjs.com/docs).


## What browsers are supported?

All modern browsers (such as Google Chrome, FireFox, and Opera) are fully supported.


## What languages are supported?

- `af` Afrikaans
- `am` Amharic
- `ar` Arabic
- `hy` Armenian
- `be` Belarusian
- `bn` Bengali
- `bg` Bulgarian
- `ca` Catalan
- `zh` Chinese (simplified)
- `da` Danish
- `nl` Dutch
- `en` English (default)
- `eo` Esperanto
- `et` Estonian
- `fa` Farsi
- `fi` Finnish
- `fr` French
- `fy` Frisian
- `gl` Galician
- `ka` Georgian
- `de` German
- `el` Greek
- `gu` Gujarati
- `ha` Hausa
- `he` Hebrew
- `hi` Hindi
- `hu` Hungarian
- `is` Icelandic
- `id` Indonesian
- `ga` Irish
- `it` Italian
- `ja` Japanese
- `jv` Javanese
- `kn` Kannada
- `ko` Korean
- `lv` Latvian
- `lt` Lithuanian
- `lb` Luxembourgish
- `ms` Malay
- `mr` Marathi
- `ne` Nepali
- `no` Norwegian
- `pl` Polish
- `pt` Portuguese
- `ro` Romanian
- `si` Sinhalese
- `sk` Slovak
- `sl` Slovenian
- `es` Spanish
- `sw` Swahili
- `sv` Swedish
- `tl` Tagalog
- `ta` Tamil
- `zh-tw` Taiwanese
- `te` Telugu
- `th` Thai
- `tr` Turkish
- `uk` Ukrainian
- `ur` Urdu
- `vi` Vietnamese


## What export formats are supported?

- `csv` Comma-Separated Values
- `json` JavaScript Object Notation
- `xml` Extensible Markup Language
- `txt` Text
- `html` Hypertext Markup Language
- `md` Markdown
- `tsv` Tab-Separated Values
- `yaml` YAML Ain't Markup Language
- `toml` Tom's Obvious Minimal Language


## What import formats are supported?

- `csv` Comma-Separated Values
- `json` JavaScript Object Notation
- `txt` Text
- `md` Markdown
- `tsv` Tab-Separated Values
- `yaml` YAML Ain't Markup Language
- `toml` Tom's Obvious Minimal Language


## What are the most recent changes?

To see a list of all the most recent changes, click [here](https://www.heatjs.com/docs/information/recentchanges).


## How do I install Heat.js?

You can install the library with npm into your local modules directory using the following command:

```markdown
npm install jheat.js
```

Or, you can download the latest zipped up version [here](https://www.heatjs.com/download).

Or, you can also use the following CDN links:

```markdown
https://cdn.jsdelivr.net/gh/williamtroup/Heat.js@5.0.0/dist/heat.min.js
https://cdn.jsdelivr.net/gh/williamtroup/Heat.js@5.0.0/dist/heat.js.min.css
```


## How do I get started?

To get started using Heat.js, do the following steps:

### 1. Prerequisites:

Make sure you include the "DOCTYPE html" tag at the top of your HTML, as follows:

```markdown
<!DOCTYPE html>
```

### 2. Include Files:

```markdown
<link rel="stylesheet" href="dist/heat.js.css">
<script src="dist/heat.js"></script>
```

### 3. DOM Element Binding:

```markdown
<div id="heat-map" data-heat-js="{ 'views': { 'map': { 'showDayNames': true } } }">
    Your HTML.
</div>
```

To see a list of all the available binding options you can use for "data-heat-js", click [here](https://www.heatjs.com/docs/binding/basicoptions).

To see a list of all the available custom triggers you can use for "data-heat-js", click [here](https://www.heatjs.com/docs/binding/customtriggers).


### 4. Adding Dates:

Now, you can add/remove dates, which will update the heat map automatically!

```markdown
<script>
  let newDateObject = new Date();

  $heat.addDate( "heat-map", newDateObject, "Trend Type 1", true );
  $heat.removeDate( "heat-map", newDateObject, "Trend Type 1", true );
</script>
```


### 5. Finishing Up:

That's it! Nice and simple. Please refer to the code if you need more help (fully documented).


## How do I go about customizing Heat.js?

To customize, and get more out of Heat.js, please read through the following documentation.


### 1. Public Functions:

To see a list of all the public functions available, click [here](https://www.heatjs.com/docs/api/publicfunctions).


### 2. Configuration:

Configuration options allow you to customize how Heat.js will function.  You can set them as follows:

```markdown
<script> 
  $heat.setConfiguration( {
      safeMode: false
  } );
</script>
```

To see a list of all the available configuration options you can use, click [here](https://www.heatjs.com/docs/configuration/mainoptions).
# CSVML - CSV Markup Language

Structure data in a comma-separated and line-based format. Or: I had one very specific use-case for easily editable structured data and made it everyone else's problem.

Suggested file extension: `.csvml`

## Installation

`npm install --save csvml`

## Usage

```html
<script type="module">
import Csvml from './csvml.js';

const csvData = `command,shutters_seconds
time,lat,lon

shutters_down,10
sunset,47.076668,15.421371`

const obj = Csvml.parse(csvData);
</script>
```

## Syntax

- The first entry of lines defines the property names
- All subsequent entries are data grouped by comma `,` or a single line break `\n` in the corresponding format of the first definition entry
- All entries are separated by double line breaks `\n\n`
- All properties are optional
- Entries starting with `#` are ignored (commented-out)

### Example of a CSVML document

```csvml
command,shutters_seconds
time,lat,lon

shutters_down,10
sunset,47.076668,15.421371

#shutters_up
09:00

#light_on
03:40

light_off
23:00

#shutters_down,2
14:30
```

... parses to JSON:

```json
[
  {
    "command": "shutters_down",
    "shutters_seconds": 10,
    "time": "sunset",
    "lat": 47.076668,
    "lon": 15.421371
  },
  {
    "command": "light_off",
    "time": "23:00"
  }
]
```

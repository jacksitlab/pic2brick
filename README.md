# Pic2Brick

Pic2Brick is a web service for uploading images and convert them into a brick mosaik (e.g. for Lego bricks). 

## Features

  * upload image without upload (no server component)
  * switch to to different brick manufacturer (maybe as list selection)
  * set image size (scaling)
  * export to list for bricklink

## Installation

  * clone
  * npm install
  * npm run start


### Assets

  * source:  https://rebrickable.com/downloads/
    * elements.csv.gz
    * colors.csv.gz

  * create asset json file for this: ```./bin/create_data.py --ifelements tmp/elements.csv --ifcolors tmp/colors.csv --of test.json``` 

bricks.***.json

```
{
    "tiles": [],
    "plates": [
        {
            "id": "",
            "format": "",
            "colors": []
        }
    ],
    "colors": [
        {
            "id": "",
            "name": "",
            "code": ""
        }
    ]
}
```

format-string:

```
  |-|
  |1|
|-|-|-|
|4|0|2|
|-|-|-|
  |3|
  |-|
```

  * string starts always with a 0
  * direction code for the next "pixel"
  
examples:

"0222" => 1x4 plate (like Lego 3710)
"023"  => 2x2 corner plate (like Lego 2420)
"0224133" => 3x3 cross (like Lego 15397)

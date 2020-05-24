#!/usr/bin/python3

import json
import csv
import argparse


parser = argparse.ArgumentParser(
    description='Create lego asset json with bricklink db csv sources')

defaultLegoTilePartNumbers = [3070, 3069, 63864, 2431, 6636, 4162]
defaultLegoPlatePartNumbers = [3024, 3023, 3623, 3666, 3460, 3022]


class Color:

    def __init__(self, id, name, rgb, isTransient):
        self.id = id
        self.name = name
        self.code = self.getRGBACode(rgb, isTransient)

    def getRGBACode(self, rgb, isTransient):
        return "#"+rgb+("7F" if isTransient else "FF")

    def __str__(self):
        return str(self.id)+": "+self.name+"("+self.code+")"


class BrickPart:

    def __init__(self, partNo, fmt=None):
        self.partNumber = partNo
        self.fmt = fmt
        self.colorIds = []

    def addColor(self, colorId):
        self.colorIds.append(colorId)

    def __repr__(self):
        return json.dumps(self.__dict__)


class OutputObject:

    def __init__(self, colorsFile, elemsFile):
        self.colorsFile = colorsFile
        self.elemsFile = elemsFile
        self.availableColors = []
        self.tiles = []
        self.plates = []

    def parseColors(self):
        with open(self.colorsFile) as csvFile:
            has_header = csv.Sniffer().has_header(csvFile.read(1024))
            csvFile.seek(0)  # Rewind.
            rd = csv.reader(csvFile, delimiter=',')
            if has_header:
                next(rd)
            for row in rd:
                id = int(row[0])
                if id < 0 or id == 9999:
                    continue
                self.availableColors.append(
                    Color(id, row[1], row[2], row[3] == "t"))

        for c in self.availableColors:
            print(c)

    def parseElements(self, tileFilter=None, platesFilter=None):
        if tileFilter is None:
            tileFilter = defaultLegoTilePartNumbers
        if platesFilter is None:
            platesFilter = defaultLegoPlatePartNumbers

        with open(self.elemsFile) as csvFile:
            has_header = csv.Sniffer().has_header(csvFile.read(1024))
            csvFile.seek(0)  # Rewind.
            rd = csv.reader(csvFile, delimiter=',')
            if has_header:
                next(rd)
            for row in rd:
                if not row[1].isnumeric():
                    continue
                partNo = int(row[1])
                colorId = int(row[2])
                if partNo in tileFilter:
                    part = self.findTile(partNo)
                    if part is None:
                        part = BrickPart(partNo)
                        part.addColor(colorId)
                        self.tiles.append(part)
                    else:
                        part.addColor(colorId)
                elif partNo in platesFilter:
                    part = self.findPlate(partNo)
                    if part is None:
                        part = BrickPart(partNo)
                        part.addColor(colorId)
                        self.plates.append(part)
                    else:
                        part.addColor(colorId)

    def findColor(self, colorId):
        for color in self.availableColors:
            if color.id == colorId:
                return color
        return None

    def findTile(self, partNo):
        for plate in self.tiles:
            if plate.partNumber == partNo:
                return plate
        return None

    def findPlate(self, partNo):
        for plate in self.plates:
            if plate.partNumber == partNo:
                return plate
        return None

    def serialize(self, obj):
        """JSON serializer for objects not serializable by default json code"""

        # if isinstance(obj, date):
        #     serial = obj.isoformat()
        #     return serial

        # if isinstance(obj, time):
        #     serial = obj.isoformat()
        #     return serial

        return obj.__dict__

    def writeFile(self, filename):
        with open(filename, 'w') as of:
            json.dump({'tiles': self.tiles, 'plates': self.plates,
                       'colors': self.availableColors}, of,  default=self.serialize)


def init_argparse():
    parser.add_argument(
        '--ifelements', help="csv input file for elements", required=True)
    parser.add_argument(
        '--ifcolors', help="csv input file for colors", required=True)
    parser.add_argument(
        '--tiles', help="comma separated list of tiles numbers to include")
    parser.add_argument(
        '--plates', help="comma separated list of plates numbers to include")


parser.add_argument(
    '--of', help="output file to write", required=True)


if __name__ == "__main__":
    init_argparse()
    args = parser.parse_args()
    print(args)
    obj = OutputObject(args.ifcolors, args.ifelements)
    obj.parseColors()
    obj.parseElements()
    obj.writeFile(args.of)

/**
 * Heat.js
 * 
 * A highly customizable JavaScript library for generating interactive heatmaps. It transforms data into smooth, visually intuitive heat layers, making patterns and intensity easy to spot at a glance. 
 * 
 * @file        enum.ts
 * @version     v5.0.0 - Beta 5
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


export enum Char {
    empty = "",
    space = " ",
    newLine = "\n",
    dash = "-",
    underscore = "_",
    plus = "+",
    zero = "0",
    colon = ":",
    comma = ",",
    tab = "\t",
    pipe = "|",
    hash = "#",
    equals = "=",
    dot = ".",
    doubleSpace = "  ",
}

export enum Value {
    notFound = -1,
}

export enum ViewId {
    unknown = 0,
    map = 1,
    line = 2,
    chart = 3,
    days = 4,
    months = 5,
    colorRanges = 6, 
}

export enum ViewName {
    map = "map",
    line = "line",
    chart = "chart",
    days = "days",
    months = "months",
    colorRanges = "color-ranges",
}

export enum ImportType {
    csv = "csv",
    json = "json",
    txt = "txt",
    md = "md",
    tsv = "tsv",
    yaml = "yaml",
    toml = "toml",
}

export enum ExportType {
    csv = "csv",
    json = "json",
    xml = "xml",
    txt = "txt",
    html = "html",
    md = "md",
    tsv = "tsv",
    yaml = "yaml",
    toml = "toml",
}

export enum KeyCode {
    enter = "Enter",
    escape = "Escape",
}
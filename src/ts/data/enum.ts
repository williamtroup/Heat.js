/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        enum.ts
 * @version     v5.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
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
}

export enum Value {
    notFound = -1,
}

export enum ViewId {
    map = 1,
    chart = 2,
    days = 3,
    statistics = 4,
    months = 5,
}

export enum ViewName {
    map = "map",
    chart = "chart",
    days = "days",
    statistics = "statistics",
    months = "months",
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
}
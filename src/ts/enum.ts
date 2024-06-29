/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        enum.ts
 * @version     v4.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


export const enum STRING {
    empty = "",
    space = " ",
    newLine = "\n",
    dash = "-",
    underscore = "_",
    plus = "+",
    zero = "0",
    colon = ":",
    comma = ","
}

export const enum VALUE {
    notFound = -1
}

export const enum VIEW {
    map = 1,
    chart = 2,
    days = 3,
    statistics = 4
}

export const enum VIEW_NAME {
    map = "map",
    chart = "chart",
    days = "days",
    statistics = "statistics"
}

export const enum EXPORT_TYPE {
    csv = "csv",
    json = "json",
    xml = "xml",
    txt = "txt"
}
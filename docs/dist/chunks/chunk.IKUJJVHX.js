import {
  SlColorPicker
} from "./chunk.QCBHLROX.js";

// src/react/color-picker/index.ts
import * as React from "react";
import { createComponent } from "@lit-labs/react";
var color_picker_default = createComponent({
  tagName: "sl-color-picker",
  elementClass: SlColorPicker,
  react: React,
  events: {
    onSlBlur: "sl-blur",
    onSlChange: "sl-change",
    onSlFocus: "sl-focus",
    onSlInput: "sl-input",
    onSlInvalid: "sl-invalid"
  }
});

export {
  color_picker_default
};

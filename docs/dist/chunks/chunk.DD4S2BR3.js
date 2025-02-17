import {
  getIconLibrary,
  unwatchIcon,
  watchIcon
} from "./chunk.YUH6R3JT.js";
import {
  icon_styles_default
} from "./chunk.5IMXTBT2.js";
import {
  watch
} from "./chunk.VQ3XOPCT.js";
import {
  BuckeyeElement,
  e,
  e2,
  t
} from "./chunk.5DKFNGO3.js";
import {
  __decorateClass
} from "./chunk.LKA3TPUC.js";

// src/components/icon/icon.ts
var CACHEABLE_ERROR = Symbol();
var RETRYABLE_ERROR = Symbol();
var parser;
var iconCache = /* @__PURE__ */ new Map();
var Icon = class extends BuckeyeElement {
  constructor() {
    super(...arguments);
    this.svg = null;
    this.label = "";
    this.library = "default";
  }
  /** Given a URL, this function returns the resulting SVG element or an appropriate error symbol. */
  static async resolveIcon(url) {
    var _a;
    let fileData;
    try {
      fileData = await fetch(url, { mode: "cors" });
      if (!fileData.ok)
        return fileData.status === 410 ? CACHEABLE_ERROR : RETRYABLE_ERROR;
    } catch (e3) {
      return RETRYABLE_ERROR;
    }
    try {
      const div = document.createElement("div");
      div.innerHTML = await fileData.text();
      const svg = div.firstElementChild;
      if (((_a = svg == null ? void 0 : svg.tagName) == null ? void 0 : _a.toLowerCase()) !== "svg")
        return CACHEABLE_ERROR;
      if (!parser)
        parser = new DOMParser();
      const doc = parser.parseFromString(svg.outerHTML, "text/html");
      const svgEl = doc.body.querySelector("svg");
      if (!svgEl)
        return CACHEABLE_ERROR;
      svgEl.part.add("svg");
      return document.adoptNode(svgEl);
    } catch (e3) {
      return CACHEABLE_ERROR;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    watchIcon(this);
  }
  firstUpdated() {
    this.setIcon();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    unwatchIcon(this);
  }
  getUrl() {
    const library = getIconLibrary(this.library);
    if (this.name && library) {
      return library.resolver(this.name);
    }
    return this.src;
  }
  handleLabelChange() {
    const hasLabel = typeof this.label === "string" && this.label.length > 0;
    if (hasLabel) {
      this.setAttribute("role", "img");
      this.setAttribute("aria-label", this.label);
      this.removeAttribute("aria-hidden");
    } else {
      this.removeAttribute("role");
      this.removeAttribute("aria-label");
      this.setAttribute("aria-hidden", "true");
    }
  }
  async setIcon() {
    var _a;
    const library = getIconLibrary(this.library);
    const url = this.getUrl();
    if (!url) {
      this.svg = null;
      return;
    }
    let iconResolver = iconCache.get(url);
    if (!iconResolver) {
      iconResolver = Icon.resolveIcon(url);
      iconCache.set(url, iconResolver);
    }
    const svg = await iconResolver;
    if (svg === RETRYABLE_ERROR) {
      iconCache.delete(url);
    }
    if (url !== this.getUrl()) {
      return;
    }
    switch (svg) {
      case RETRYABLE_ERROR:
      case CACHEABLE_ERROR:
        this.svg = null;
        this.emit("bui-error");
        break;
      default:
        this.svg = svg.cloneNode(true);
        (_a = library == null ? void 0 : library.mutator) == null ? void 0 : _a.call(library, this.svg);
        this.emit("bui-load");
    }
  }
  render() {
    return this.svg;
  }
};
Icon.styles = icon_styles_default;
__decorateClass([
  t()
], Icon.prototype, "svg", 2);
__decorateClass([
  e2({ reflect: true })
], Icon.prototype, "name", 2);
__decorateClass([
  e2()
], Icon.prototype, "src", 2);
__decorateClass([
  e2()
], Icon.prototype, "label", 2);
__decorateClass([
  e2({ reflect: true })
], Icon.prototype, "library", 2);
__decorateClass([
  watch("label")
], Icon.prototype, "handleLabelChange", 1);
__decorateClass([
  watch(["name", "src", "library"])
], Icon.prototype, "setIcon", 1);
Icon = __decorateClass([
  e("bui-icon")
], Icon);

export {
  Icon
};

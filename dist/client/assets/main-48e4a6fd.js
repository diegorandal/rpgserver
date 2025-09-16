import { S as Spritesheet, P as Presets, R as RpgModule, _ as _rpgjs_mobile_gui, a as _rpgjs_default_gui, b as _rpgjs_gamepad, e as entryPoint, l as lookup } from "./vendor-ad69b20f.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key, result);
  return result;
};
const {
  RMSpritesheet
} = Presets;
let Characters = class {
};
Characters = __decorateClass$1([Spritesheet({
  ...RMSpritesheet(3, 4)
})], Characters);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
Characters.images = {
  "female": "/main/spritesheets/characters/female.png",
  "hero": "/main/spritesheets/characters/hero.png"
};
Characters.prototype.width = 96;
Characters.prototype.height = 128;
let RpgClientModuleEngine = class {
};
RpgClientModuleEngine = __decorateClass([
  RpgModule({
    spritesheets: [Characters],
    sprite: {},
    scenes: {},
    gui: [],
    sounds: []
  })
], RpgClientModuleEngine);
const server = null;
const _main = {
  client: RpgClientModuleEngine,
  server
};
const modules = [
  _main,
  _rpgjs_mobile_gui,
  _rpgjs_default_gui,
  _rpgjs_gamepad
];
const globalConfig = { "name": "My Game", "gamepad": {} };
document.addEventListener("DOMContentLoaded", function(e) {
  entryPoint(modules, {
    io: lookup,
    globalConfig,
    envs: {
      VITE_BUILT: 1,
      VITE_SERVER_URL: void 0,
      VITE_GAME_URL: void 0,
      VITE_RPG_TYPE: "mmorpg",
      VITE_ASSETS_PATH: "",
      VITE_REACT: true
    }
  }).start();
});

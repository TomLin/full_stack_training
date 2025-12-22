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
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
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
function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}
class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}
const DupeableTags = /* @__PURE__ */ new Set(["link", "style", "script", "noscript"]);
const TagsWithInnerContent = /* @__PURE__ */ new Set(["title", "titleTemplate", "script", "style", "noscript"]);
const HasElementTags = /* @__PURE__ */ new Set([
  "base",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
]);
const ValidHeadTags = /* @__PURE__ */ new Set([
  "title",
  "base",
  "htmlAttrs",
  "bodyAttrs",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
]);
const UniqueTags = /* @__PURE__ */ new Set(["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs", "templateParams"]);
const TagConfigKeys = /* @__PURE__ */ new Set(["key", "tagPosition", "tagPriority", "tagDuplicateStrategy", "innerHTML", "textContent", "processTemplateParams"]);
const UsesMergeStrategy = /* @__PURE__ */ new Set(["templateParams", "htmlAttrs", "bodyAttrs"]);
const MetaTagsArrayable = /* @__PURE__ */ new Set([
  "theme-color",
  "google-site-verification",
  "og",
  "article",
  "book",
  "profile",
  "twitter",
  "author"
]);
const allowedMetaProperties = ["name", "property", "http-equiv"];
const StandardSingleMetaTags = /* @__PURE__ */ new Set([
  "viewport",
  "description",
  "keywords",
  "robots"
]);
function isMetaArrayDupeKey(v) {
  const parts = v.split(":");
  if (!parts.length)
    return false;
  return MetaTagsArrayable.has(parts[1]);
}
function dedupeKey(tag) {
  const { props, tag: name } = tag;
  if (UniqueTags.has(name))
    return name;
  if (name === "link" && props.rel === "canonical")
    return "canonical";
  if (props.charset)
    return "charset";
  if (tag.tag === "meta") {
    for (const n of allowedMetaProperties) {
      if (props[n] !== void 0) {
        const propValue = props[n];
        const isStructured = propValue.includes(":");
        const isStandardSingle = StandardSingleMetaTags.has(propValue);
        const shouldAlwaysDedupe = isStructured || isStandardSingle;
        const keyPart = !shouldAlwaysDedupe && tag.key ? `:key:${tag.key}` : "";
        return `${name}:${propValue}${keyPart}`;
      }
    }
  }
  if (tag.key) {
    return `${name}:key:${tag.key}`;
  }
  if (props.id) {
    return `${name}:id:${props.id}`;
  }
  if (TagsWithInnerContent.has(name)) {
    const v = tag.textContent || tag.innerHTML;
    if (v) {
      return `${name}:content:${v}`;
    }
  }
}
function hashTag(tag) {
  const dedupe = tag._h || tag._d;
  if (dedupe)
    return dedupe;
  const inner = tag.textContent || tag.innerHTML;
  if (inner)
    return inner;
  return `${tag.tag}:${Object.entries(tag.props).map(([k, v]) => `${k}:${String(v)}`).join(",")}`;
}
function walkResolver(val, resolve, key) {
  const type = typeof val;
  if (type === "function") {
    if (!key || key !== "titleTemplate" && !(key[0] === "o" && key[1] === "n")) {
      val = val();
    }
  }
  let v;
  if (resolve) {
    v = resolve(key, val);
  }
  if (Array.isArray(v)) {
    return v.map((r) => walkResolver(r, resolve));
  }
  if ((v == null ? void 0 : v.constructor) === Object) {
    const next = {};
    for (const key2 of Object.keys(v)) {
      next[key2] = walkResolver(v[key2], resolve, key2);
    }
    return next;
  }
  return v;
}
function normalizeStyleClassProps(key, value) {
  const store = key === "style" ? /* @__PURE__ */ new Map() : /* @__PURE__ */ new Set();
  function processValue(rawValue) {
    const value2 = rawValue.trim();
    if (!value2)
      return;
    if (key === "style") {
      const [k, ...v] = value2.split(":").map((s) => s.trim());
      if (k && v.length)
        store.set(k, v.join(":"));
    } else {
      value2.split(" ").filter(Boolean).forEach((c) => store.add(c));
    }
  }
  if (typeof value === "string") {
    key === "style" ? value.split(";").forEach(processValue) : processValue(value);
  } else if (Array.isArray(value)) {
    value.forEach((item) => processValue(item));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([k, v]) => {
      if (v && v !== "false") {
        key === "style" ? store.set(k.trim(), v) : processValue(k);
      }
    });
  }
  return store;
}
function normalizeProps(tag, input) {
  tag.props = tag.props || {};
  if (!input) {
    return tag;
  }
  if (tag.tag === "templateParams") {
    tag.props = input;
    return tag;
  }
  Object.entries(input).forEach(([key, value]) => {
    if (value === null) {
      tag.props[key] = null;
      return;
    }
    if (key === "class" || key === "style") {
      tag.props[key] = normalizeStyleClassProps(key, value);
      return;
    }
    if (TagConfigKeys.has(key)) {
      if (["textContent", "innerHTML"].includes(key) && typeof value === "object") {
        let type = input.type;
        if (!input.type) {
          type = "application/json";
        }
        if (!(type == null ? void 0 : type.endsWith("json")) && type !== "speculationrules") {
          return;
        }
        input.type = type;
        tag.props.type = type;
        tag[key] = JSON.stringify(value);
      } else {
        tag[key] = value;
      }
      return;
    }
    const strValue = String(value);
    const isDataKey = key.startsWith("data-");
    if (strValue === "true" || strValue === "") {
      tag.props[key] = isDataKey ? strValue : true;
    } else if (!value && isDataKey && strValue === "false") {
      tag.props[key] = "false";
    } else if (value !== void 0) {
      tag.props[key] = value;
    }
  });
  return tag;
}
function normalizeTag(tagName, _input) {
  const input = typeof _input === "object" && typeof _input !== "function" ? _input : { [tagName === "script" || tagName === "noscript" || tagName === "style" ? "innerHTML" : "textContent"]: _input };
  const tag = normalizeProps({ tag: tagName, props: {} }, input);
  if (tag.key && DupeableTags.has(tag.tag)) {
    tag.props["data-hid"] = tag._h = tag.key;
  }
  if (tag.tag === "script" && typeof tag.innerHTML === "object") {
    tag.innerHTML = JSON.stringify(tag.innerHTML);
    tag.props.type = tag.props.type || "application/json";
  }
  return Array.isArray(tag.props.content) ? tag.props.content.map((v) => ({ ...tag, props: { ...tag.props, content: v } })) : tag;
}
function normalizeEntryToTags(input, propResolvers) {
  if (!input) {
    return [];
  }
  if (typeof input === "function") {
    input = input();
  }
  const resolvers = (key, val) => {
    for (let i = 0; i < propResolvers.length; i++) {
      val = propResolvers[i](key, val);
    }
    return val;
  };
  input = resolvers(void 0, input);
  const tags = [];
  input = walkResolver(input, resolvers);
  Object.entries(input || {}).forEach(([key, value]) => {
    if (value === void 0)
      return;
    for (const v of Array.isArray(value) ? value : [value])
      tags.push(normalizeTag(key, v));
  });
  return tags.flat();
}
const sortTags = (a, b) => a._w === b._w ? a._p - b._p : a._w - b._w;
const TAG_WEIGHTS = {
  base: -10,
  title: 10
};
const TAG_ALIASES = {
  critical: -8,
  high: -1,
  low: 2
};
const WEIGHT_MAP = {
  meta: {
    "content-security-policy": -30,
    "charset": -20,
    "viewport": -15
  },
  link: {
    "preconnect": 20,
    "stylesheet": 60,
    "preload": 70,
    "modulepreload": 70,
    "prefetch": 90,
    "dns-prefetch": 90,
    "prerender": 90
  },
  script: {
    async: 30,
    defer: 80,
    sync: 50
  },
  style: {
    imported: 40,
    sync: 60
  }
};
const ImportStyleRe = /@import/;
const isTruthy = (val) => val === "" || val === true;
function tagWeight(head, tag) {
  var _a;
  if (typeof tag.tagPriority === "number")
    return tag.tagPriority;
  let weight = 100;
  const offset = TAG_ALIASES[tag.tagPriority] || 0;
  const weightMap = head.resolvedOptions.disableCapoSorting ? {
    link: {},
    script: {},
    style: {}
  } : WEIGHT_MAP;
  if (tag.tag in TAG_WEIGHTS) {
    weight = TAG_WEIGHTS[tag.tag];
  } else if (tag.tag === "meta") {
    const metaType = tag.props["http-equiv"] === "content-security-policy" ? "content-security-policy" : tag.props.charset ? "charset" : tag.props.name === "viewport" ? "viewport" : null;
    if (metaType)
      weight = WEIGHT_MAP.meta[metaType];
  } else if (tag.tag === "link" && tag.props.rel) {
    weight = weightMap.link[tag.props.rel];
  } else if (tag.tag === "script") {
    if (isTruthy(tag.props.async)) {
      weight = weightMap.script.async;
    } else if (tag.props.src && !isTruthy(tag.props.defer) && !isTruthy(tag.props.async) && tag.props.type !== "module" && !((_a = tag.props.type) == null ? void 0 : _a.endsWith("json"))) {
      weight = weightMap.script.sync;
    } else if (isTruthy(tag.props.defer) && tag.props.src && !isTruthy(tag.props.async)) {
      weight = weightMap.script.defer;
    }
  } else if (tag.tag === "style") {
    weight = tag.innerHTML && ImportStyleRe.test(tag.innerHTML) ? weightMap.style.imported : weightMap.style.sync;
  }
  return (weight || 100) + offset;
}
function registerPlugin(head, p2) {
  const plugin = typeof p2 === "function" ? p2(head) : p2;
  const key = plugin.key || String(head.plugins.size + 1);
  const exists = head.plugins.get(key);
  if (!exists) {
    head.plugins.set(key, plugin);
    head.hooks.addHooks(plugin.hooks || {});
  }
}
// @__NO_SIDE_EFFECTS__
function createUnhead(resolvedOptions = {}) {
  var _a;
  const hooks = createHooks();
  hooks.addHooks(resolvedOptions.hooks || {});
  const ssr = !resolvedOptions.document;
  const entries = /* @__PURE__ */ new Map();
  const plugins = /* @__PURE__ */ new Map();
  const normalizeQueue = /* @__PURE__ */ new Set();
  const head = {
    _entryCount: 1,
    // 0 is reserved for internal use
    plugins,
    dirty: false,
    resolvedOptions,
    hooks,
    ssr,
    entries,
    headEntries() {
      return [...entries.values()];
    },
    use: (p2) => registerPlugin(head, p2),
    push(input, _options) {
      const options = { ..._options || {} };
      delete options.head;
      const _i = options._index ?? head._entryCount++;
      const inst = { _i, input, options };
      const _ = {
        _poll(rm = false) {
          head.dirty = true;
          !rm && normalizeQueue.add(_i);
          hooks.callHook("entries:updated", head);
        },
        dispose() {
          if (entries.delete(_i)) {
            head.invalidate();
          }
        },
        // a patch is the same as creating a new entry, just a nice DX
        patch(input2) {
          if (!options.mode || options.mode === "server" && ssr || options.mode === "client" && !ssr) {
            inst.input = input2;
            entries.set(_i, inst);
            _._poll();
          }
        }
      };
      _.patch(input);
      return _;
    },
    async resolveTags() {
      var _a2;
      const ctx = {
        tagMap: /* @__PURE__ */ new Map(),
        tags: [],
        entries: [...head.entries.values()]
      };
      await hooks.callHook("entries:resolve", ctx);
      while (normalizeQueue.size) {
        const i = normalizeQueue.values().next().value;
        normalizeQueue.delete(i);
        const e = entries.get(i);
        if (e) {
          const normalizeCtx = {
            tags: normalizeEntryToTags(e.input, resolvedOptions.propResolvers || []).map((t) => Object.assign(t, e.options)),
            entry: e
          };
          await hooks.callHook("entries:normalize", normalizeCtx);
          e._tags = normalizeCtx.tags.map((t, i2) => {
            t._w = tagWeight(head, t);
            t._p = (e._i << 10) + i2;
            t._d = dedupeKey(t);
            return t;
          });
        }
      }
      let hasFlatMeta = false;
      ctx.entries.flatMap((e) => (e._tags || []).map((t) => ({ ...t, props: { ...t.props } }))).sort(sortTags).reduce((acc, next) => {
        const k = String(next._d || next._p);
        if (!acc.has(k))
          return acc.set(k, next);
        const prev = acc.get(k);
        const strategy = (next == null ? void 0 : next.tagDuplicateStrategy) || (UsesMergeStrategy.has(next.tag) ? "merge" : null) || (next.key && next.key === prev.key ? "merge" : null);
        if (strategy === "merge") {
          const newProps = { ...prev.props };
          Object.entries(next.props).forEach(([p2, v]) => (
            // @ts-expect-error untyped
            newProps[p2] = p2 === "style" ? new Map([...prev.props.style || /* @__PURE__ */ new Map(), ...v]) : p2 === "class" ? /* @__PURE__ */ new Set([...prev.props.class || /* @__PURE__ */ new Set(), ...v]) : v
          ));
          acc.set(k, { ...next, props: newProps });
        } else if (next._p >> 10 === prev._p >> 10 && next.tag === "meta" && isMetaArrayDupeKey(k)) {
          acc.set(k, Object.assign([...Array.isArray(prev) ? prev : [prev], next], next));
          hasFlatMeta = true;
        } else if (next._w === prev._w ? next._p > prev._p : (next == null ? void 0 : next._w) < (prev == null ? void 0 : prev._w)) {
          acc.set(k, next);
        }
        return acc;
      }, ctx.tagMap);
      const title = ctx.tagMap.get("title");
      const titleTemplate = ctx.tagMap.get("titleTemplate");
      head._title = title == null ? void 0 : title.textContent;
      if (titleTemplate) {
        const titleTemplateFn = titleTemplate == null ? void 0 : titleTemplate.textContent;
        head._titleTemplate = titleTemplateFn;
        if (titleTemplateFn) {
          let newTitle = typeof titleTemplateFn === "function" ? titleTemplateFn(title == null ? void 0 : title.textContent) : titleTemplateFn;
          if (typeof newTitle === "string" && !head.plugins.has("template-params")) {
            newTitle = newTitle.replace("%s", (title == null ? void 0 : title.textContent) || "");
          }
          if (title) {
            newTitle === null ? ctx.tagMap.delete("title") : ctx.tagMap.set("title", { ...title, textContent: newTitle });
          } else {
            titleTemplate.tag = "title";
            titleTemplate.textContent = newTitle;
          }
        }
      }
      ctx.tags = Array.from(ctx.tagMap.values());
      if (hasFlatMeta) {
        ctx.tags = ctx.tags.flat().sort(sortTags);
      }
      await hooks.callHook("tags:beforeResolve", ctx);
      await hooks.callHook("tags:resolve", ctx);
      await hooks.callHook("tags:afterResolve", ctx);
      const finalTags = [];
      for (const t of ctx.tags) {
        const { innerHTML, tag, props } = t;
        if (!ValidHeadTags.has(tag)) {
          continue;
        }
        if (Object.keys(props).length === 0 && !t.innerHTML && !t.textContent) {
          continue;
        }
        if (tag === "meta" && !props.content && !props["http-equiv"] && !props.charset) {
          continue;
        }
        if (tag === "script" && innerHTML) {
          if ((_a2 = props.type) == null ? void 0 : _a2.endsWith("json")) {
            const v = typeof innerHTML === "string" ? innerHTML : JSON.stringify(innerHTML);
            t.innerHTML = v.replace(/</g, "\\u003C");
          } else if (typeof innerHTML === "string") {
            t.innerHTML = innerHTML.replace(new RegExp(`</${tag}`, "g"), `<\\/${tag}`);
          }
          t._d = dedupeKey(t);
        }
        finalTags.push(t);
      }
      return finalTags;
    },
    invalidate() {
      for (const entry of entries.values()) {
        normalizeQueue.add(entry._i);
      }
      head.dirty = true;
      hooks.callHook("entries:updated", head);
    }
  };
  ((resolvedOptions == null ? void 0 : resolvedOptions.plugins) || []).forEach((p2) => registerPlugin(head, p2));
  head.hooks.callHook("init", head);
  (_a = resolvedOptions.init) == null ? void 0 : _a.forEach((e) => e && head.push(e));
  return head;
}
async function renderDOMHead(head, options = {}) {
  const dom = options.document || head.resolvedOptions.document;
  if (!dom || !head.dirty)
    return;
  const beforeRenderCtx = { shouldRender: true, tags: [] };
  await head.hooks.callHook("dom:beforeRender", beforeRenderCtx);
  if (!beforeRenderCtx.shouldRender)
    return;
  if (head._domUpdatePromise) {
    return head._domUpdatePromise;
  }
  head._domUpdatePromise = new Promise(async (resolve) => {
    var _a;
    const dupeKeyCounter = /* @__PURE__ */ new Map();
    const resolveTagPromise = new Promise((resolve2) => {
      head.resolveTags().then((tags2) => {
        resolve2(
          tags2.map((tag) => {
            const count = dupeKeyCounter.get(tag._d) || 0;
            const res = {
              tag,
              id: (count ? `${tag._d}:${count}` : tag._d) || hashTag(tag),
              shouldRender: true
            };
            if (tag._d && isMetaArrayDupeKey(tag._d)) {
              dupeKeyCounter.set(tag._d, count + 1);
            }
            return res;
          })
        );
      });
    });
    let state = head._dom;
    if (!state) {
      state = {
        title: dom.title,
        elMap: (/* @__PURE__ */ new Map()).set("htmlAttrs", dom.documentElement).set("bodyAttrs", dom.body)
      };
      for (const key of ["body", "head"]) {
        const children = (_a = dom[key]) == null ? void 0 : _a.children;
        for (const c of children) {
          const tag = c.tagName.toLowerCase();
          if (!HasElementTags.has(tag)) {
            continue;
          }
          const next = normalizeProps({ tag, props: {} }, {
            innerHTML: c.innerHTML,
            ...c.getAttributeNames().reduce((props, name) => {
              props[name] = c.getAttribute(name);
              return props;
            }, {}) || {}
          });
          next.key = c.getAttribute("data-hid") || void 0;
          next._d = dedupeKey(next) || hashTag(next);
          if (state.elMap.has(next._d)) {
            let count = 1;
            let k = next._d;
            while (state.elMap.has(k)) {
              k = `${next._d}:${count++}`;
            }
            state.elMap.set(k, c);
          } else {
            state.elMap.set(next._d, c);
          }
        }
      }
    }
    state.pendingSideEffects = { ...state.sideEffects };
    state.sideEffects = {};
    function track2(id, scope, fn) {
      const k = `${id}:${scope}`;
      state.sideEffects[k] = fn;
      delete state.pendingSideEffects[k];
    }
    function trackCtx({ id, $el, tag }) {
      const isAttrTag = tag.tag.endsWith("Attrs");
      state.elMap.set(id, $el);
      if (!isAttrTag) {
        if (tag.textContent && tag.textContent !== $el.textContent) {
          $el.textContent = tag.textContent;
        }
        if (tag.innerHTML && tag.innerHTML !== $el.innerHTML) {
          $el.innerHTML = tag.innerHTML;
        }
        track2(id, "el", () => {
          $el == null ? void 0 : $el.remove();
          state.elMap.delete(id);
        });
      }
      for (const k in tag.props) {
        if (!Object.prototype.hasOwnProperty.call(tag.props, k))
          continue;
        const value = tag.props[k];
        if (k.startsWith("on") && typeof value === "function") {
          const dataset = $el == null ? void 0 : $el.dataset;
          if (dataset && dataset[`${k}fired`]) {
            const ek = k.slice(0, -5);
            value.call($el, new Event(ek.substring(2)));
          }
          if ($el.getAttribute(`data-${k}`) !== "") {
            (tag.tag === "bodyAttrs" ? dom.defaultView : $el).addEventListener(
              // onload -> load
              k.substring(2),
              value.bind($el)
            );
            $el.setAttribute(`data-${k}`, "");
          }
          continue;
        }
        const ck = `attr:${k}`;
        if (k === "class") {
          if (!value) {
            continue;
          }
          for (const c of value) {
            isAttrTag && track2(id, `${ck}:${c}`, () => $el.classList.remove(c));
            !$el.classList.contains(c) && $el.classList.add(c);
          }
        } else if (k === "style") {
          if (!value) {
            continue;
          }
          for (const [k2, v] of value) {
            track2(id, `${ck}:${k2}`, () => {
              $el.style.removeProperty(k2);
            });
            $el.style.setProperty(k2, v);
          }
        } else if (value !== false && value !== null) {
          $el.getAttribute(k) !== value && $el.setAttribute(k, value === true ? "" : String(value));
          isAttrTag && track2(id, ck, () => $el.removeAttribute(k));
        }
      }
    }
    const pending = [];
    const frag = {
      bodyClose: void 0,
      bodyOpen: void 0,
      head: void 0
    };
    const tags = await resolveTagPromise;
    for (const ctx of tags) {
      const { tag, shouldRender, id } = ctx;
      if (!shouldRender)
        continue;
      if (tag.tag === "title") {
        dom.title = tag.textContent;
        track2("title", "", () => dom.title = state.title);
        continue;
      }
      ctx.$el = ctx.$el || state.elMap.get(id);
      if (ctx.$el) {
        trackCtx(ctx);
      } else if (HasElementTags.has(tag.tag)) {
        pending.push(ctx);
      }
    }
    for (const ctx of pending) {
      const pos = ctx.tag.tagPosition || "head";
      ctx.$el = dom.createElement(ctx.tag.tag);
      trackCtx(ctx);
      frag[pos] = frag[pos] || dom.createDocumentFragment();
      frag[pos].appendChild(ctx.$el);
    }
    for (const ctx of tags)
      await head.hooks.callHook("dom:renderTag", ctx, dom, track2);
    frag.head && dom.head.appendChild(frag.head);
    frag.bodyOpen && dom.body.insertBefore(frag.bodyOpen, dom.body.firstChild);
    frag.bodyClose && dom.body.appendChild(frag.bodyClose);
    for (const k in state.pendingSideEffects) {
      state.pendingSideEffects[k]();
    }
    head._dom = state;
    await head.hooks.callHook("dom:rendered", { renders: tags });
    resolve();
  }).finally(() => {
    head._domUpdatePromise = void 0;
    head.dirty = false;
  });
  return head._domUpdatePromise;
}
function createHead$1(options = {}) {
  var _a, _b, _c;
  const render = ((_a = options.domOptions) == null ? void 0 : _a.render) || renderDOMHead;
  options.document = options.document || (typeof window !== "undefined" ? document : void 0);
  const initialPayload = ((_c = (_b = options.document) == null ? void 0 : _b.head.querySelector('script[id="unhead:payload"]')) == null ? void 0 : _c.innerHTML) || false;
  return /* @__PURE__ */ createUnhead({
    ...options,
    plugins: [
      ...options.plugins || [],
      {
        key: "client",
        hooks: {
          "entries:updated": render
        }
      }
    ],
    init: [
      initialPayload ? JSON.parse(initialPayload) : false,
      ...options.init || []
    ]
  });
}
function createDebouncedFn(callee, delayer) {
  let ctxId = 0;
  return () => {
    const delayFnCtxId = ++ctxId;
    delayer(() => {
      if (ctxId === delayFnCtxId) {
        callee();
      }
    });
  };
}
/**
* @vue/shared v3.5.25
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
  const map = /* @__PURE__ */ Object.create(null);
  for (const key of str.split(",")) map[key] = 1;
  return (val) => val in map;
}
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return ((str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  });
};
const camelizeRE = /-\w/g;
const camelize = cacheStringFunction(
  (str) => {
    return str.replace(camelizeRE, (c) => c.slice(1).toUpperCase());
  }
);
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction(
  (str) => {
    const s = str ? `on${capitalize(str)}` : ``;
    return s;
  }
);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, ...arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](...arg);
  }
};
const def = (obj, key, value, writable = false) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    writable,
    value
  });
};
const looseToNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value) || isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const isRef$1 = (val) => {
  return !!(val && val["__v_isRef"] === true);
};
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray$1(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef$1(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (isRef$1(val)) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2], i) => {
          entries[stringifySymbol(key, i) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
    };
  } else if (isSymbol(val)) {
    return stringifySymbol(val);
  } else if (isObject(val) && !isArray$1(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol = (v, i = "") => {
  var _a;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v
  );
};
/**
* @vue/reactivity v3.5.25
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this._on = 0;
    this.effects = [];
    this.cleanups = [];
    this._isPaused = false;
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = true;
      let i, l;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].pause();
        }
      }
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].pause();
      }
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active) {
      if (this._isPaused) {
        this._isPaused = false;
        let i, l;
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].resume();
          }
        }
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].resume();
        }
      }
    }
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    if (++this._on === 1) {
      this.prevScope = activeEffectScope;
      activeEffectScope = this;
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      activeEffectScope = this.prevScope;
      this.prevScope = void 0;
    }
  }
  stop(fromParent) {
    if (this._active) {
      this._active = false;
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      this.effects.length = 0;
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      this.cleanups.length = 0;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
    }
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
let activeSub;
const pausedQueueEffects = /* @__PURE__ */ new WeakSet();
class ReactiveEffect {
  constructor(fn) {
    this.fn = fn;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 1 | 4;
    this.next = void 0;
    this.cleanup = void 0;
    this.scheduler = void 0;
    if (activeEffectScope && activeEffectScope.active) {
      activeEffectScope.effects.push(this);
    }
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    if (this.flags & 64) {
      this.flags &= -65;
      if (pausedQueueEffects.has(this)) {
        pausedQueueEffects.delete(this);
        this.trigger();
      }
    }
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags & 2 && !(this.flags & 32)) {
      return;
    }
    if (!(this.flags & 8)) {
      batch(this);
    }
  }
  run() {
    if (!(this.flags & 1)) {
      return this.fn();
    }
    this.flags |= 2;
    cleanupEffect(this);
    prepareDeps(this);
    const prevEffect = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = this;
    shouldTrack = true;
    try {
      return this.fn();
    } finally {
      cleanupDeps(this);
      activeSub = prevEffect;
      shouldTrack = prevShouldTrack;
      this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let link = this.deps; link; link = link.nextDep) {
        removeSub(link);
      }
      this.deps = this.depsTail = void 0;
      cleanupEffect(this);
      this.onStop && this.onStop();
      this.flags &= -2;
    }
  }
  trigger() {
    if (this.flags & 64) {
      pausedQueueEffects.add(this);
    } else if (this.scheduler) {
      this.scheduler();
    } else {
      this.runIfDirty();
    }
  }
  /**
   * @internal
   */
  runIfDirty() {
    if (isDirty(this)) {
      this.run();
    }
  }
  get dirty() {
    return isDirty(this);
  }
}
let batchDepth = 0;
let batchedSub;
let batchedComputed;
function batch(sub, isComputed = false) {
  sub.flags |= 8;
  if (isComputed) {
    sub.next = batchedComputed;
    batchedComputed = sub;
    return;
  }
  sub.next = batchedSub;
  batchedSub = sub;
}
function startBatch() {
  batchDepth++;
}
function endBatch() {
  if (--batchDepth > 0) {
    return;
  }
  if (batchedComputed) {
    let e = batchedComputed;
    batchedComputed = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      e = next;
    }
  }
  let error;
  while (batchedSub) {
    let e = batchedSub;
    batchedSub = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      if (e.flags & 1) {
        try {
          ;
          e.trigger();
        } catch (err) {
          if (!error) error = err;
        }
      }
      e = next;
    }
  }
  if (error) throw error;
}
function prepareDeps(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    link.version = -1;
    link.prevActiveLink = link.dep.activeLink;
    link.dep.activeLink = link;
  }
}
function cleanupDeps(sub) {
  let head;
  let tail = sub.depsTail;
  let link = tail;
  while (link) {
    const prev = link.prevDep;
    if (link.version === -1) {
      if (link === tail) tail = prev;
      removeSub(link);
      removeDep(link);
    } else {
      head = link;
    }
    link.dep.activeLink = link.prevActiveLink;
    link.prevActiveLink = void 0;
    link = prev;
  }
  sub.deps = head;
  sub.depsTail = tail;
}
function isDirty(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
      return true;
    }
  }
  if (sub._dirty) {
    return true;
  }
  return false;
}
function refreshComputed(computed2) {
  if (computed2.flags & 4 && !(computed2.flags & 16)) {
    return;
  }
  computed2.flags &= -17;
  if (computed2.globalVersion === globalVersion) {
    return;
  }
  computed2.globalVersion = globalVersion;
  if (!computed2.isSSR && computed2.flags & 128 && (!computed2.deps && !computed2._dirty || !isDirty(computed2))) {
    return;
  }
  computed2.flags |= 2;
  const dep = computed2.dep;
  const prevSub = activeSub;
  const prevShouldTrack = shouldTrack;
  activeSub = computed2;
  shouldTrack = true;
  try {
    prepareDeps(computed2);
    const value = computed2.fn(computed2._value);
    if (dep.version === 0 || hasChanged(value, computed2._value)) {
      computed2.flags |= 128;
      computed2._value = value;
      dep.version++;
    }
  } catch (err) {
    dep.version++;
    throw err;
  } finally {
    activeSub = prevSub;
    shouldTrack = prevShouldTrack;
    cleanupDeps(computed2);
    computed2.flags &= -3;
  }
}
function removeSub(link, soft = false) {
  const { dep, prevSub, nextSub } = link;
  if (prevSub) {
    prevSub.nextSub = nextSub;
    link.prevSub = void 0;
  }
  if (nextSub) {
    nextSub.prevSub = prevSub;
    link.nextSub = void 0;
  }
  if (dep.subs === link) {
    dep.subs = prevSub;
    if (!prevSub && dep.computed) {
      dep.computed.flags &= -5;
      for (let l = dep.computed.deps; l; l = l.nextDep) {
        removeSub(l, true);
      }
    }
  }
  if (!soft && !--dep.sc && dep.map) {
    dep.map.delete(dep.key);
  }
}
function removeDep(link) {
  const { prevDep, nextDep } = link;
  if (prevDep) {
    prevDep.nextDep = nextDep;
    link.prevDep = void 0;
  }
  if (nextDep) {
    nextDep.prevDep = prevDep;
    link.nextDep = void 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function cleanupEffect(e) {
  const { cleanup } = e;
  e.cleanup = void 0;
  if (cleanup) {
    const prevSub = activeSub;
    activeSub = void 0;
    try {
      cleanup();
    } finally {
      activeSub = prevSub;
    }
  }
}
let globalVersion = 0;
class Link {
  constructor(sub, dep) {
    this.sub = sub;
    this.dep = dep;
    this.version = dep.version;
    this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Dep {
  // TODO isolatedDeclarations "__v_skip"
  constructor(computed2) {
    this.computed = computed2;
    this.version = 0;
    this.activeLink = void 0;
    this.subs = void 0;
    this.map = void 0;
    this.key = void 0;
    this.sc = 0;
    this.__v_skip = true;
  }
  track(debugInfo) {
    if (!activeSub || !shouldTrack || activeSub === this.computed) {
      return;
    }
    let link = this.activeLink;
    if (link === void 0 || link.sub !== activeSub) {
      link = this.activeLink = new Link(activeSub, this);
      if (!activeSub.deps) {
        activeSub.deps = activeSub.depsTail = link;
      } else {
        link.prevDep = activeSub.depsTail;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
      }
      addSub(link);
    } else if (link.version === -1) {
      link.version = this.version;
      if (link.nextDep) {
        const next = link.nextDep;
        next.prevDep = link.prevDep;
        if (link.prevDep) {
          link.prevDep.nextDep = next;
        }
        link.prevDep = activeSub.depsTail;
        link.nextDep = void 0;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
        if (activeSub.deps === link) {
          activeSub.deps = next;
        }
      }
    }
    return link;
  }
  trigger(debugInfo) {
    this.version++;
    globalVersion++;
    this.notify(debugInfo);
  }
  notify(debugInfo) {
    startBatch();
    try {
      if (false) ;
      for (let link = this.subs; link; link = link.prevSub) {
        if (link.sub.notify()) {
          ;
          link.sub.dep.notify();
        }
      }
    } finally {
      endBatch();
    }
  }
}
function addSub(link) {
  link.dep.sc++;
  if (link.sub.flags & 4) {
    const computed2 = link.dep.computed;
    if (computed2 && !link.dep.subs) {
      computed2.flags |= 4 | 16;
      for (let l = computed2.deps; l; l = l.nextDep) {
        addSub(l);
      }
    }
    const currentTail = link.dep.subs;
    if (currentTail !== link) {
      link.prevSub = currentTail;
      if (currentTail) currentTail.nextSub = link;
    }
    link.dep.subs = link;
  }
}
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol(
  ""
);
const MAP_KEY_ITERATE_KEY = Symbol(
  ""
);
const ARRAY_ITERATE_KEY = Symbol(
  ""
);
function track(target, type, key) {
  if (shouldTrack && activeSub) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = new Dep());
      dep.map = depsMap;
      dep.key = key;
    }
    {
      dep.track();
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    globalVersion++;
    return;
  }
  const run = (dep) => {
    if (dep) {
      {
        dep.trigger();
      }
    }
  };
  startBatch();
  if (type === "clear") {
    depsMap.forEach(run);
  } else {
    const targetIsArray = isArray$1(target);
    const isArrayIndex = targetIsArray && isIntegerKey(key);
    if (targetIsArray && key === "length") {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
          run(dep);
        }
      });
    } else {
      if (key !== void 0 || depsMap.has(void 0)) {
        run(depsMap.get(key));
      }
      if (isArrayIndex) {
        run(depsMap.get(ARRAY_ITERATE_KEY));
      }
      switch (type) {
        case "add":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isArrayIndex) {
            run(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            run(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
  }
  endBatch();
}
function reactiveReadArray(array) {
  const raw = toRaw(array);
  if (raw === array) return raw;
  track(raw, "iterate", ARRAY_ITERATE_KEY);
  return isShallow(array) ? raw : raw.map(toReactive);
}
function shallowReadArray(arr) {
  track(arr = toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
  return arr;
}
function toWrapped(target, item) {
  if (isReadonly(target)) {
    return isReactive(target) ? toReadonly(toReactive(item)) : toReadonly(item);
  }
  return toReactive(item);
}
const arrayInstrumentations = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator(this, Symbol.iterator, (item) => toWrapped(this, item));
  },
  concat(...args) {
    return reactiveReadArray(this).concat(
      ...args.map((x) => isArray$1(x) ? reactiveReadArray(x) : x)
    );
  },
  entries() {
    return iterator(this, "entries", (value) => {
      value[1] = toWrapped(this, value[1]);
      return value;
    });
  },
  every(fn, thisArg) {
    return apply(this, "every", fn, thisArg, void 0, arguments);
  },
  filter(fn, thisArg) {
    return apply(
      this,
      "filter",
      fn,
      thisArg,
      (v) => v.map((item) => toWrapped(this, item)),
      arguments
    );
  },
  find(fn, thisArg) {
    return apply(
      this,
      "find",
      fn,
      thisArg,
      (item) => toWrapped(this, item),
      arguments
    );
  },
  findIndex(fn, thisArg) {
    return apply(this, "findIndex", fn, thisArg, void 0, arguments);
  },
  findLast(fn, thisArg) {
    return apply(
      this,
      "findLast",
      fn,
      thisArg,
      (item) => toWrapped(this, item),
      arguments
    );
  },
  findLastIndex(fn, thisArg) {
    return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(fn, thisArg) {
    return apply(this, "forEach", fn, thisArg, void 0, arguments);
  },
  includes(...args) {
    return searchProxy(this, "includes", args);
  },
  indexOf(...args) {
    return searchProxy(this, "indexOf", args);
  },
  join(separator) {
    return reactiveReadArray(this).join(separator);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...args) {
    return searchProxy(this, "lastIndexOf", args);
  },
  map(fn, thisArg) {
    return apply(this, "map", fn, thisArg, void 0, arguments);
  },
  pop() {
    return noTracking(this, "pop");
  },
  push(...args) {
    return noTracking(this, "push", args);
  },
  reduce(fn, ...args) {
    return reduce(this, "reduce", fn, args);
  },
  reduceRight(fn, ...args) {
    return reduce(this, "reduceRight", fn, args);
  },
  shift() {
    return noTracking(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(fn, thisArg) {
    return apply(this, "some", fn, thisArg, void 0, arguments);
  },
  splice(...args) {
    return noTracking(this, "splice", args);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(comparer) {
    return reactiveReadArray(this).toSorted(comparer);
  },
  toSpliced(...args) {
    return reactiveReadArray(this).toSpliced(...args);
  },
  unshift(...args) {
    return noTracking(this, "unshift", args);
  },
  values() {
    return iterator(this, "values", (item) => toWrapped(this, item));
  }
};
function iterator(self2, method, wrapValue) {
  const arr = shallowReadArray(self2);
  const iter = arr[method]();
  if (arr !== self2 && !isShallow(self2)) {
    iter._next = iter.next;
    iter.next = () => {
      const result = iter._next();
      if (!result.done) {
        result.value = wrapValue(result.value);
      }
      return result;
    };
  }
  return iter;
}
const arrayProto = Array.prototype;
function apply(self2, method, fn, thisArg, wrappedRetFn, args) {
  const arr = shallowReadArray(self2);
  const needsWrap = arr !== self2 && !isShallow(self2);
  const methodFn = arr[method];
  if (methodFn !== arrayProto[method]) {
    const result2 = methodFn.apply(self2, args);
    return needsWrap ? toReactive(result2) : result2;
  }
  let wrappedFn = fn;
  if (arr !== self2) {
    if (needsWrap) {
      wrappedFn = function(item, index) {
        return fn.call(this, toWrapped(self2, item), index, self2);
      };
    } else if (fn.length > 2) {
      wrappedFn = function(item, index) {
        return fn.call(this, item, index, self2);
      };
    }
  }
  const result = methodFn.call(arr, wrappedFn, thisArg);
  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self2, method, fn, args) {
  const arr = shallowReadArray(self2);
  let wrappedFn = fn;
  if (arr !== self2) {
    if (!isShallow(self2)) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, toWrapped(self2, item), index, self2);
      };
    } else if (fn.length > 3) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, item, index, self2);
      };
    }
  }
  return arr[method](wrappedFn, ...args);
}
function searchProxy(self2, method, args) {
  const arr = toRaw(self2);
  track(arr, "iterate", ARRAY_ITERATE_KEY);
  const res = arr[method](...args);
  if ((res === -1 || res === false) && isProxy(args[0])) {
    args[0] = toRaw(args[0]);
    return arr[method](...args);
  }
  return res;
}
function noTracking(self2, method, args = []) {
  pauseTracking();
  startBatch();
  const res = toRaw(self2)[method].apply(self2, args);
  endBatch();
  resetTracking();
  return res;
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
function hasOwnProperty(key) {
  if (!isSymbol(key)) key = String(key);
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    if (key === "__v_skip") return target["__v_skip"];
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2) {
      let fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) {
        return fn;
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(
      target,
      key,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      isRef(target) ? target : receiver
    );
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      const value = targetIsArray && isIntegerKey(key) ? res : res.value;
      return isReadonly2 && isObject(value) ? readonly(value) : value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    const isArrayWithIntegerKey = isArray$1(target) && isIntegerKey(key);
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArrayWithIntegerKey && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return true;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArrayWithIntegerKey ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(
      target,
      key,
      value,
      isRef(target) ? target : receiver
    );
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray$1(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    return true;
  }
  deleteProperty(target, key) {
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations(readonly2, shallow) {
  const instrumentations = {
    get(key) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "get", key);
        }
        track(rawTarget, "get", rawKey);
      }
      const { has } = getProto(rawTarget);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      if (has.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    },
    get size() {
      const target = this["__v_raw"];
      !readonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
      return target.size;
    },
    has(key) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "has", key);
        }
        track(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    },
    forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = toRaw(target);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      !readonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    }
  };
  extend(
    instrumentations,
    readonly2 ? {
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear")
    } : {
      add(value) {
        if (!shallow && !isShallow(value) && !isReadonly(value)) {
          value = toRaw(value);
        }
        const target = toRaw(this);
        const proto = getProto(target);
        const hadKey = proto.has.call(target, value);
        if (!hadKey) {
          target.add(value);
          trigger(target, "add", value, value);
        }
        return this;
      },
      set(key, value) {
        if (!shallow && !isShallow(value) && !isReadonly(value)) {
          value = toRaw(value);
        }
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = toRaw(key);
          hadKey = has.call(target, key);
        }
        const oldValue = get.call(target, key);
        target.set(key, value);
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value);
        }
        return this;
      },
      delete(key) {
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = toRaw(key);
          hadKey = has.call(target, key);
        }
        get ? get.call(target, key) : void 0;
        const result = target.delete(key);
        if (hadKey) {
          trigger(target, "delete", key, void 0);
        }
        return result;
      },
      clear() {
        const target = toRaw(this);
        const hadItems = target.size !== 0;
        const result = target.clear();
        if (hadItems) {
          trigger(
            target,
            "clear",
            void 0,
            void 0
          );
        }
        return result;
      }
    }
  );
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    instrumentations[method] = createIterableMethod(method, readonly2, shallow);
  });
  return instrumentations;
}
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = createInstrumentations(isReadonly2, shallow);
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return value ? !!value["__v_raw"] : false;
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;
function isRef(r) {
  return r ? r["__v_isRef"] === true : false;
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, isShallow2) {
    this.dep = new Dep();
    this["__v_isRef"] = true;
    this["__v_isShallow"] = false;
    this._rawValue = isShallow2 ? value : toRaw(value);
    this._value = isShallow2 ? value : toReactive(value);
    this["__v_isShallow"] = isShallow2;
  }
  get value() {
    {
      this.dep.track();
    }
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._rawValue;
    const useDirectValue = this["__v_isShallow"] || isShallow(newValue) || isReadonly(newValue);
    newValue = useDirectValue ? newValue : toRaw(newValue);
    if (hasChanged(newValue, oldValue)) {
      this._rawValue = newValue;
      this._value = useDirectValue ? newValue : toReactive(newValue);
      {
        this.dep.trigger();
      }
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class ComputedRefImpl {
  constructor(fn, setter, isSSR) {
    this.fn = fn;
    this.setter = setter;
    this._value = void 0;
    this.dep = new Dep(this);
    this.__v_isRef = true;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 16;
    this.globalVersion = globalVersion - 1;
    this.next = void 0;
    this.effect = this;
    this["__v_isReadonly"] = !setter;
    this.isSSR = isSSR;
  }
  /**
   * @internal
   */
  notify() {
    this.flags |= 16;
    if (!(this.flags & 8) && // avoid infinite self recursion
    activeSub !== this) {
      batch(this, true);
      return true;
    }
  }
  get value() {
    const link = this.dep.track();
    refreshComputed(this);
    if (link) {
      link.version = this.dep.version;
    }
    return this._value;
  }
  set value(newValue) {
    if (this.setter) {
      this.setter(newValue);
    }
  }
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, isSSR);
  return cRef;
}
const INITIAL_WATCHER_VALUE = {};
const cleanupMap = /* @__PURE__ */ new WeakMap();
let activeWatcher = void 0;
function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
  if (owner) {
    let cleanups = cleanupMap.get(owner);
    if (!cleanups) cleanupMap.set(owner, cleanups = []);
    cleanups.push(cleanupFn);
  }
}
function watch$1(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, once, scheduler, augmentJob, call } = options;
  const reactiveGetter = (source2) => {
    if (deep) return source2;
    if (isShallow(source2) || deep === false || deep === 0)
      return traverse(source2, 1);
    return traverse(source2);
  };
  let effect2;
  let getter;
  let cleanup;
  let boundCleanup;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return reactiveGetter(s);
      } else if (isFunction(s)) {
        return call ? call(s, 2) : s();
      } else ;
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = call ? () => call(source, 2) : source;
    } else {
      getter = () => {
        if (cleanup) {
          pauseTracking();
          try {
            cleanup();
          } finally {
            resetTracking();
          }
        }
        const currentEffect = activeWatcher;
        activeWatcher = effect2;
        try {
          return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
        } finally {
          activeWatcher = currentEffect;
        }
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    const depth = deep === true ? Infinity : deep;
    getter = () => traverse(baseGetter(), depth);
  }
  const scope = getCurrentScope();
  const watchHandle = () => {
    effect2.stop();
    if (scope && scope.active) {
      remove(scope.effects, effect2);
    }
  };
  if (once && cb) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      watchHandle();
    };
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = (immediateFirstRun) => {
    if (!(effect2.flags & 1) || !effect2.dirty && !immediateFirstRun) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
        if (cleanup) {
          cleanup();
        }
        const currentWatcher = activeWatcher;
        activeWatcher = effect2;
        try {
          const args = [
            newValue,
            // pass undefined as the old value when it's changed for the first time
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
            boundCleanup
          ];
          oldValue = newValue;
          call ? call(cb, 3, args) : (
            // @ts-expect-error
            cb(...args)
          );
        } finally {
          activeWatcher = currentWatcher;
        }
      }
    } else {
      effect2.run();
    }
  };
  if (augmentJob) {
    augmentJob(job);
  }
  effect2 = new ReactiveEffect(getter);
  effect2.scheduler = scheduler ? () => scheduler(job, false) : job;
  boundCleanup = (fn) => onWatcherCleanup(fn, false, effect2);
  cleanup = effect2.onStop = () => {
    const cleanups = cleanupMap.get(effect2);
    if (cleanups) {
      if (call) {
        call(cleanups, 4);
      } else {
        for (const cleanup2 of cleanups) cleanup2();
      }
      cleanupMap.delete(effect2);
    }
  };
  if (cb) {
    if (immediate) {
      job(true);
    } else {
      oldValue = effect2.run();
    }
  } else if (scheduler) {
    scheduler(job.bind(null, true), true);
  } else {
    effect2.run();
  }
  watchHandle.pause = effect2.pause.bind(effect2);
  watchHandle.resume = effect2.resume.bind(effect2);
  watchHandle.stop = watchHandle;
  return watchHandle;
}
function traverse(value, depth = Infinity, seen) {
  if (depth <= 0 || !isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Map();
  if ((seen.get(value) || 0) >= depth) {
    return value;
  }
  seen.set(value, depth);
  depth--;
  if (isRef(value)) {
    traverse(value.value, depth, seen);
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, depth, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], depth, seen);
    }
    for (const key of Object.getOwnPropertySymbols(value)) {
      if (Object.prototype.propertyIsEnumerable.call(value, key)) {
        traverse(value[key], depth, seen);
      }
    }
  }
  return value;
}
/**
* @vue/runtime-core v3.5.25
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const stack = [];
let isWarning = false;
function warn$1(msg, ...args) {
  if (isWarning) return;
  isWarning = true;
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        msg + args.map((a) => {
          var _a, _b;
          return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
  isWarning = false;
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  if (isArray$1(fn)) {
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  }
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    if (errorHandler) {
      pauseTracking();
      callWithErrorHandling(errorHandler, null, 10, [
        err,
        exposedInstance,
        errorInfo
      ]);
      resetTracking();
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
}
function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
  if (throwInProd) {
    throw err;
  } else {
    console.error(err);
  }
}
const queue = [];
let flushIndex = -1;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex$1(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!(job.flags & 1)) {
    const jobId = getId(job);
    const lastJob = queue[queue.length - 1];
    if (!lastJob || // fast path when the job id is larger than the tail
    !(job.flags & 2) && jobId >= getId(lastJob)) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex$1(jobId), 0, job);
    }
    job.flags |= 1;
    queueFlush();
  }
}
function queueFlush() {
  if (!currentFlushPromise) {
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$1(cb)) {
    if (activePostFlushCbs && cb.id === -1) {
      activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
    } else if (!(cb.flags & 1)) {
      pendingPostFlushCbs.push(cb);
      cb.flags |= 1;
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i = flushIndex + 1) {
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.flags & 2) {
      if (instance && cb.id !== instance.uid) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      cb();
      if (!(cb.flags & 4)) {
        cb.flags &= -2;
      }
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a, b) => getId(a) - getId(b)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      const cb = activePostFlushCbs[postFlushIndex];
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      if (!(cb.flags & 8)) cb();
      cb.flags &= -2;
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
function flushJobs(seen) {
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && !(job.flags & 8)) {
        if (false) ;
        if (job.flags & 4) {
          job.flags &= ~1;
        }
        callWithErrorHandling(
          job,
          job.i,
          job.i ? 15 : 14
        );
        if (!(job.flags & 4)) {
          job.flags &= ~1;
        }
      }
    }
  } finally {
    for (; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job) {
        job.flags &= -2;
      }
    }
    flushIndex = -1;
    queue.length = 0;
    flushPostFlushCbs();
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs();
    }
  }
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx) return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
const TeleportEndKey = Symbol("_vte");
const isTeleport = (type) => type.__isTeleport;
const leaveCbKey = Symbol("_leaveCb");
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    vnode.transition = hooks;
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
  return isFunction(options) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}
function markAsyncBoundary(instance) {
  instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0];
}
const pendingSetRefMap = /* @__PURE__ */ new WeakMap();
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$1(rawRef)) {
    rawRef.forEach(
      (r, i) => setRef(
        r,
        oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) {
      setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
    }
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref3 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  const rawSetupState = toRaw(setupState);
  const canSetSetupRef = setupState === EMPTY_OBJ ? NO : (key) => {
    return hasOwn(rawSetupState, key);
  };
  if (oldRef != null && oldRef !== ref3) {
    invalidatePendingSetRef(oldRawRef);
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (canSetSetupRef(oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      {
        oldRef.value = null;
      }
      const oldRawRefAtom = oldRawRef;
      if (oldRawRefAtom.k) refs[oldRawRefAtom.k] = null;
    }
  }
  if (isFunction(ref3)) {
    callWithErrorHandling(ref3, owner, 12, [value, refs]);
  } else {
    const _isString = isString(ref3);
    const _isRef = isRef(ref3);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? canSetSetupRef(ref3) ? setupState[ref3] : refs[ref3] : ref3.value;
          if (isUnmount) {
            isArray$1(existing) && remove(existing, refValue);
          } else {
            if (!isArray$1(existing)) {
              if (_isString) {
                refs[ref3] = [refValue];
                if (canSetSetupRef(ref3)) {
                  setupState[ref3] = refs[ref3];
                }
              } else {
                const newVal = [refValue];
                {
                  ref3.value = newVal;
                }
                if (rawRef.k) refs[rawRef.k] = newVal;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref3] = value;
          if (canSetSetupRef(ref3)) {
            setupState[ref3] = value;
          }
        } else if (_isRef) {
          {
            ref3.value = value;
          }
          if (rawRef.k) refs[rawRef.k] = value;
        } else ;
      };
      if (value) {
        const job = () => {
          doSet();
          pendingSetRefMap.delete(rawRef);
        };
        job.id = -1;
        pendingSetRefMap.set(rawRef, job);
        queuePostRenderEffect(job, parentSuspense);
      } else {
        invalidatePendingSetRef(rawRef);
        doSet();
      }
    }
  }
}
function invalidatePendingSetRef(rawRef) {
  const pendingSetRef = pendingSetRefMap.get(rawRef);
  if (pendingSetRef) {
    pendingSetRef.flags |= 8;
    pendingSetRefMap.delete(rawRef);
  }
}
getGlobalThis().requestIdleCallback || ((cb) => setTimeout(cb, 1));
getGlobalThis().cancelIdleCallback || ((id) => clearTimeout(id));
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => {
  if (!isInSSRComponentSetup || lifecycle === "sp") {
    injectHook(lifecycle, (...args) => hook(...args), target);
  }
};
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook(
  "bu"
);
const onUpdated = createHook("u");
const onBeforeUnmount = createHook(
  "bum"
);
const onUnmounted = createHook("um");
const onServerPrefetch = createHook(
  "sp"
);
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache;
  const sourceIsArray = isArray$1(source);
  if (sourceIsArray || isString(source)) {
    const sourceIsReactiveArray = sourceIsArray && isReactive(source);
    let needsWrap = false;
    let isReadonlySource = false;
    if (sourceIsReactiveArray) {
      needsWrap = !isShallow(source);
      isReadonlySource = isReadonly(source);
      source = shallowReadArray(source);
    }
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(
        needsWrap ? isReadonlySource ? toReadonly(toReactive(source[i])) : toReactive(source[i]) : source[i],
        i,
        void 0,
        cached
      );
    }
  } else if (typeof source === "number") {
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(
        source,
        (item, i) => renderItem(item, i, void 0, cached)
      );
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  if (currentRenderingInstance.ce || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.ce) {
    const hasProps = Object.keys(props).length > 0;
    return openBlock(), createBlock(
      Fragment,
      null,
      [createVNode("slot", props, fallback)],
      hasProps ? -2 : 64
    );
  }
  let slot = slots[name];
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const slotKey = props.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  validSlotContent && validSlotContent.key;
  const rendered = createBlock(
    Fragment,
    {
      key: (slotKey && !isSymbol(slotKey) ? slotKey : `_${name}`) + // #7256 force differentiate fallback content from actual content
      (!validSlotContent && fallback ? "_fb" : "")
    },
    validSlotContent || [],
    validSlotContent && slots._ === 1 ? 64 : -2
  );
  if (rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child)) return true;
    if (child.type === Comment) return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
const getPublicInstance = (i) => {
  if (!i) return null;
  if (isStatefulComponent(i)) return getComponentPublicInstance(i);
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => i.props,
    $attrs: (i) => i.attrs,
    $slots: (i) => i.slots,
    $refs: (i) => i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $host: (i) => i.ce,
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => {
      queueJob(i.update);
    }),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => instanceWatch.bind(i)
  })
);
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    if (key === "__v_skip") {
      return true;
    }
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (hasOwn(props, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance.attrs, "get", "");
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, props, type }
  }, key) {
    let cssModules;
    return !!(accessCache[key] || data !== EMPTY_OBJ && key[0] !== "$" && hasOwn(data, key) || hasSetupBinding(setupState, key) || hasOwn(props, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key) || (cssModules = type.__cssModules) && cssModules[key]);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
function normalizePropsOrEmits(props) {
  return isArray$1(props) ? props.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props;
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject(data)) ;
    else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get,
        set
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val,
          enumerable: true
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components) instance.components = components;
  if (directives) instance.directives = directives;
  if (serverPrefetch) {
    markAsyncBoundary(instance);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      {
        watch(getter, handler);
      }
    }
  } else if (isFunction(raw)) {
    {
      watch(getter, raw.bind(publicThis));
    }
  } else if (isObject(raw)) {
    if (isArray$1(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else ;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m) => mergeOptions$1(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions$1(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions$1(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions$1(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions$1(to, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray$1(to) && isArray$1(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to) return from;
  if (!from) return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const pluginCleanupFns = [];
    let isMounted = false;
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) ;
        else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else ;
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, namespace) {
        if (!isMounted) {
          const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (namespace === true) {
            namespace = "svg";
          } else if (namespace === false) {
            namespace = void 0;
          }
          {
            render(vnode, rootContainer, namespace);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          return getComponentPublicInstance(vnode.component);
        }
      },
      onUnmount(cleanupFn) {
        pluginCleanupFns.push(cleanupFn);
      },
      unmount() {
        if (isMounted) {
          callWithAsyncErrorHandling(
            pluginCleanupFns,
            app._instance,
            16
          );
          render(null, app._container);
          delete app._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app;
  };
}
let currentApp = null;
function provide(key, value) {
  if (currentInstance) {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = getCurrentInstance();
  if (instance || currentApp) {
    let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else ;
  }
}
const ssrContextKey = Symbol.for("v-scx");
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    return ctx;
  }
};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, flush, once } = options;
  const baseWatchOptions = extend({}, options);
  const runsImmediately = cb && immediate || !cb && flush !== "post";
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else if (!runsImmediately) {
      const watchStopHandle = () => {
      };
      watchStopHandle.stop = NOOP;
      watchStopHandle.resume = NOOP;
      watchStopHandle.pause = NOOP;
      return watchStopHandle;
    }
  }
  const instance = currentInstance;
  baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
  let isPre = false;
  if (flush === "post") {
    baseWatchOptions.scheduler = (job) => {
      queuePostRenderEffect(job, instance && instance.suspense);
    };
  } else if (flush !== "sync") {
    isPre = true;
    baseWatchOptions.scheduler = (job, isFirstRun) => {
      if (isFirstRun) {
        job();
      } else {
        queueJob(job);
      }
    };
  }
  baseWatchOptions.augmentJob = (job) => {
    if (cb) {
      job.flags |= 4;
    }
    if (isPre) {
      job.flags |= 2;
      if (instance) {
        job.id = instance.uid;
        job.i = instance;
      }
    }
  };
  const watchHandle = watch$1(source, cb, baseWatchOptions);
  if (isInSSRComponentSetup) {
    if (ssrCleanup) {
      ssrCleanup.push(watchHandle);
    } else if (runsImmediately) {
      watchHandle();
    }
  }
  return watchHandle;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
const getModelModifiers = (props, modelName) => {
  return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
};
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted) return;
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modifiers = isModelListener2 && getModelModifiers(props, event.slice(7));
  if (modifiers) {
    if (modifiers.trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (modifiers.number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
const mixinEmitsCache = /* @__PURE__ */ new WeakMap();
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = asMixin ? mixinEmitsCache : appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    props,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  const prev = setCurrentRenderingInstance(instance);
  let result;
  let fallthroughAttrs;
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      const thisProxy = false ? new Proxy(proxyToUse, {
        get(target, key, receiver) {
          warn$1(
            `Property '${String(
              key
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          );
          return Reflect.get(target, key, receiver);
        }
      }) : proxyToUse;
      result = normalizeVNode(
        render.call(
          thisProxy,
          proxyToUse,
          renderCache,
          false ? shallowReadonly(props) : props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false) ;
      result = normalizeVNode(
        render2.length > 1 ? render2(
          false ? shallowReadonly(props) : props,
          false ? {
            get attrs() {
              markAttrsAccessed();
              return shallowReadonly(attrs);
            },
            slots,
            emit: emit2
          } : { attrs, slots, emit: emit2 }
        ) : render2(
          false ? shallowReadonly(props) : props,
          null
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs, false, true);
      }
    }
  }
  if (vnode.dirs) {
    root = cloneVNode(root, null, false, true);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    setTransitionHooks(root, vnode.transition);
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent) {
    const root = parent.subTree;
    if (root.suspense && root.suspense.activeBranch === vnode) {
      root.el = vnode.el;
    }
    if (root === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    } else {
      break;
    }
  }
}
const internalObjectProto = {};
const createInternalObject = () => Object.create(internalObjectProto);
const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = createInternalObject();
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance.attrs, "set", "");
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
      if (instance.ce) {
        instance.ce._setProp(key, value);
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
const mixinPropsCache = /* @__PURE__ */ new WeakMap();
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = asMixin ? mixinPropsCache : appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys) needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        const propType = prop.type;
        let shouldCast = false;
        let shouldCastTrue = true;
        if (isArray$1(propType)) {
          for (let index = 0; index < propType.length; ++index) {
            const type = propType[index];
            const typeName = isFunction(type) && type.name;
            if (typeName === "Boolean") {
              shouldCast = true;
              break;
            } else if (typeName === "String") {
              shouldCastTrue = false;
            }
          }
        } else {
          shouldCast = isFunction(propType) && propType.name === "Boolean";
        }
        prop[
          0
          /* shouldCast */
        ] = shouldCast;
        prop[
          1
          /* shouldCastTrue */
        ] = shouldCastTrue;
        if (shouldCast || hasOwn(prop, "default")) {
          needCastKeys.push(normalizedKey);
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  }
  return false;
}
const isInternalKey = (key) => key === "_" || key === "_ctx" || key === "$stable";
const normalizeSlotValue = (value) => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot$1 = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (false) ;
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key)) continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot$1(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const assignSlots = (slots, children, optimized) => {
  for (const key in children) {
    if (optimized || !isInternalKey(key)) {
      slots[key] = children[key];
    }
  }
};
const initSlots = (instance, children, optimized) => {
  const slots = instance.slots = createInternalObject();
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      assignSlots(slots, children, optimized);
      if (optimized) {
        def(slots, "_", type, true);
      }
    } else {
      normalizeObjectSlots(children, slots);
    }
  } else if (children) {
    normalizeVNodeSlots(instance, children);
  }
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        assignSlots(slots, children, optimized);
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
        delete slots[key];
      }
    }
  }
};
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref3, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, namespace);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else ;
    }
    if (ref3 != null && parentComponent) {
      setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    } else if (ref3 == null && n1 && n1.ref != null) {
      setRef(n1.ref, null, parentSuspense, n1, true);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, namespace) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      namespace,
      n2.el,
      n2.anchor
    );
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    if (n2.type === "svg") {
      namespace = "svg";
    } else if (n2.type === "math") {
      namespace = "mathml";
    }
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      const customElement = !!(n1.el && n1.el._isVueCE) ? n1.el : null;
      try {
        if (customElement) {
          customElement._beginPatch();
        }
        patchElement(
          n1,
          n2,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } finally {
        if (customElement) {
          customElement._endPatch();
        }
      }
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      namespace,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(vnode, namespace),
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props[key], namespace, parentComponent);
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value, namespace);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = needTransition(parentSuspense, transition);
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
      hostSetElementText(el, "");
    }
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds
      );
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, oldProps, newProps, parentComponent, namespace);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, namespace);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, namespace, parentComponent);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, oldProps, newProps, parentComponent, namespace);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64 | 128)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              namespace,
              parentComponent
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key)) continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, namespace, parentComponent);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        n2.children || [],
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          namespace,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
    const instance = initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    );
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance, false, optimized);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
        initialVNode.placeholder = placeholder.el;
      }
    } else {
      setupRenderEffect(
        instance,
        initialVNode,
        container,
        anchor,
        parentSuspense,
        namespace,
        optimized
      );
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent, root, type } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        {
          if (root.ce && // @ts-expect-error _def is private
          root.ce._def.shadowRoot !== false) {
            root.ce._injectChildStyle(type);
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            namespace
          );
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        {
          const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
          if (nonHydratedAsyncRoot) {
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            }
            nonHydratedAsyncRoot.asyncDep.then(() => {
              if (!instance.isUnmounted) {
                componentUpdateFn();
              }
            });
            return;
          }
        }
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          namespace
        );
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
      }
    };
    instance.scope.on();
    const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn);
    instance.scope.off();
    const update = instance.update = effect2.run.bind(effect2);
    const job = instance.job = effect2.runIfDirty.bind(effect2);
    job.i = instance;
    job.id = instance.uid;
    effect2.scheduler = () => queueJob(job);
    toggleRecurse(instance, true);
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(instance);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchorVNode = c2[nextIndex + 1];
        const anchor = nextIndex + 1 < l2 ? (
          // #13559, fallback to el placeholder for unresolved async component
          anchorVNode.el || anchorVNode.placeholder
        ) : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition2) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => {
          if (vnode.ctx.isUnmounted) {
            hostRemove(el);
          } else {
            hostInsert(el, container, anchor);
          }
        };
        const performLeave = () => {
          if (el._isLeaving) {
            el[leaveCbKey](
              true
              /* cancelled */
            );
          }
          leave(el, () => {
            remove22();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref: ref3,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs,
      cacheIndex
    } = vnode;
    if (patchFlag === -2) {
      optimized = false;
    }
    if (ref3 != null) {
      pauseTracking();
      setRef(ref3, null, parentSuspense, vnode, true);
      resetTracking();
    }
    if (cacheIndex != null) {
      parentComponent.renderCache[cacheIndex] = void 0;
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !dynamicChildren.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, job, subTree, um, m, a } = instance;
    invalidateMount(m);
    invalidateMount(a);
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (job) {
      job.flags |= 8;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    const el = hostNextSibling(vnode.anchor || vnode.el);
    const teleportEnd = el && el[TeleportEndKey];
    return teleportEnd ? hostNextSibling(teleportEnd) : el;
  };
  let isFlushing = false;
  const render = (vnode, container, namespace) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(
        container._vnode || null,
        vnode,
        container,
        null,
        null,
        null,
        namespace
      );
    }
    container._vnode = vnode;
    if (!isFlushing) {
      isFlushing = true;
      flushPreFlushCbs();
      flushPostFlushCbs();
      isFlushing = false;
    }
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  return {
    render,
    hydrate,
    createApp: createAppAPI(render)
  };
}
function resolveChildrenNamespace({ type, props }, currentNamespace) {
  return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse({ effect: effect2, job }, allowed) {
  if (allowed) {
    effect2.flags |= 32;
    job.flags |= 4;
  } else {
    effect2.flags &= -33;
    job.flags &= -5;
  }
}
function needTransition(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$1(ch1) && isArray$1(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow && c2.patchFlag !== -2)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text && // avoid cached text nodes retaining detached dom nodes
      c2.patchFlag !== -1) {
        c2.el = c1.el;
      }
      if (c2.type === Comment && !c2.el) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
function locateNonHydratedAsyncRoot(instance) {
  const subComponent = instance.subTree.component;
  if (subComponent) {
    if (subComponent.asyncDep && !subComponent.asyncResolved) {
      return subComponent;
    } else {
      return locateNonHydratedAsyncRoot(subComponent);
    }
  }
}
function invalidateMount(hooks) {
  if (hooks) {
    for (let i = 0; i < hooks.length; i++)
      hooks[i].flags |= 8;
  }
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$1(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value, inVOnce = false) {
  isBlockTreeEnabled += value;
  if (value < 0 && currentBlock && inVOnce) {
    currentBlock.hasOnce = true;
  }
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
    )
  );
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      true
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref: ref3,
  ref_key,
  ref_for
}) => {
  if (typeof ref3 === "number") {
    ref3 = "" + ref3;
  }
  return ref3 != null ? isString(ref3) || isRef(ref3) || isFunction(ref3) ? { i: currentRenderingInstance, r: ref3, k: ref_key, f: !!ref_for } : ref3 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag = -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray$1(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props) return null;
  return isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
  const { props, ref: ref3, patchFlag, children, transition } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref3 ? isArray$1(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref3,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetStart: vnode.targetStart,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    placeholder: vnode.placeholder,
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  if (transition && cloneTransition) {
    setTransitionHooks(
      cloned,
      transition.clone(cloned)
    );
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray$1(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (isVNode(child)) {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray$1(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !isInternalObject(children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    ids: parent ? parent.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  const g = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g[key])) setters = g[key] = [];
    setters.push(setter);
    return (v) => {
      if (setters.length > 1) setters.forEach((set) => set(v));
      else setters[0](v);
    };
  };
  internalSetCurrentInstance = registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v) => currentInstance = v
  );
  setInSSRSetupState = registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v) => isInSSRComponentSetup = v
  );
}
const setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false, optimized = false) {
  isSSR && setInSSRSetupState(isSSR);
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children, optimized || isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  const { setup } = Component;
  if (setup) {
    pauseTracking();
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        instance.props,
        setupContext
      ]
    );
    const isAsyncSetup = isPromise(setupResult);
    resetTracking();
    reset();
    if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) {
      markAsyncBoundary(instance);
    }
    if (isAsyncSetup) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult);
    }
  } else {
    finishComponentSetup(instance);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else ;
  finishComponentSetup(instance);
}
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    instance.render = Component.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
}
const attrsProxyHandlers = {
  get(target, key) {
    track(target, "get", "");
    return target[key];
  }
};
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  {
    return {
      attrs: new Proxy(instance.attrs, attrsProxyHandlers),
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getComponentPublicInstance(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  } else {
    return instance.proxy;
  }
}
const classifyRE = /(?:^|[-_])\w/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components) || instance.parent && inferFromRegistry(
      instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  const c = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  return c;
};
function h(type, propsOrChildren, children) {
  try {
    setBlockTracking(-1);
    const l = arguments.length;
    if (l === 2) {
      if (isObject(propsOrChildren) && !isArray$1(propsOrChildren)) {
        if (isVNode(propsOrChildren)) {
          return createVNode(type, null, [propsOrChildren]);
        }
        return createVNode(type, propsOrChildren);
      } else {
        return createVNode(type, null, propsOrChildren);
      }
    } else {
      if (l > 3) {
        children = Array.prototype.slice.call(arguments, 2);
      } else if (l === 3 && isVNode(children)) {
        children = [children];
      }
      return createVNode(type, propsOrChildren, children);
    }
  } finally {
    setBlockTracking(1);
  }
}
const version = "3.5.25";
/**
* @vue/runtime-dom v3.5.25
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let policy = void 0;
const tt = typeof window !== "undefined" && window.trustedTypes;
if (tt) {
  try {
    policy = /* @__PURE__ */ tt.createPolicy("vue", {
      createHTML: (val) => val
    });
  } catch (e) {
  }
}
const unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
const svgNS = "http://www.w3.org/2000/svg";
const mathmlNS = "http://www.w3.org/1998/Math/MathML";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, namespace, is, props) => {
    const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, namespace, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling)) break;
      }
    } else {
      templateContainer.innerHTML = unsafeToTrustedHTML(
        namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content
      );
      const template = templateContainer.content;
      if (namespace === "svg" || namespace === "mathml") {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
const vtcKey = Symbol("_vtc");
function patchClass(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
const vShowOriginalDisplay = Symbol("_vod");
const vShowHidden = Symbol("_vsh");
const CSS_VAR_TEXT = Symbol("");
const displayRE = /(?:^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  let hasControlledDisplay = false;
  if (next && !isCssString) {
    if (prev) {
      if (!isString(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      } else {
        for (const prevStyle of prev.split(";")) {
          const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
    }
    for (const key in next) {
      if (key === "display") {
        hasControlledDisplay = true;
      }
      setStyle(style, key, next[key]);
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        const cssVarText = style[CSS_VAR_TEXT];
        if (cssVarText) {
          next += ";" + cssVarText;
        }
        style.cssText = next;
        hasControlledDisplay = displayRE.test(next);
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
  }
  if (vShowOriginalDisplay in el) {
    el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
    if (el[vShowHidden]) {
      style.display = "none";
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray$1(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null) val = "";
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(
        key,
        isBoolean ? "" : isSymbol(value) ? String(value) : value
      );
    }
  }
}
function patchDOMProp(el, key, value, parentComponent, attrName) {
  if (key === "innerHTML" || key === "textContent") {
    if (value != null) {
      el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
    }
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
    const newValue = value == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      el.type === "checkbox" ? "on" : ""
    ) : String(value);
    if (oldValue !== newValue || !("_value" in el)) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    el._value = value;
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
  }
  needRemove && el.removeAttribute(attrName || key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
const veiKey = Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(
        nextValue,
        instance
      );
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e, invoker.value),
      instance,
      5,
      [e]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray$1(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map(
      (fn) => (e2) => !e2._stopped && fn && fn(e2)
    );
  } else {
    return value;
  }
}
const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
const patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
  const isSVG = namespace === "svg";
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue);
    if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
      patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
    }
  } else if (
    // #11081 force set props for possible async custom element
    el._isVueCE && (/[A-Z]/.test(key) || !isString(nextValue))
  ) {
    patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && isNativeOn(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") {
    return false;
  }
  if (key === "sandbox" && el.tagName === "IFRAME") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (key === "width" || key === "height") {
    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
      return false;
    }
  }
  if (isNativeOn(key) && isString(value)) {
    return false;
  }
  return key in el;
}
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = ((...args) => {
  const app = ensureRenderer().createApp(...args);
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container) return;
    const component = app._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    if (container.nodeType === 1) {
      container.textContent = "";
    }
    const proxy = mount(container, false, resolveRootNamespace(container));
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app;
});
function resolveRootNamespace(container) {
  if (container instanceof SVGElement) {
    return "svg";
  }
  if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
    return "mathml";
  }
}
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}
// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    domOptions: {
      render: createDebouncedFn(() => renderDOMHead(head), (fn) => setTimeout(fn, 0))
    },
    ...options
  });
  head.install = /* @__PURE__ */ vueInstall(head);
  return head;
}
/*!
 * vue-router v4.6.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
const isBrowser = typeof document !== "undefined";
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function isESModule(obj) {
  return obj.__esModule || obj[Symbol.toStringTag] === "Module" || obj.default && isRouteComponent(obj.default);
}
const assign = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = isArray(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
const noop = () => {
};
const isArray = Array.isArray;
function mergeOptions(defaults, partialOptions) {
  const options = {};
  for (const key in defaults) options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
  return options;
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_CARET_RE = /%5E/g;
const ENC_BACKTICK_RE = /%60/g;
const ENC_CURLY_OPEN_RE = /%7B/g;
const ENC_PIPE_RE = /%7C/g;
const ENC_CURLY_CLOSE_RE = /%7D/g;
const ENC_SPACE_RE = /%20/g;
function commonEncode(text) {
  return text == null ? "" : encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text) {
  return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text) {
  return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(text) {
  return encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text) {
  if (text == null) return null;
  try {
    return decodeURIComponent("" + text);
  } catch (err) {
  }
  return "" + text;
}
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
function parseURL(parseQuery$1, location2, currentLocation = "/") {
  let path, query = {}, searchString = "", hash = "";
  const hashPos = location2.indexOf("#");
  let searchPos = location2.indexOf("?");
  searchPos = hashPos >= 0 && searchPos > hashPos ? -1 : searchPos;
  if (searchPos >= 0) {
    path = location2.slice(0, searchPos);
    searchString = location2.slice(searchPos, hashPos > 0 ? hashPos : location2.length);
    query = parseQuery$1(searchString.slice(1));
  }
  if (hashPos >= 0) {
    path = path || location2.slice(0, hashPos);
    hash = location2.slice(hashPos, location2.length);
  }
  path = resolveRelativePath(path != null ? path : location2, currentLocation);
  return {
    fullPath: path + searchString + hash,
    path,
    query,
    hash: decode(hash)
  };
}
function stringifyURL(stringifyQuery$1, location2) {
  const query = location2.query ? stringifyQuery$1(location2.query) : "";
  return location2.path + (query && "?") + query + (location2.hash || "");
}
function stripBase(pathname, base) {
  if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase())) return pathname;
  return pathname.slice(base.length) || "/";
}
function isSameRouteLocation(stringifyQuery$1, a, b) {
  const aLastIndex = a.matched.length - 1;
  const bLastIndex = b.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery$1(a.query) === stringifyQuery$1(b.query) && a.hash === b.hash;
}
function isSameRouteRecord(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length) return false;
  for (const key in a) if (!isSameRouteLocationParamsValue(a[key], b[key])) return false;
  return true;
}
function isSameRouteLocationParamsValue(a, b) {
  return isArray(a) ? isEquivalentArray(a, b) : isArray(b) ? isEquivalentArray(b, a) : a === b;
}
function isEquivalentArray(a, b) {
  return isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function resolveRelativePath(to, from) {
  if (to.startsWith("/")) return to;
  if (!to) return from;
  const fromSegments = from.split("/");
  const toSegments = to.split("/");
  const lastToSegment = toSegments[toSegments.length - 1];
  if (lastToSegment === ".." || lastToSegment === ".") toSegments.push("");
  let position = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (segment === ".") continue;
    if (segment === "..") {
      if (position > 1) position--;
    } else break;
  }
  return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition).join("/");
}
const START_LOCATION_NORMALIZED = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
let NavigationType = /* @__PURE__ */ (function(NavigationType$1) {
  NavigationType$1["pop"] = "pop";
  NavigationType$1["push"] = "push";
  return NavigationType$1;
})({});
let NavigationDirection = /* @__PURE__ */ (function(NavigationDirection$1) {
  NavigationDirection$1["back"] = "back";
  NavigationDirection$1["forward"] = "forward";
  NavigationDirection$1["unknown"] = "";
  return NavigationDirection$1;
})({});
function normalizeBase(base) {
  if (!base) if (isBrowser) {
    const baseEl = document.querySelector("base");
    base = baseEl && baseEl.getAttribute("href") || "/";
    base = base.replace(/^\w+:\/\/[^\/]+/, "");
  } else base = "/";
  if (base[0] !== "/" && base[0] !== "#") base = "/" + base;
  return removeTrailingSlash(base);
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location2) {
  return base.replace(BEFORE_HASH_RE, "#") + location2;
}
function getElementPosition(el, offset) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset.behavior,
    left: elRect.left - docRect.left - (offset.left || 0),
    top: elRect.top - docRect.top - (offset.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function scrollToPosition(position) {
  let scrollToOptions;
  if ("el" in position) {
    const positionEl = position.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
      return;
    }
    scrollToOptions = getElementPosition(el, position);
  } else scrollToOptions = position;
  if ("scrollBehavior" in document.documentElement.style) window.scrollTo(scrollToOptions);
  else window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.scrollX, scrollToOptions.top != null ? scrollToOptions.top : window.scrollY);
}
function getScrollKey(path, delta) {
  return (history.state ? history.state.position - delta : -1) + path;
}
const scrollPositions = /* @__PURE__ */ new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}
let ErrorTypes = /* @__PURE__ */ (function(ErrorTypes$1) {
  ErrorTypes$1[ErrorTypes$1["MATCHER_NOT_FOUND"] = 1] = "MATCHER_NOT_FOUND";
  ErrorTypes$1[ErrorTypes$1["NAVIGATION_GUARD_REDIRECT"] = 2] = "NAVIGATION_GUARD_REDIRECT";
  ErrorTypes$1[ErrorTypes$1["NAVIGATION_ABORTED"] = 4] = "NAVIGATION_ABORTED";
  ErrorTypes$1[ErrorTypes$1["NAVIGATION_CANCELLED"] = 8] = "NAVIGATION_CANCELLED";
  ErrorTypes$1[ErrorTypes$1["NAVIGATION_DUPLICATED"] = 16] = "NAVIGATION_DUPLICATED";
  return ErrorTypes$1;
})({});
const NavigationFailureSymbol = Symbol("");
({
  [ErrorTypes.MATCHER_NOT_FOUND]({ location: location2, currentLocation }) {
    return `No match for
 ${JSON.stringify(location2)}${currentLocation ? "\nwhile being at\n" + JSON.stringify(currentLocation) : ""}`;
  },
  [ErrorTypes.NAVIGATION_GUARD_REDIRECT]({ from, to }) {
    return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
  },
  [ErrorTypes.NAVIGATION_ABORTED]({ from, to }) {
    return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
  },
  [ErrorTypes.NAVIGATION_CANCELLED]({ from, to }) {
    return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
  },
  [ErrorTypes.NAVIGATION_DUPLICATED]({ from, to }) {
    return `Avoided redundant navigation to current location: "${from.fullPath}".`;
  }
});
function createRouterError(type, params) {
  return assign(/* @__PURE__ */ new Error(), {
    type,
    [NavigationFailureSymbol]: true
  }, params);
}
function isNavigationFailure(error, type) {
  return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
}
const propertiesToLog = [
  "params",
  "query",
  "hash"
];
function stringifyRoute(to) {
  if (typeof to === "string") return to;
  if (to.path != null) return to.path;
  const location2 = {};
  for (const key of propertiesToLog) if (key in to) location2[key] = to[key];
  return JSON.stringify(location2, null, 2);
}
function parseQuery(search) {
  const query = {};
  if (search === "" || search === "?") return query;
  const searchParams = (search[0] === "?" ? search.slice(1) : search).split("&");
  for (let i = 0; i < searchParams.length; ++i) {
    const searchParam = searchParams[i].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!isArray(currentValue)) currentValue = query[key] = [currentValue];
      currentValue.push(value);
    } else query[key] = value;
  }
  return query;
}
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) search += (search.length ? "&" : "") + key;
      continue;
    }
    (isArray(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)]).forEach((value$1) => {
      if (value$1 !== void 0) {
        search += (search.length ? "&" : "") + key;
        if (value$1 != null) search += "=" + value$1;
      }
    });
  }
  return search;
}
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) normalizedQuery[key] = isArray(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
  }
  return normalizedQuery;
}
const matchedRouteKey = Symbol("");
const viewDepthKey = Symbol("");
const routerKey = Symbol("");
const routeLocationKey = Symbol("");
const routerViewLocationKey = Symbol("");
function useCallbacks() {
  let handlers = [];
  function add(handler) {
    handlers.push(handler);
    return () => {
      const i = handlers.indexOf(handler);
      if (i > -1) handlers.splice(i, 1);
    };
  }
  function reset() {
    handlers = [];
  }
  return {
    add,
    list: () => handlers.slice(),
    reset
  };
}
function guardToPromiseFn(guard, to, from, record, name, runWithContext = (fn) => fn()) {
  const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve, reject) => {
    const next = (valid) => {
      if (valid === false) reject(createRouterError(ErrorTypes.NAVIGATION_ABORTED, {
        from,
        to
      }));
      else if (valid instanceof Error) reject(valid);
      else if (isRouteLocation(valid)) reject(createRouterError(ErrorTypes.NAVIGATION_GUARD_REDIRECT, {
        from: to,
        to: valid
      }));
      else {
        if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") enterCallbackArray.push(valid);
        resolve();
      }
    };
    const guardReturn = runWithContext(() => guard.call(record && record.instances[name], to, from, next));
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3) guardCall = guardCall.then(next);
    guardCall.catch((err) => reject(err));
  });
}
function extractComponentsGuards(matched, guardType, to, from, runWithContext = (fn) => fn()) {
  const guards = [];
  for (const record of matched) {
    for (const name in record.components) {
      let rawComponent = record.components[name];
      if (guardType !== "beforeRouteEnter" && !record.instances[name]) continue;
      if (isRouteComponent(rawComponent)) {
        const guard = (rawComponent.__vccOpts || rawComponent)[guardType];
        guard && guards.push(guardToPromiseFn(guard, to, from, record, name, runWithContext));
      } else {
        let componentPromise = rawComponent();
        guards.push(() => componentPromise.then((resolved) => {
          if (!resolved) throw new Error(`Couldn't resolve component "${name}" at "${record.path}"`);
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.mods[name] = resolved;
          record.components[name] = resolvedComponent;
          const guard = (resolvedComponent.__vccOpts || resolvedComponent)[guardType];
          return guard && guardToPromiseFn(guard, to, from, record, name, runWithContext)();
        }));
      }
    }
  }
  return guards;
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i = 0; i < len; i++) {
    const recordFrom = from.matched[i];
    if (recordFrom) if (to.matched.find((record) => isSameRouteRecord(record, recordFrom))) updatingRecords.push(recordFrom);
    else leavingRecords.push(recordFrom);
    const recordTo = to.matched[i];
    if (recordTo) {
      if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) enteringRecords.push(recordTo);
    }
  }
  return [
    leavingRecords,
    updatingRecords,
    enteringRecords
  ];
}
/*!
 * vue-router v4.6.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let createBaseLocation = () => location.protocol + "//" + location.host;
function createCurrentLocation(base, location$1) {
  const { pathname, search, hash } = location$1;
  const hashPos = base.indexOf("#");
  if (hashPos > -1) {
    let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
    let pathFromHash = hash.slice(slicePos);
    if (pathFromHash[0] !== "/") pathFromHash = "/" + pathFromHash;
    return stripBase(pathFromHash, "");
  }
  return stripBase(pathname, base) + search + hash;
}
function useHistoryListeners(base, historyState, currentLocation, replace) {
  let listeners = [];
  let teardowns = [];
  let pauseState = null;
  const popStateHandler = ({ state }) => {
    const to = createCurrentLocation(base, location);
    const from = currentLocation.value;
    const fromState = historyState.value;
    let delta = 0;
    if (state) {
      currentLocation.value = to;
      historyState.value = state;
      if (pauseState && pauseState === from) {
        pauseState = null;
        return;
      }
      delta = fromState ? state.position - fromState.position : 0;
    } else replace(to);
    listeners.forEach((listener) => {
      listener(currentLocation.value, from, {
        delta,
        type: NavigationType.pop,
        direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
      });
    });
  };
  function pauseListeners() {
    pauseState = currentLocation.value;
  }
  function listen(callback) {
    listeners.push(callback);
    const teardown = () => {
      const index = listeners.indexOf(callback);
      if (index > -1) listeners.splice(index, 1);
    };
    teardowns.push(teardown);
    return teardown;
  }
  function beforeUnloadListener() {
    if (document.visibilityState === "hidden") {
      const { history: history$1 } = window;
      if (!history$1.state) return;
      history$1.replaceState(assign({}, history$1.state, { scroll: computeScrollPosition() }), "");
    }
  }
  function destroy() {
    for (const teardown of teardowns) teardown();
    teardowns = [];
    window.removeEventListener("popstate", popStateHandler);
    window.removeEventListener("pagehide", beforeUnloadListener);
    document.removeEventListener("visibilitychange", beforeUnloadListener);
  }
  window.addEventListener("popstate", popStateHandler);
  window.addEventListener("pagehide", beforeUnloadListener);
  document.addEventListener("visibilitychange", beforeUnloadListener);
  return {
    pauseListeners,
    listen,
    destroy
  };
}
function buildState(back, current, forward, replaced = false, computeScroll = false) {
  return {
    back,
    current,
    forward,
    replaced,
    position: window.history.length,
    scroll: computeScroll ? computeScrollPosition() : null
  };
}
function useHistoryStateNavigation(base) {
  const { history: history$1, location: location$1 } = window;
  const currentLocation = { value: createCurrentLocation(base, location$1) };
  const historyState = { value: history$1.state };
  if (!historyState.value) changeLocation(currentLocation.value, {
    back: null,
    current: currentLocation.value,
    forward: null,
    position: history$1.length - 1,
    replaced: true,
    scroll: null
  }, true);
  function changeLocation(to, state, replace$1) {
    const hashIndex = base.indexOf("#");
    const url = hashIndex > -1 ? (location$1.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
    try {
      history$1[replace$1 ? "replaceState" : "pushState"](state, "", url);
      historyState.value = state;
    } catch (err) {
      console.error(err);
      location$1[replace$1 ? "replace" : "assign"](url);
    }
  }
  function replace(to, data) {
    changeLocation(to, assign({}, history$1.state, buildState(historyState.value.back, to, historyState.value.forward, true), data, { position: historyState.value.position }), true);
    currentLocation.value = to;
  }
  function push(to, data) {
    const currentState = assign({}, historyState.value, history$1.state, {
      forward: to,
      scroll: computeScrollPosition()
    });
    changeLocation(currentState.current, currentState, true);
    changeLocation(to, assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data), false);
    currentLocation.value = to;
  }
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace
  };
}
function createWebHistory(base) {
  base = normalizeBase(base);
  const historyNavigation = useHistoryStateNavigation(base);
  const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
  function go(delta, triggerListeners = true) {
    if (!triggerListeners) historyListeners.pauseListeners();
    history.go(delta);
  }
  const routerHistory = assign({
    location: "",
    base,
    go,
    createHref: createHref.bind(null, base)
  }, historyNavigation, historyListeners);
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => historyNavigation.location.value
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => historyNavigation.state.value
  });
  return routerHistory;
}
let TokenType = /* @__PURE__ */ (function(TokenType$1) {
  TokenType$1[TokenType$1["Static"] = 0] = "Static";
  TokenType$1[TokenType$1["Param"] = 1] = "Param";
  TokenType$1[TokenType$1["Group"] = 2] = "Group";
  return TokenType$1;
})({});
var TokenizerState = /* @__PURE__ */ (function(TokenizerState$1) {
  TokenizerState$1[TokenizerState$1["Static"] = 0] = "Static";
  TokenizerState$1[TokenizerState$1["Param"] = 1] = "Param";
  TokenizerState$1[TokenizerState$1["ParamRegExp"] = 2] = "ParamRegExp";
  TokenizerState$1[TokenizerState$1["ParamRegExpEnd"] = 3] = "ParamRegExpEnd";
  TokenizerState$1[TokenizerState$1["EscapeNext"] = 4] = "EscapeNext";
  return TokenizerState$1;
})(TokenizerState || {});
const ROOT_TOKEN = {
  type: TokenType.Static,
  value: ""
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
  if (!path) return [[]];
  if (path === "/") return [[ROOT_TOKEN]];
  if (!path.startsWith("/")) throw new Error(`Invalid path "${path}"`);
  function crash(message) {
    throw new Error(`ERR (${state})/"${buffer}": ${message}`);
  }
  let state = TokenizerState.Static;
  let previousState = state;
  const tokens = [];
  let segment;
  function finalizeSegment() {
    if (segment) tokens.push(segment);
    segment = [];
  }
  let i = 0;
  let char;
  let buffer = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer) return;
    if (state === TokenizerState.Static) segment.push({
      type: TokenType.Static,
      value: buffer
    });
    else if (state === TokenizerState.Param || state === TokenizerState.ParamRegExp || state === TokenizerState.ParamRegExpEnd) {
      if (segment.length > 1 && (char === "*" || char === "+")) crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: TokenType.Param,
        value: buffer,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else crash("Invalid state to consume buffer");
    buffer = "";
  }
  function addCharToBuffer() {
    buffer += char;
  }
  while (i < path.length) {
    char = path[i++];
    if (char === "\\" && state !== TokenizerState.ParamRegExp) {
      previousState = state;
      state = TokenizerState.EscapeNext;
      continue;
    }
    switch (state) {
      case TokenizerState.Static:
        if (char === "/") {
          if (buffer) consumeBuffer();
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = TokenizerState.Param;
        } else addCharToBuffer();
        break;
      case TokenizerState.EscapeNext:
        addCharToBuffer();
        state = previousState;
        break;
      case TokenizerState.Param:
        if (char === "(") state = TokenizerState.ParamRegExp;
        else if (VALID_PARAM_RE.test(char)) addCharToBuffer();
        else {
          consumeBuffer();
          state = TokenizerState.Static;
          if (char !== "*" && char !== "?" && char !== "+") i--;
        }
        break;
      case TokenizerState.ParamRegExp:
        if (char === ")") if (customRe[customRe.length - 1] == "\\") customRe = customRe.slice(0, -1) + char;
        else state = TokenizerState.ParamRegExpEnd;
        else customRe += char;
        break;
      case TokenizerState.ParamRegExpEnd:
        consumeBuffer();
        state = TokenizerState.Static;
        if (char !== "*" && char !== "?" && char !== "+") i--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === TokenizerState.ParamRegExp) crash(`Unfinished custom RegExp for param "${buffer}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens;
}
const BASE_PARAM_PATTERN = "[^/]+?";
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
var PathScore = /* @__PURE__ */ (function(PathScore$1) {
  PathScore$1[PathScore$1["_multiplier"] = 10] = "_multiplier";
  PathScore$1[PathScore$1["Root"] = 90] = "Root";
  PathScore$1[PathScore$1["Segment"] = 40] = "Segment";
  PathScore$1[PathScore$1["SubSegment"] = 30] = "SubSegment";
  PathScore$1[PathScore$1["Static"] = 40] = "Static";
  PathScore$1[PathScore$1["Dynamic"] = 20] = "Dynamic";
  PathScore$1[PathScore$1["BonusCustomRegExp"] = 10] = "BonusCustomRegExp";
  PathScore$1[PathScore$1["BonusWildcard"] = -50] = "BonusWildcard";
  PathScore$1[PathScore$1["BonusRepeatable"] = -20] = "BonusRepeatable";
  PathScore$1[PathScore$1["BonusOptional"] = -8] = "BonusOptional";
  PathScore$1[PathScore$1["BonusStrict"] = 0.7000000000000001] = "BonusStrict";
  PathScore$1[PathScore$1["BonusCaseSensitive"] = 0.25] = "BonusCaseSensitive";
  return PathScore$1;
})(PathScore || {});
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options.start ? "^" : "";
  const keys = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [PathScore.Root];
    if (options.strict && !segment.length) pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      let subSegmentScore = PathScore.Segment + (options.sensitive ? PathScore.BonusCaseSensitive : 0);
      if (token.type === TokenType.Static) {
        if (!tokenIndex) pattern += "/";
        pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += PathScore.Static;
      } else if (token.type === TokenType.Param) {
        const { value, repeatable, optional, regexp } = token;
        keys.push({
          name: value,
          repeatable,
          optional
        });
        const re$1 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re$1 !== BASE_PARAM_PATTERN) {
          subSegmentScore += PathScore.BonusCustomRegExp;
          try {
            `${re$1}`;
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re$1}): ` + err.message);
          }
        }
        let subPattern = repeatable ? `((?:${re$1})(?:/(?:${re$1}))*)` : `(${re$1})`;
        if (!tokenIndex) subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional) subPattern += "?";
        pattern += subPattern;
        subSegmentScore += PathScore.Dynamic;
        if (optional) subSegmentScore += PathScore.BonusOptional;
        if (repeatable) subSegmentScore += PathScore.BonusRepeatable;
        if (re$1 === ".*") subSegmentScore += PathScore.BonusWildcard;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options.strict && options.end) {
    const i = score.length - 1;
    score[i][score[i].length - 1] += PathScore.BonusStrict;
  }
  if (!options.strict) pattern += "/?";
  if (options.end) pattern += "$";
  else if (options.strict && !pattern.endsWith("/")) pattern += "(?:/|$)";
  const re = new RegExp(pattern, options.sensitive ? "" : "i");
  function parse(path) {
    const match = path.match(re);
    const params = {};
    if (!match) return null;
    for (let i = 1; i < match.length; i++) {
      const value = match[i] || "";
      const key = keys[i - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify(params) {
    let path = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith("/")) path += "/";
      avoidDuplicatedSlash = false;
      for (const token of segment) if (token.type === TokenType.Static) path += token.value;
      else if (token.type === TokenType.Param) {
        const { value, repeatable, optional } = token;
        const param = value in params ? params[value] : "";
        if (isArray(param) && !repeatable) throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
        const text = isArray(param) ? param.join("/") : param;
        if (!text) if (optional) {
          if (segment.length < 2) if (path.endsWith("/")) path = path.slice(0, -1);
          else avoidDuplicatedSlash = true;
        } else throw new Error(`Missing required param "${value}"`);
        path += text;
      }
    }
    return path || "/";
  }
  return {
    re,
    score,
    keys,
    parse,
    stringify
  };
}
function compareScoreArray(a, b) {
  let i = 0;
  while (i < a.length && i < b.length) {
    const diff = b[i] - a[i];
    if (diff) return diff;
    i++;
  }
  if (a.length < b.length) return a.length === 1 && a[0] === PathScore.Static + PathScore.Segment ? -1 : 1;
  else if (a.length > b.length) return b.length === 1 && b[0] === PathScore.Static + PathScore.Segment ? 1 : -1;
  return 0;
}
function comparePathParserScore(a, b) {
  let i = 0;
  const aScore = a.score;
  const bScore = b.score;
  while (i < aScore.length && i < bScore.length) {
    const comp = compareScoreArray(aScore[i], bScore[i]);
    if (comp) return comp;
    i++;
  }
  if (Math.abs(bScore.length - aScore.length) === 1) {
    if (isLastScoreNegative(aScore)) return 1;
    if (isLastScoreNegative(bScore)) return -1;
  }
  return bScore.length - aScore.length;
}
function isLastScoreNegative(score) {
  const last = score[score.length - 1];
  return score.length > 0 && last[last.length - 1] < 0;
}
const PATH_PARSER_OPTIONS_DEFAULTS = {
  strict: false,
  end: true,
  sensitive: false
};
function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  const matcher = assign(parser, {
    record,
    parent,
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf) parent.children.push(matcher);
  }
  return matcher;
}
function createRouterMatcher(routes2, globalOptions) {
  const matchers = [];
  const matcherMap = /* @__PURE__ */ new Map();
  globalOptions = mergeOptions(PATH_PARSER_OPTIONS_DEFAULTS, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    const normalizedRecords = [mainNormalizedRecord];
    if ("alias" in record) {
      const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases) normalizedRecords.push(normalizeRouteRecord(assign({}, mainNormalizedRecord, {
        components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
        path: alias,
        aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
      })));
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord;
      if (parent && path[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher) originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher)) {
          removeRoute(record.name);
        }
      }
      if (isMatchable(matcher)) insertMatcher(matcher);
      if (mainNormalizedRecord.children) {
        const children = mainNormalizedRecord.children;
        for (let i = 0; i < children.length; i++) addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
      }
      originalRecord = originalRecord || matcher;
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index = matchers.indexOf(matcherRef);
      if (index > -1) {
        matchers.splice(index, 1);
        if (matcherRef.record.name) matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    const index = findInsertionIndex(matcher, matchers);
    matchers.splice(index, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher)) matcherMap.set(matcher.record.name, matcher);
  }
  function resolve(location$1, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ("name" in location$1 && location$1.name) {
      matcher = matcherMap.get(location$1.name);
      if (!matcher) throw createRouterError(ErrorTypes.MATCHER_NOT_FOUND, { location: location$1 });
      name = matcher.record.name;
      params = assign(pickParams(currentLocation.params, matcher.keys.filter((k) => !k.optional).concat(matcher.parent ? matcher.parent.keys.filter((k) => k.optional) : []).map((k) => k.name)), location$1.params && pickParams(location$1.params, matcher.keys.map((k) => k.name)));
      path = matcher.stringify(params);
    } else if (location$1.path != null) {
      path = location$1.path;
      matcher = matchers.find((m) => m.re.test(path));
      if (matcher) {
        params = matcher.parse(path);
        name = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
      if (!matcher) throw createRouterError(ErrorTypes.MATCHER_NOT_FOUND, {
        location: location$1,
        currentLocation
      });
      name = matcher.record.name;
      params = assign({}, currentLocation.params, location$1.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  routes2.forEach((route) => addRoute(route));
  function clearRoutes() {
    matchers.length = 0;
    matcherMap.clear();
  }
  return {
    addRoute,
    resolve,
    removeRoute,
    clearRoutes,
    getRoutes,
    getRecordMatcher
  };
}
function pickParams(params, keys) {
  const newParams = {};
  for (const key of keys) if (key in params) newParams[key] = params[key];
  return newParams;
}
function normalizeRouteRecord(record) {
  const normalized = {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: record.aliasOf,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in record ? record.components || null : record.component && { default: record.component }
  };
  Object.defineProperty(normalized, "mods", { value: {} });
  return normalized;
}
function normalizeRecordProps(record) {
  const propsObject = {};
  const props = record.props || false;
  if ("component" in record) propsObject.default = props;
  else for (const name in record.components) propsObject[name] = typeof props === "object" ? props[name] : props;
  return propsObject;
}
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf) return true;
    record = record.parent;
  }
  return false;
}
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
function findInsertionIndex(matcher, matchers) {
  let lower = 0;
  let upper = matchers.length;
  while (lower !== upper) {
    const mid = lower + upper >> 1;
    if (comparePathParserScore(matcher, matchers[mid]) < 0) upper = mid;
    else lower = mid + 1;
  }
  const insertionAncestor = getInsertionAncestor(matcher);
  if (insertionAncestor) {
    upper = matchers.lastIndexOf(insertionAncestor, upper - 1);
  }
  return upper;
}
function getInsertionAncestor(matcher) {
  let ancestor = matcher;
  while (ancestor = ancestor.parent) if (isMatchable(ancestor) && comparePathParserScore(matcher, ancestor) === 0) return ancestor;
}
function isMatchable({ record }) {
  return !!(record.name || record.components && Object.keys(record.components).length || record.redirect);
}
function useLink(props) {
  const router = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  const route = computed(() => {
    const to = unref(props.to);
    return router.resolve(to);
  });
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length) return -1;
    const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index > -1) return index;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index;
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e = {}) {
    if (guardEvent(e)) {
      const p2 = router[unref(props.replace) ? "replace" : "push"](unref(props.to)).catch(noop);
      if (props.viewTransition && typeof document !== "undefined" && "startViewTransition" in document) document.startViewTransition(() => p2);
      return p2;
    }
    return Promise.resolve();
  }
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
function preferSingleVNode(vnodes) {
  return vnodes.length === 1 ? vnodes[0] : vnodes;
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    },
    viewTransition: Boolean
  },
  useLink,
  setup(props, { slots }) {
    const link = reactive(useLink(props));
    const { options } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && preferSingleVNode(slots.default(link));
      return props.custom ? children : h("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
const RouterLink = RouterLinkImpl;
function guardEvent(e) {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
  if (e.defaultPrevented) return;
  if (e.button !== void 0 && e.button !== 0) return;
  if (e.currentTarget && e.currentTarget.getAttribute) {
    const target = e.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target)) return;
  }
  if (e.preventDefault) e.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue) return false;
    } else if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i])) return false;
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
const RouterViewImpl = /* @__PURE__ */ defineComponent({
  name: "RouterView",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  compatConfig: { MODE: 3 },
  setup(props, { attrs, slots }) {
    const injectedRoute = inject(routerViewLocationKey);
    const routeToDisplay = computed(() => props.route || injectedRoute.value);
    const injectedDepth = inject(viewDepthKey, 0);
    const depth = computed(() => {
      let initialDepth = unref(injectedDepth);
      const { matched } = routeToDisplay.value;
      let matchedRoute;
      while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) initialDepth++;
      return initialDepth;
    });
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
    provide(viewDepthKey, computed(() => depth.value + 1));
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = ref();
    watch(() => [
      viewRef.value,
      matchedRouteRef.value,
      props.name
    ], ([instance, to, name], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name] = instance;
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) to.leaveGuards = from.leaveGuards;
          if (!to.updateGuards.size) to.updateGuards = from.updateGuards;
        }
      }
      if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
    }, { flush: "post" });
    return () => {
      const route = routeToDisplay.value;
      const currentName = props.name;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[currentName];
      if (!ViewComponent) return normalizeSlot(slots.default, {
        Component: ViewComponent,
        route
      });
      const routePropsOption = matchedRoute.props[currentName];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) matchedRoute.instances[currentName] = null;
      };
      const component = h(ViewComponent, assign({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      return normalizeSlot(slots.default, {
        Component: component,
        route
      }) || component;
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot) return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
const RouterView = RouterViewImpl;
function createRouter(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$1 = options.parseQuery || parseQuery;
  const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
  const routerHistory = options.history;
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) history.scrollRestoration = "manual";
  const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = applyToParams.bind(null, decode);
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      record = route;
    } else record = parentOrRoute;
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) matcher.removeRoute(recordMatcher);
  }
  function getRoutes() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve(rawLocation, currentLocation) {
    currentLocation = assign({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
      const matchedRoute$1 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href$1 = routerHistory.createHref(locationNormalized.fullPath);
      return assign(locationNormalized, matchedRoute$1, {
        params: decodeParams(matchedRoute$1.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href$1
      });
    }
    let matcherLocation;
    if (rawLocation.path != null) {
      matcherLocation = assign({}, rawLocation, { path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path });
    } else {
      const targetParams = assign({}, rawLocation.params);
      for (const key in targetParams) if (targetParams[key] == null) delete targetParams[key];
      matcherLocation = assign({}, rawLocation, { params: encodeParams(targetParams) });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash = rawLocation.hash || "";
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
      hash: encodeHash(hash),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    return assign({
      fullPath,
      hash,
      query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
    }, matchedRoute, {
      redirectedFrom: void 0,
      href
    });
  }
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) return createRouterError(ErrorTypes.NAVIGATION_CANCELLED, {
      from,
      to
    });
  }
  function push(to) {
    return pushWithRedirect(to);
  }
  function replace(to) {
    return push(assign(locationAsObject(to), { replace: true }));
  }
  function handleRedirectRecord(to, from) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to, from) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : { path: newTargetLocation };
        newTargetLocation.params = {};
      }
      return assign({
        query: to.query,
        hash: to.hash,
        params: newTargetLocation.path != null ? {} : to.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve(to);
    const from = currentRoute.value;
    const data = to.state;
    const force = to.force;
    const replace$1 = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation, from);
    if (shouldRedirect) return pushWithRedirect(assign(locationAsObject(shouldRedirect), {
      state: typeof shouldRedirect === "object" ? assign({}, data, shouldRedirect.state) : data,
      force,
      replace: replace$1
    }), redirectedFrom || targetLocation);
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
      failure = createRouterError(ErrorTypes.NAVIGATION_DUPLICATED, {
        to: toLocation,
        from
      });
      handleScroll(from, from, true, false);
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? isNavigationFailure(error, ErrorTypes.NAVIGATION_GUARD_REDIRECT) ? error : markAsReady(error) : triggerError(error, toLocation, from)).then((failure$1) => {
      if (failure$1) {
        if (isNavigationFailure(failure$1, ErrorTypes.NAVIGATION_GUARD_REDIRECT)) {
          return pushWithRedirect(assign({ replace: replace$1 }, locationAsObject(failure$1.to), {
            state: typeof failure$1.to === "object" ? assign({}, data, failure$1.to.state) : data,
            force
          }), redirectedFrom || toLocation);
        }
      } else failure$1 = finalizeNavigation(toLocation, from, true, replace$1, data);
      triggerAfterEach(toLocation, from, failure$1);
      return failure$1;
    });
  }
  function checkCanceledNavigationAndReject(to, from) {
    const error = checkCanceledNavigation(to, from);
    return error ? Promise.reject(error) : Promise.resolve();
  }
  function runWithContext(fn) {
    const app = installedApps.values().next().value;
    return app && typeof app.runWithContext === "function" ? app.runWithContext(fn) : fn();
  }
  function navigate(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    for (const record of leavingRecords) record.leaveGuards.forEach((guard) => {
      guards.push(guardToPromiseFn(guard, to, from));
    });
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    return runGuardQueue(guards).then(() => {
      guards = [];
      for (const guard of beforeGuards.list()) guards.push(guardToPromiseFn(guard, to, from));
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
      for (const record of updatingRecords) record.updateGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const record of enteringRecords) if (record.beforeEnter) if (isArray(record.beforeEnter)) for (const beforeEnter of record.beforeEnter) guards.push(guardToPromiseFn(beforeEnter, to, from));
      else guards.push(guardToPromiseFn(record.beforeEnter, to, from));
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      to.matched.forEach((record) => record.enterCallbacks = {});
      guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from, runWithContext);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const guard of beforeResolveGuards.list()) guards.push(guardToPromiseFn(guard, to, from));
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).catch((err) => isNavigationFailure(err, ErrorTypes.NAVIGATION_CANCELLED) ? err : Promise.reject(err));
  }
  function triggerAfterEach(to, from, failure) {
    afterGuards.list().forEach((guard) => runWithContext(() => guard(to, from, failure)));
  }
  function finalizeNavigation(toLocation, from, isPush, replace$1, data) {
    const error = checkCanceledNavigation(toLocation, from);
    if (error) return error;
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser ? {} : history.state;
    if (isPush) if (replace$1 || isFirstNavigation) routerHistory.replace(toLocation.fullPath, assign({ scroll: isFirstNavigation && state && state.scroll }, data));
    else routerHistory.push(toLocation.fullPath, data);
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  function setupListeners() {
    if (removeHistoryListener) return;
    removeHistoryListener = routerHistory.listen((to, _from, info) => {
      if (!router.listening) return;
      const toLocation = resolve(to);
      const shouldRedirect = handleRedirectRecord(toLocation, router.currentRoute.value);
      if (shouldRedirect) {
        pushWithRedirect(assign(shouldRedirect, {
          replace: true,
          force: true
        }), toLocation).catch(noop);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      if (isBrowser) saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
      navigate(toLocation, from).catch((error) => {
        if (isNavigationFailure(error, ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_CANCELLED)) return error;
        if (isNavigationFailure(error, ErrorTypes.NAVIGATION_GUARD_REDIRECT)) {
          pushWithRedirect(assign(locationAsObject(error.to), { force: true }), toLocation).then((failure) => {
            if (isNavigationFailure(failure, ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_DUPLICATED) && !info.delta && info.type === NavigationType.pop) routerHistory.go(-1, false);
          }).catch(noop);
          return Promise.reject();
        }
        if (info.delta) routerHistory.go(-info.delta, false);
        return triggerError(error, toLocation, from);
      }).then((failure) => {
        failure = failure || finalizeNavigation(toLocation, from, false);
        if (failure) {
          if (info.delta && !isNavigationFailure(failure, ErrorTypes.NAVIGATION_CANCELLED)) routerHistory.go(-info.delta, false);
          else if (info.type === NavigationType.pop && isNavigationFailure(failure, ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_DUPLICATED)) routerHistory.go(-1, false);
        }
        triggerAfterEach(toLocation, from, failure);
      }).catch(noop);
    });
  }
  let readyHandlers = useCallbacks();
  let errorListeners = useCallbacks();
  let ready;
  function triggerError(error, to, from) {
    markAsReady(error);
    const list = errorListeners.list();
    if (list.length) list.forEach((handler) => handler(error, to, from));
    else {
      console.error(error);
    }
    return Promise.reject(error);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED) return Promise.resolve();
    return new Promise((resolve$1, reject) => {
      readyHandlers.add([resolve$1, reject]);
    });
  }
  function markAsReady(err) {
    if (!ready) {
      ready = !err;
      setupListeners();
      readyHandlers.list().forEach(([resolve$1, reject]) => err ? reject(err) : resolve$1());
      readyHandlers.reset();
    }
    return err;
  }
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options;
    if (!isBrowser || !scrollBehavior) return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
  }
  const go = (delta) => routerHistory.go(delta);
  let started;
  const installedApps = /* @__PURE__ */ new Set();
  const router = {
    currentRoute,
    listening: true,
    addRoute,
    removeRoute,
    clearRoutes: matcher.clearRoutes,
    hasRoute,
    getRoutes,
    resolve,
    options,
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorListeners.add,
    isReady,
    install(app) {
      app.component("RouterLink", RouterLink);
      app.component("RouterView", RouterView);
      app.config.globalProperties.$router = router;
      Object.defineProperty(app.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute)
      });
      if (isBrowser && !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true;
        push(routerHistory.location).catch((err) => {
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) Object.defineProperty(reactiveRoute, key, {
        get: () => currentRoute.value[key],
        enumerable: true
      });
      app.provide(routerKey, router);
      app.provide(routeLocationKey, shallowReactive(reactiveRoute));
      app.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app.unmount;
      installedApps.add(app);
      app.unmount = function() {
        installedApps.delete(app);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          removeHistoryListener = null;
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
    }
  };
  function runGuardQueue(guards) {
    return guards.reduce((promise, guard) => promise.then(() => runWithContext(guard)), Promise.resolve());
  }
  return router;
}
function documentReady(_passThrough) {
  if (document.readyState === "loading") {
    return new Promise((resolve) => {
      document.addEventListener("DOMContentLoaded", () => resolve(_passThrough));
    });
  }
  return Promise.resolve(_passThrough);
}
const ClientOnly = /* @__PURE__ */ defineComponent({
  setup(props, { slots }) {
    const mounted = ref(false);
    onMounted(() => mounted.value = true);
    return () => {
      if (!mounted.value)
        return slots.placeholder && slots.placeholder({});
      return slots.default && slots.default({});
    };
  }
});
function deserializeState(state) {
  try {
    return JSON.parse(state || "{}");
  } catch (error) {
    console.error("[SSG] On state deserialization -", error, state);
    return {};
  }
}
function ViteSSG(App, routerOptions, fn, options) {
  const {
    transformState,
    registerComponents = true,
    useHead = true,
    rootContainer = "#app"
  } = {};
  async function createApp$1(routePath) {
    const app = createApp(App);
    let head;
    if (useHead) {
      app.use(head = /* @__PURE__ */ createHead());
    }
    const router = createRouter({
      history: createWebHistory(routerOptions.base),
      ...routerOptions
    });
    const { routes: routes2 } = routerOptions;
    if (registerComponents)
      app.component("ClientOnly", ClientOnly);
    const appRenderCallbacks = [];
    const onSSRAppRendered = () => {
    };
    const triggerOnSSRAppRendered = () => {
      return Promise.all(appRenderCallbacks.map((cb) => cb()));
    };
    const context = {
      app,
      head,
      isClient: true,
      router,
      routes: routes2,
      onSSRAppRendered,
      triggerOnSSRAppRendered,
      initialState: {},
      transformState,
      routePath
    };
    {
      await documentReady();
      context.initialState = (transformState == null ? void 0 : transformState(window.__INITIAL_STATE__ || {})) || deserializeState(window.__INITIAL_STATE__);
    }
    await (fn == null ? void 0 : fn(context));
    app.use(router);
    let entryRoutePath;
    let isFirstRoute = true;
    router.beforeEach((to, from, next) => {
      if (isFirstRoute || entryRoutePath && entryRoutePath === to.path) {
        isFirstRoute = false;
        entryRoutePath = to.path;
        to.meta.state = context.initialState;
      }
      next();
    });
    const initialState = context.initialState;
    return {
      ...context,
      initialState
    };
  }
  {
    (async () => {
      const { app, router } = await createApp$1();
      await router.isReady();
      app.mount(rootContainer, true);
    })();
  }
  return createApp$1;
}
const _hoisted_1$i = { class: "navbar navbar-expand-lg navbar-dark bg-primary sticky-top" };
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "the-navbar",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("nav", _hoisted_1$i, [..._cache[0] || (_cache[0] = [
        createBaseVNode("div", { class: "container" }, [
          createBaseVNode("a", {
            class: "navbar-brand",
            href: "./index.html"
          }, [
            createBaseVNode("strong", null, "Builder 101")
          ]),
          createBaseVNode("button", {
            class: "navbar-toggler",
            type: "button",
            "data-bs-toggle": "collapse",
            "data-bs-target": "#mainNavbar",
            "aria-controls": "mainNavbar",
            "aria-expanded": "false",
            "aria-label": "Toggle navigation"
          }, [
            createBaseVNode("span", { class: "navbar-toggler-icon" })
          ]),
          createBaseVNode("div", {
            id: "mainNavbar",
            class: "collapse navbar-collapse"
          }, [
            createBaseVNode("ul", { class: "navbar-nav me-auto" }, [
              createBaseVNode("li", { class: "nav-item" }, [
                createBaseVNode("a", {
                  class: "nav-link",
                  href: "./jobs.html"
                }, "探索項目")
              ]),
              createBaseVNode("li", { class: "nav-item" }, [
                createBaseVNode("a", {
                  class: "nav-link",
                  href: "./how-to.html"
                }, "如何使用")
              ]),
              createBaseVNode("li", { class: "nav-item" }, [
                createBaseVNode("a", {
                  class: "nav-link",
                  href: "./about.html"
                }, "關於我們")
              ]),
              createBaseVNode("li", { class: "nav-item" }, [
                createBaseVNode("a", {
                  class: "nav-link",
                  href: "./contact.html"
                }, "聯絡我們")
              ])
            ]),
            createBaseVNode("ul", { class: "navbar-nav" }, [
              createBaseVNode("li", {
                class: "nav-item",
                "data-auth": "guest"
              }, [
                createBaseVNode("a", {
                  class: "nav-link",
                  href: "./auth.html"
                }, [
                  createBaseVNode("i", { class: "fas fa-user me-1" }),
                  createTextVNode("登入 / 註冊 ")
                ])
              ]),
              createBaseVNode("li", {
                class: "nav-item d-none",
                "data-auth": "member"
              }, [
                createBaseVNode("a", {
                  class: "nav-link",
                  href: "./notifications.html"
                }, [
                  createBaseVNode("i", { class: "fas fa-bell" }),
                  createBaseVNode("span", {
                    class: "badge bg-danger rounded-pill ms-1 d-none",
                    "data-notification-count": ""
                  }, "0")
                ])
              ]),
              createBaseVNode("li", {
                class: "nav-item dropdown d-none",
                "data-auth": "member"
              }, [
                createBaseVNode("a", {
                  class: "nav-link dropdown-toggle",
                  href: "#",
                  role: "button",
                  "data-bs-toggle": "dropdown"
                }, [
                  createBaseVNode("i", { class: "fas fa-user-circle me-1" }),
                  createBaseVNode("span", { "data-user-name": "" }, "會員")
                ]),
                createBaseVNode("ul", { class: "dropdown-menu dropdown-menu-end" }, [
                  createBaseVNode("li", null, [
                    createBaseVNode("a", {
                      class: "dropdown-item",
                      href: "./dashboard.html"
                    }, "會員中心")
                  ]),
                  createBaseVNode("li", null, [
                    createBaseVNode("hr", { class: "dropdown-divider" })
                  ]),
                  createBaseVNode("li", null, [
                    createBaseVNode("a", {
                      class: "dropdown-item",
                      href: "#",
                      "data-action": "logout"
                    }, "登出")
                  ])
                ])
              ])
            ])
          ])
        ], -1)
      ])]);
    };
  }
});
const _hoisted_1$h = { class: "footer bg-dark text-white py-4" };
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "the-footer",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("footer", _hoisted_1$h, [..._cache[0] || (_cache[0] = [
        createStaticVNode('<div class="container" data-v-60efee7b><div class="row" data-v-60efee7b><div class="col-md-4 mb-3 mb-md-0" data-v-60efee7b><h5 class="mb-3 text-white" data-v-60efee7b>Builder 101</h5><p class="text-white-50 small mb-0" data-v-60efee7b>以工換宿媒合平台 🏕️</p></div><div class="col-md-4 mb-3 mb-md-0" data-v-60efee7b><h6 class="mb-3 text-white" data-v-60efee7b>快速連結</h6><ul class="list-unstyled small" data-v-60efee7b><li data-v-60efee7b><a href="./jobs.html" class="text-white-50 text-decoration-none link-hover" data-v-60efee7b>探索項目</a></li><li data-v-60efee7b><a href="./how-to.html" class="text-white-50 text-decoration-none link-hover" data-v-60efee7b>如何使用</a></li><li data-v-60efee7b><a href="./about.html" class="text-white-50 text-decoration-none link-hover" data-v-60efee7b>關於我們</a></li><li data-v-60efee7b><a href="./contact.html" class="text-white-50 text-decoration-none link-hover" data-v-60efee7b>聯絡我們</a></li></ul></div><div class="col-md-4" data-v-60efee7b><h6 class="mb-3 text-white" data-v-60efee7b>關注我們</h6><div class="d-flex gap-3" data-v-60efee7b><a href="#" class="text-white fs-5 social-icon" aria-label="Facebook" data-v-60efee7b><i class="fab fa-facebook" aria-hidden="true" data-v-60efee7b></i></a><a href="#" class="text-white fs-5 social-icon" aria-label="Instagram" data-v-60efee7b><i class="fab fa-instagram" aria-hidden="true" data-v-60efee7b></i></a><a href="#" class="text-white fs-5 social-icon" aria-label="Line" data-v-60efee7b><i class="fab fa-line" aria-hidden="true" data-v-60efee7b></i></a></div></div></div><hr class="my-4 border-secondary" data-v-60efee7b><div class="row align-items-center" data-v-60efee7b><div class="col-md-6 text-center text-md-start" data-v-60efee7b><p class="small text-white-50 mb-0" data-v-60efee7b>© 2024 Builder 101.</p></div><div class="col-md-6 text-center text-md-end" data-v-60efee7b><a href="./terms.html#privacy" class="text-white-50 small text-decoration-none me-3 link-hover" data-v-60efee7b>隱私權政策</a><a href="./terms.html#terms" class="text-white-50 small text-decoration-none link-hover" data-v-60efee7b>服務條款</a></div></div></div><button type="button" class="btn btn-primary btn-back-to-top" data-action="back-to-top" aria-label="回到頂部" data-v-60efee7b><i class="fas fa-arrow-up" aria-hidden="true" data-v-60efee7b></i></button>', 2)
      ])]);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const TheFooter = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-60efee7b"]]);
const _hoisted_1$g = { class: "main-layout d-flex flex-column min-vh-100" };
const _hoisted_2$g = { class: "flex-grow-1" };
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "main-layout",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$g, [
        createVNode(_sfc_main$n),
        createBaseVNode("main", _hoisted_2$g, [
          renderSlot(_ctx.$slots, "default")
        ]),
        createVNode(TheFooter)
      ]);
    };
  }
});
const _hoisted_1$f = { class: "job-card card h-100 shadow-sm card-hover" };
const _hoisted_2$f = { class: "position-relative" };
const _hoisted_3$f = ["src", "alt"];
const _hoisted_4$e = { class: "position-absolute top-0 end-0 m-2" };
const _hoisted_5$d = ["data-job-id"];
const _hoisted_6$d = {
  key: 0,
  class: "position-absolute bottom-0 start-0 m-2"
};
const _hoisted_7$b = { class: "card-body" };
const _hoisted_8$b = { class: "d-flex justify-content-between align-items-start mb-2" };
const _hoisted_9$a = { class: "card-title mb-0" };
const _hoisted_10$9 = {
  key: 0,
  class: "badge bg-success rounded-pill"
};
const _hoisted_11$9 = { class: "text-muted small mb-2" };
const _hoisted_12$8 = { class: "text-muted small mb-2" };
const _hoisted_13$7 = { class: "mb-3" };
const _hoisted_14$6 = { class: "card-footer bg-white border-top-0" };
const _hoisted_15$5 = { class: "d-flex justify-content-between align-items-center" };
const _hoisted_16$5 = { class: "text-muted small" };
const _hoisted_17$4 = { class: "d-flex align-items-center" };
const _hoisted_18$4 = { class: "text-warning me-2" };
const _hoisted_19$4 = ["href"];
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "job-card",
  props: {
    job: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$f, [
        createBaseVNode("div", _hoisted_2$f, [
          createBaseVNode("img", {
            src: __props.job.coverImage,
            class: "card-img-top",
            alt: __props.job.title
          }, null, 8, _hoisted_3$f),
          createBaseVNode("div", _hoisted_4$e, [
            createBaseVNode("button", {
              class: "btn btn-light btn-sm rounded-circle",
              "data-action": "toggle-favorite",
              "data-job-id": __props.job.id
            }, [..._cache[0] || (_cache[0] = [
              createBaseVNode("i", { class: "far fa-heart" }, null, -1)
            ])], 8, _hoisted_5$d)
          ]),
          __props.job.isUrgent ? (openBlock(), createElementBlock("div", _hoisted_6$d, [..._cache[1] || (_cache[1] = [
            createBaseVNode("span", { class: "badge bg-danger" }, "急徵", -1)
          ])])) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", _hoisted_7$b, [
          createBaseVNode("div", _hoisted_8$b, [
            createBaseVNode("h5", _hoisted_9$a, toDisplayString(__props.job.title), 1),
            __props.job.isVerified ? (openBlock(), createElementBlock("span", _hoisted_10$9, [..._cache[2] || (_cache[2] = [
              createBaseVNode("i", { class: "fas fa-check-circle me-1" }, null, -1),
              createTextVNode("已驗證 ", -1)
            ])])) : createCommentVNode("", true)
          ]),
          createBaseVNode("p", _hoisted_11$9, [
            _cache[3] || (_cache[3] = createBaseVNode("i", { class: "fas fa-map-marker-alt me-1" }, null, -1)),
            createTextVNode(toDisplayString(__props.job.location), 1)
          ]),
          createBaseVNode("p", _hoisted_12$8, [
            _cache[4] || (_cache[4] = createBaseVNode("i", { class: "fas fa-user me-1" }, null, -1)),
            createTextVNode(toDisplayString(__props.job.hostName), 1)
          ]),
          createBaseVNode("div", _hoisted_13$7, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.job.types, (type, index) => {
              return openBlock(), createElementBlock("span", {
                key: index,
                class: "badge bg-light text-dark me-1"
              }, toDisplayString(type), 1);
            }), 128))
          ])
        ]),
        createBaseVNode("div", _hoisted_14$6, [
          createBaseVNode("div", _hoisted_15$5, [
            createBaseVNode("div", _hoisted_16$5, [
              _cache[5] || (_cache[5] = createBaseVNode("i", { class: "far fa-calendar me-1" }, null, -1)),
              createTextVNode(toDisplayString(__props.job.minWeeks) + " 週以上 ", 1)
            ]),
            createBaseVNode("div", _hoisted_17$4, [
              createBaseVNode("span", _hoisted_18$4, [
                _cache[6] || (_cache[6] = createBaseVNode("i", { class: "fas fa-star" }, null, -1)),
                createTextVNode(" " + toDisplayString(__props.job.averageRating), 1)
              ]),
              createBaseVNode("a", {
                href: `./job-detail.html?id=${__props.job.id}`,
                class: "btn btn-primary btn-sm"
              }, " 查看詳情 ", 8, _hoisted_19$4)
            ])
          ])
        ])
      ]);
    };
  }
});
const JobCard = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-b1fbd98c"]]);
const _hoisted_1$e = { class: "hero-carousel position-relative" };
const _hoisted_2$e = {
  id: "heroCarousel",
  class: "carousel slide",
  "data-bs-ride": "carousel"
};
const _hoisted_3$e = { class: "carousel-inner" };
const _hoisted_4$d = ["src", "alt"];
const _hoisted_5$c = {
  class: "carousel-caption text-start",
  style: { "left": "10%", "bottom": "20%" }
};
const _hoisted_6$c = { class: "badge bg-warning text-dark mb-2" };
const _hoisted_7$a = { class: "display-5 fw-bold" };
const _hoisted_8$a = { class: "lead" };
const _hoisted_9$9 = { class: "benefits py-5" };
const _hoisted_10$8 = { class: "container" };
const _hoisted_11$8 = { class: "row g-4" };
const _hoisted_12$7 = { class: "col-md-6" };
const _hoisted_13$6 = { class: "card h-100 border-0 shadow-sm card-hover bg-primary bg-opacity-10" };
const _hoisted_14$5 = { class: "card-body p-4" };
const _hoisted_15$4 = { class: "list-unstyled" };
const _hoisted_16$4 = {
  class: "benefit-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3",
  style: { "width": "40px", "height": "40px", "flex-shrink": "0" }
};
const _hoisted_17$3 = { class: "col-md-6" };
const _hoisted_18$3 = { class: "card h-100 border-0 shadow-sm card-hover bg-success bg-opacity-10" };
const _hoisted_19$3 = { class: "card-body p-4" };
const _hoisted_20$3 = { class: "list-unstyled" };
const _hoisted_21$3 = {
  class: "benefit-icon bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3",
  style: { "width": "40px", "height": "40px", "flex-shrink": "0" }
};
const _hoisted_22$3 = { class: "featured-jobs py-5 bg-light" };
const _hoisted_23$3 = { class: "container" };
const _hoisted_24$2 = {
  id: "jobsCarousel",
  class: "carousel slide",
  "data-bs-ride": "false"
};
const _hoisted_25$1 = { class: "carousel-inner" };
const _hoisted_26$1 = { class: "carousel-item active" };
const _hoisted_27$1 = { class: "row g-4" };
const _hoisted_28$1 = { class: "carousel-item" };
const _hoisted_29$1 = { class: "row g-4" };
const _hoisted_30$1 = { class: "testimonials py-5" };
const _hoisted_31$1 = { class: "container" };
const _hoisted_32$1 = {
  id: "testimonialsCarousel",
  class: "carousel slide",
  "data-bs-ride": "carousel"
};
const _hoisted_33$1 = { class: "carousel-inner" };
const _hoisted_34$1 = { class: "row justify-content-center" };
const _hoisted_35$1 = { class: "col-md-8 col-lg-6" };
const _hoisted_36$1 = { class: "card border-0 shadow-sm text-center p-4" };
const _hoisted_37$1 = { class: "card-body" };
const _hoisted_38$1 = ["src", "alt"];
const _hoisted_39$1 = { class: "card-text fs-5 mb-4 text-muted fst-italic" };
const _hoisted_40$1 = { class: "mb-1" };
const _hoisted_41$1 = { class: "text-muted" };
const _hoisted_42$1 = { class: "carousel-indicators position-relative mt-4" };
const _hoisted_43$1 = ["data-bs-slide-to"];
const _hoisted_44$1 = { class: "features py-5 bg-light" };
const _hoisted_45$1 = { class: "container" };
const _hoisted_46$1 = { class: "row g-4" };
const _hoisted_47$1 = { class: "card h-100 border-0 shadow-sm card-hover" };
const _hoisted_48$1 = { class: "card-body text-center" };
const _hoisted_49$1 = {
  class: "feature-icon bg-primary bg-gradient text-white rounded-circle mb-3 mx-auto d-flex align-items-center justify-content-center",
  style: { "width": "64px", "height": "64px" }
};
const _hoisted_50$1 = { class: "text-muted mb-0" };
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "home-page",
  setup(__props) {
    const heroSlides = [
      {
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&h=500&fit=crop",
        category: "農場體驗",
        title: "在田園間學習自然農法",
        description: "體驗有機農耕，感受土地的溫度"
      },
      {
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&h=500&fit=crop",
        category: "民宿服務",
        title: "成為民宿最佳夥伴",
        description: "接待來自世界各地的旅人"
      },
      {
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&h=500&fit=crop",
        category: "社區學校",
        title: "參與在地教育計畫",
        description: "用你的專長回饋社區"
      }
    ];
    const builderBenefits = [
      { icon: "fas fa-bed", text: "免費住宿" },
      { icon: "fas fa-utensils", text: "免費餐點" },
      { icon: "fas fa-tshirt", text: "免費洗衣" },
      { icon: "fas fa-wifi", text: "免費 WiFi" },
      { icon: "fas fa-globe-asia", text: "探索在地文化" },
      { icon: "fas fa-users", text: "結交國際朋友" }
    ];
    const hostBenefits = [
      { icon: "fas fa-hammer", text: "木工協助" },
      { icon: "fas fa-seedling", text: "農務協助" },
      { icon: "fas fa-broom", text: "房務整理" },
      { icon: "fas fa-camera", text: "社群行銷協助" },
      { icon: "fas fa-handshake", text: "接待服務" },
      { icon: "fas fa-paint-brush", text: "美術設計支援" }
    ];
    const features = [
      { icon: "fas fa-shield-alt", title: "高可信度媒合", description: "三級驗證系統，確保志工與業主的真實身份" },
      { icon: "fas fa-search-location", title: "智慧搜尋", description: "地圖模式、多維度篩選，快速找到理想換宿" },
      { icon: "fas fa-comments", title: "社群互動", description: "公開問答、評論系統，獲得真實的換宿體驗分享" }
    ];
    const jobs = [
      {
        id: 1,
        title: "花蓮民宿小幫手",
        hostName: "海角七號民宿",
        location: "花蓮縣壽豐鄉",
        coverImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop",
        types: ["房務整理", "接待"],
        minWeeks: 2,
        isUrgent: false,
        isVerified: true,
        averageRating: 4.8
      },
      {
        id: 2,
        title: "墾丁衝浪民宿",
        hostName: "浪花民宿",
        location: "屏東縣恆春鎮",
        coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop",
        types: ["衝浪教學", "社群小編"],
        minWeeks: 2,
        isUrgent: true,
        isVerified: true,
        averageRating: 4.9
      },
      {
        id: 3,
        title: "台東有機農場",
        hostName: "池上田園",
        location: "台東縣池上鄉",
        coverImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop",
        types: ["農務體驗", "採收包裝"],
        minWeeks: 4,
        isUrgent: false,
        isVerified: false,
        averageRating: 4.5
      },
      {
        id: 4,
        title: "蘭嶼海景咖啡廳",
        hostName: "蘭嶼咖啡",
        location: "台東縣蘭嶼鄉",
        coverImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop",
        types: ["咖啡廳", "攝影剪輯"],
        minWeeks: 3,
        isUrgent: true,
        isVerified: true,
        averageRating: 4.7
      },
      {
        id: 5,
        title: "日月潭民宿管家",
        hostName: "湖畔小屋",
        location: "南投縣魚池鄉",
        coverImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
        types: ["房務整理", "接待"],
        minWeeks: 1,
        isUrgent: false,
        isVerified: true,
        averageRating: 4.6
      },
      {
        id: 6,
        title: "阿里山茶園體驗",
        hostName: "高山茶莊",
        location: "嘉義縣阿里山鄉",
        coverImage: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&h=250&fit=crop",
        types: ["農務體驗", "導覽解說"],
        minWeeks: 2,
        isUrgent: false,
        isVerified: true,
        averageRating: 4.9
      }
    ];
    const testimonials = [
      {
        name: "Alice 小A",
        location: "花蓮壽豐",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        content: "老闆人超好，每天都帶我們去衝浪！工作量適中，還有時間探索附近的美景。"
      },
      {
        name: "Bob 阿明",
        location: "台東池上",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        content: "在農場體驗了真正的田園生活，每天吃著自己採的蔬菜，超級新鮮！"
      },
      {
        name: "Carol 小卡",
        location: "墾丁恆春",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        content: "民宿提供免費衝浪教學，還認識了很多來自世界各地的朋友！"
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$l, null, {
        default: withCtx(() => [
          createBaseVNode("section", _hoisted_1$e, [
            createBaseVNode("div", _hoisted_2$e, [
              _cache[0] || (_cache[0] = createBaseVNode("div", { class: "carousel-indicators" }, [
                createBaseVNode("button", {
                  type: "button",
                  "data-bs-target": "#heroCarousel",
                  "data-bs-slide-to": "0",
                  class: "active"
                }),
                createBaseVNode("button", {
                  type: "button",
                  "data-bs-target": "#heroCarousel",
                  "data-bs-slide-to": "1"
                }),
                createBaseVNode("button", {
                  type: "button",
                  "data-bs-target": "#heroCarousel",
                  "data-bs-slide-to": "2"
                })
              ], -1)),
              createBaseVNode("div", _hoisted_3$e, [
                (openBlock(), createElementBlock(Fragment, null, renderList(heroSlides, (slide, index) => {
                  return createBaseVNode("div", {
                    key: slide.title,
                    class: normalizeClass(["carousel-item", { active: index === 0 }])
                  }, [
                    createBaseVNode("img", {
                      src: slide.image,
                      class: "d-block w-100",
                      alt: slide.title,
                      style: { "height": "500px", "object-fit": "cover", "filter": "brightness(0.6)" }
                    }, null, 8, _hoisted_4$d),
                    createBaseVNode("div", _hoisted_5$c, [
                      createBaseVNode("span", _hoisted_6$c, toDisplayString(slide.category), 1),
                      createBaseVNode("h2", _hoisted_7$a, toDisplayString(slide.title), 1),
                      createBaseVNode("p", _hoisted_8$a, toDisplayString(slide.description), 1)
                    ])
                  ], 2);
                }), 64))
              ]),
              _cache[1] || (_cache[1] = createBaseVNode("button", {
                class: "carousel-control-prev",
                type: "button",
                "data-bs-target": "#heroCarousel",
                "data-bs-slide": "prev"
              }, [
                createBaseVNode("span", { class: "carousel-control-prev-icon" })
              ], -1)),
              _cache[2] || (_cache[2] = createBaseVNode("button", {
                class: "carousel-control-next",
                type: "button",
                "data-bs-target": "#heroCarousel",
                "data-bs-slide": "next"
              }, [
                createBaseVNode("span", { class: "carousel-control-next-icon" })
              ], -1))
            ])
          ]),
          _cache[15] || (_cache[15] = createBaseVNode("section", { class: "platform-intro py-5 text-center bg-light" }, [
            createBaseVNode("div", { class: "container" }, [
              createBaseVNode("h2", { class: "display-6 fw-bold mb-3" }, "您是一位世界建構者嗎？"),
              createBaseVNode("p", { class: "lead text-muted mb-4" }, " Builder 101 媒合志願者與民宿主，讓您在旅行中創造價值，在工作中探索世界 "),
              createBaseVNode("a", {
                href: "./jobs.html",
                class: "btn btn-primary btn-lg"
              }, [
                createBaseVNode("i", { class: "fas fa-search me-2" }),
                createTextVNode("開始探索 ")
              ])
            ])
          ], -1)),
          createBaseVNode("section", _hoisted_9$9, [
            createBaseVNode("div", _hoisted_10$8, [
              _cache[5] || (_cache[5] = createBaseVNode("h2", { class: "text-center mb-5" }, "雙贏互利的合作模式", -1)),
              createBaseVNode("div", _hoisted_11$8, [
                createBaseVNode("div", _hoisted_12$7, [
                  createBaseVNode("div", _hoisted_13$6, [
                    createBaseVNode("div", _hoisted_14$5, [
                      _cache[3] || (_cache[3] = createBaseVNode("h4", { class: "text-primary mb-4" }, [
                        createBaseVNode("i", { class: "fas fa-user-hard-hat me-2" }),
                        createTextVNode("志願者 (Builder) 可享 ")
                      ], -1)),
                      createBaseVNode("ul", _hoisted_15$4, [
                        (openBlock(), createElementBlock(Fragment, null, renderList(builderBenefits, (benefit) => {
                          return createBaseVNode("li", {
                            key: benefit.text,
                            class: "d-flex align-items-center mb-3"
                          }, [
                            createBaseVNode("div", _hoisted_16$4, [
                              createBaseVNode("i", {
                                class: normalizeClass(benefit.icon)
                              }, null, 2)
                            ]),
                            createBaseVNode("span", null, toDisplayString(benefit.text), 1)
                          ]);
                        }), 64))
                      ])
                    ])
                  ])
                ]),
                createBaseVNode("div", _hoisted_17$3, [
                  createBaseVNode("div", _hoisted_18$3, [
                    createBaseVNode("div", _hoisted_19$3, [
                      _cache[4] || (_cache[4] = createBaseVNode("h4", { class: "text-success mb-4" }, [
                        createBaseVNode("i", { class: "fas fa-home me-2" }),
                        createTextVNode("民宿主 (Host) 可獲得 ")
                      ], -1)),
                      createBaseVNode("ul", _hoisted_20$3, [
                        (openBlock(), createElementBlock(Fragment, null, renderList(hostBenefits, (benefit) => {
                          return createBaseVNode("li", {
                            key: benefit.text,
                            class: "d-flex align-items-center mb-3"
                          }, [
                            createBaseVNode("div", _hoisted_21$3, [
                              createBaseVNode("i", {
                                class: normalizeClass(benefit.icon)
                              }, null, 2)
                            ]),
                            createBaseVNode("span", null, toDisplayString(benefit.text), 1)
                          ]);
                        }), 64))
                      ])
                    ])
                  ])
                ])
              ])
            ])
          ]),
          createBaseVNode("section", _hoisted_22$3, [
            createBaseVNode("div", _hoisted_23$3, [
              _cache[8] || (_cache[8] = createBaseVNode("div", { class: "d-flex justify-content-between align-items-center mb-4" }, [
                createBaseVNode("h2", { class: "mb-0" }, "推薦項目"),
                createBaseVNode("a", {
                  href: "./jobs.html",
                  class: "btn btn-outline-primary"
                }, [
                  createTextVNode(" 了解更多 "),
                  createBaseVNode("i", { class: "fas fa-arrow-right ms-1" })
                ])
              ], -1)),
              createBaseVNode("div", _hoisted_24$2, [
                createBaseVNode("div", _hoisted_25$1, [
                  createBaseVNode("div", _hoisted_26$1, [
                    createBaseVNode("div", _hoisted_27$1, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(jobs.slice(0, 3), (job) => {
                        return openBlock(), createElementBlock("div", {
                          key: job.id,
                          class: "col-md-4"
                        }, [
                          createVNode(JobCard, { job }, null, 8, ["job"])
                        ]);
                      }), 128))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_28$1, [
                    createBaseVNode("div", _hoisted_29$1, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(jobs.slice(3, 6), (job) => {
                        return openBlock(), createElementBlock("div", {
                          key: job.id,
                          class: "col-md-4"
                        }, [
                          createVNode(JobCard, { job }, null, 8, ["job"])
                        ]);
                      }), 128))
                    ])
                  ])
                ]),
                _cache[6] || (_cache[6] = createBaseVNode("button", {
                  class: "carousel-control-prev",
                  type: "button",
                  "data-bs-target": "#jobsCarousel",
                  "data-bs-slide": "prev",
                  style: { "left": "-50px", "width": "40px" }
                }, [
                  createBaseVNode("span", {
                    class: "bg-primary rounded-circle p-2 d-flex align-items-center justify-content-center",
                    style: { "width": "40px", "height": "40px" }
                  }, [
                    createBaseVNode("i", { class: "fas fa-chevron-left text-white" })
                  ])
                ], -1)),
                _cache[7] || (_cache[7] = createBaseVNode("button", {
                  class: "carousel-control-next",
                  type: "button",
                  "data-bs-target": "#jobsCarousel",
                  "data-bs-slide": "next",
                  style: { "right": "-50px", "width": "40px" }
                }, [
                  createBaseVNode("span", {
                    class: "bg-primary rounded-circle p-2 d-flex align-items-center justify-content-center",
                    style: { "width": "40px", "height": "40px" }
                  }, [
                    createBaseVNode("i", { class: "fas fa-chevron-right text-white" })
                  ])
                ], -1))
              ])
            ])
          ]),
          createBaseVNode("section", _hoisted_30$1, [
            createBaseVNode("div", _hoisted_31$1, [
              _cache[12] || (_cache[12] = createBaseVNode("h2", { class: "text-center mb-2" }, "Builder 的一日", -1)),
              _cache[13] || (_cache[13] = createBaseVNode("p", { class: "text-center text-muted mb-5" }, "來自真實志願者的換宿心得", -1)),
              createBaseVNode("div", _hoisted_32$1, [
                createBaseVNode("div", _hoisted_33$1, [
                  (openBlock(), createElementBlock(Fragment, null, renderList(testimonials, (testimonial, index) => {
                    return createBaseVNode("div", {
                      key: testimonial.name,
                      class: normalizeClass(["carousel-item", { active: index === 0 }])
                    }, [
                      createBaseVNode("div", _hoisted_34$1, [
                        createBaseVNode("div", _hoisted_35$1, [
                          createBaseVNode("div", _hoisted_36$1, [
                            createBaseVNode("div", _hoisted_37$1, [
                              createBaseVNode("img", {
                                src: testimonial.avatar,
                                alt: testimonial.name,
                                class: "rounded-circle mx-auto mb-3",
                                style: { "width": "80px", "height": "80px", "object-fit": "cover" }
                              }, null, 8, _hoisted_38$1),
                              createBaseVNode("p", _hoisted_39$1, ' "' + toDisplayString(testimonial.content) + '" ', 1),
                              createBaseVNode("h5", _hoisted_40$1, toDisplayString(testimonial.name), 1),
                              createBaseVNode("small", _hoisted_41$1, toDisplayString(testimonial.location), 1),
                              _cache[9] || (_cache[9] = createBaseVNode("div", { class: "text-warning mt-2" }, [
                                createBaseVNode("i", { class: "fas fa-star" }),
                                createBaseVNode("i", { class: "fas fa-star" }),
                                createBaseVNode("i", { class: "fas fa-star" }),
                                createBaseVNode("i", { class: "fas fa-star" }),
                                createBaseVNode("i", { class: "fas fa-star" })
                              ], -1))
                            ])
                          ])
                        ])
                      ])
                    ], 2);
                  }), 64))
                ]),
                createBaseVNode("div", _hoisted_42$1, [
                  (openBlock(), createElementBlock(Fragment, null, renderList(testimonials, (testimonial, index) => {
                    return createBaseVNode("button", {
                      key: index,
                      type: "button",
                      "data-bs-target": "#testimonialsCarousel",
                      "data-bs-slide-to": index,
                      class: normalizeClass({ active: index === 0 }),
                      style: { "background-color": "var(--bs-primary)" }
                    }, null, 10, _hoisted_43$1);
                  }), 64))
                ]),
                _cache[10] || (_cache[10] = createBaseVNode("button", {
                  class: "carousel-control-prev",
                  type: "button",
                  "data-bs-target": "#testimonialsCarousel",
                  "data-bs-slide": "prev",
                  style: { "width": "10%" }
                }, [
                  createBaseVNode("span", {
                    class: "carousel-control-prev-icon bg-primary rounded-circle p-3",
                    "aria-hidden": "true"
                  }),
                  createBaseVNode("span", { class: "visually-hidden" }, "上一則")
                ], -1)),
                _cache[11] || (_cache[11] = createBaseVNode("button", {
                  class: "carousel-control-next",
                  type: "button",
                  "data-bs-target": "#testimonialsCarousel",
                  "data-bs-slide": "next",
                  style: { "width": "10%" }
                }, [
                  createBaseVNode("span", {
                    class: "carousel-control-next-icon bg-primary rounded-circle p-3",
                    "aria-hidden": "true"
                  }),
                  createBaseVNode("span", { class: "visually-hidden" }, "下一則")
                ], -1))
              ])
            ])
          ]),
          createBaseVNode("section", _hoisted_44$1, [
            createBaseVNode("div", _hoisted_45$1, [
              _cache[14] || (_cache[14] = createBaseVNode("h2", { class: "text-center mb-5" }, "為什麼選擇 Builder 101?", -1)),
              createBaseVNode("div", _hoisted_46$1, [
                (openBlock(), createElementBlock(Fragment, null, renderList(features, (feature) => {
                  return createBaseVNode("div", {
                    key: feature.title,
                    class: "col-md-4"
                  }, [
                    createBaseVNode("div", _hoisted_47$1, [
                      createBaseVNode("div", _hoisted_48$1, [
                        createBaseVNode("div", _hoisted_49$1, [
                          createBaseVNode("i", {
                            class: normalizeClass([feature.icon, "fa-lg"])
                          }, null, 2)
                        ]),
                        createBaseVNode("h5", null, toDisplayString(feature.title), 1),
                        createBaseVNode("p", _hoisted_50$1, toDisplayString(feature.description), 1)
                      ])
                    ])
                  ]);
                }), 64))
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
});
const _hoisted_1$d = {
  class: "bg-primary text-white py-4",
  style: { "position": "relative", "z-index": "1050" }
};
const _hoisted_2$d = { class: "container" };
const _hoisted_3$d = { class: "row g-3 align-items-center" };
const _hoisted_4$c = { class: "col-md-4" };
const _hoisted_5$b = { class: "input-group" };
const _hoisted_6$b = {
  class: "dropdown-menu w-100",
  style: { "max-height": "60vh", "overflow-y": "auto" }
};
const _hoisted_7$9 = { class: "dropdown-header" };
const _hoisted_8$9 = {
  class: "bg-light border-bottom py-3 sticky-top",
  style: { "top": "56px" }
};
const _hoisted_9$8 = { class: "container" };
const _hoisted_10$7 = { class: "d-flex flex-wrap gap-2 align-items-center" };
const _hoisted_11$7 = { class: "py-4" };
const _hoisted_12$6 = { class: "container" };
const _hoisted_13$5 = { class: "row" };
const _hoisted_14$4 = { class: "col-lg-9" };
const _hoisted_15$3 = { class: "d-flex justify-content-between align-items-center mb-3" };
const _hoisted_16$3 = { class: "text-muted" };
const _hoisted_17$2 = { id: "jobsList" };
const _hoisted_18$2 = { class: "row g-4" };
const _hoisted_19$2 = {
  id: "jobsMap",
  class: "d-none"
};
const _hoisted_20$2 = {
  class: "card shadow-sm",
  style: { "height": "600px" }
};
const _hoisted_21$2 = { class: "card-body p-0 position-relative" };
const _hoisted_22$2 = {
  class: "map-container",
  style: { "background": "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)", "height": "100%", "position": "relative", "overflow": "hidden" }
};
const _hoisted_23$2 = {
  viewBox: "0 0 200 300",
  style: { "position": "absolute", "top": "50%", "left": "50%", "transform": "translate(-50%, -50%)", "width": "60%", "height": "80%", "opacity": "0.3" }
};
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "jobs-page",
  setup(__props) {
    const regions = [
      { name: "北部", cities: ["台北", "新北", "桃園", "新竹"] },
      { name: "中部", cities: ["台中", "南投", "彰化"] },
      { name: "南部", cities: ["高雄", "台南", "屏東"] },
      { name: "東部", cities: ["花蓮", "台東", "宜蘭"] },
      { name: "離島", cities: ["澎湖", "金門", "蘭嶼", "綠島"] }
    ];
    const workTypes = [
      { value: "housekeeping", label: "房務", icon: "fas fa-broom" },
      { value: "surfing", label: "衝浪", icon: "fas fa-water" },
      { value: "cafe", label: "咖啡廳", icon: "fas fa-coffee" },
      { value: "farming", label: "農務", icon: "fas fa-seedling" },
      { value: "photography", label: "攝影", icon: "fas fa-camera" }
    ];
    const quickTags = [
      { value: "urgent", label: "急徵", icon: "🔥" },
      { value: "ac", label: "有冷氣", icon: "❄️" },
      { value: "allowance", label: "有零用金", icon: "💰" },
      { value: "beginner", label: "新手友善", icon: "✨" }
    ];
    const jobs = [
      {
        id: 1,
        title: "花蓮民宿小幫手",
        hostName: "海角七號民宿",
        location: "花蓮縣壽豐鄉",
        coverImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop",
        types: ["房務整理", "接待"],
        minWeeks: 2,
        isUrgent: false,
        isVerified: true,
        averageRating: 4.8
      },
      {
        id: 2,
        title: "墾丁衝浪民宿",
        hostName: "浪花民宿",
        location: "屏東縣恆春鎮",
        coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop",
        types: ["衝浪教學", "社群小編"],
        minWeeks: 2,
        isUrgent: true,
        isVerified: true,
        averageRating: 4.9
      },
      {
        id: 3,
        title: "台東有機農場",
        hostName: "池上田園",
        location: "台東縣池上鄉",
        coverImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop",
        types: ["農務體驗", "採收包裝"],
        minWeeks: 4,
        isUrgent: false,
        isVerified: false,
        averageRating: 4.5
      },
      {
        id: 4,
        title: "蘭嶼海景咖啡廳",
        hostName: "蘭嶼咖啡",
        location: "台東縣蘭嶼鄉",
        coverImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop",
        types: ["咖啡廳", "攝影剪輯"],
        minWeeks: 3,
        isUrgent: true,
        isVerified: true,
        averageRating: 4.7
      },
      {
        id: 5,
        title: "日月潭民宿管家",
        hostName: "湖畔小屋",
        location: "南投縣魚池鄉",
        coverImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
        types: ["房務整理", "接待"],
        minWeeks: 1,
        isUrgent: false,
        isVerified: true,
        averageRating: 4.6
      },
      {
        id: 6,
        title: "阿里山茶園體驗",
        hostName: "高山茶莊",
        location: "嘉義縣阿里山鄉",
        coverImage: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&h=250&fit=crop",
        types: ["農務體驗", "導覽解說"],
        minWeeks: 2,
        isUrgent: false,
        isVerified: true,
        averageRating: 4.9
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$l, null, {
        default: withCtx(() => [
          createBaseVNode("section", _hoisted_1$d, [
            createBaseVNode("div", _hoisted_2$d, [
              createBaseVNode("div", _hoisted_3$d, [
                createBaseVNode("div", _hoisted_4$c, [
                  createBaseVNode("div", _hoisted_5$b, [
                    _cache[0] || (_cache[0] = createBaseVNode("span", { class: "input-group-text bg-white border-0" }, [
                      createBaseVNode("i", { class: "fas fa-map-marker-alt text-primary" })
                    ], -1)),
                    _cache[1] || (_cache[1] = createBaseVNode("input", {
                      type: "text",
                      class: "form-control border-0",
                      placeholder: "選擇地點...",
                      "data-bs-toggle": "dropdown"
                    }, null, -1)),
                    createBaseVNode("ul", _hoisted_6$b, [
                      (openBlock(), createElementBlock(Fragment, null, renderList(regions, (region) => {
                        return createBaseVNode("li", {
                          key: region.name
                        }, [
                          createBaseVNode("h6", _hoisted_7$9, toDisplayString(region.name), 1),
                          (openBlock(true), createElementBlock(Fragment, null, renderList(region.cities, (city) => {
                            return openBlock(), createElementBlock("a", {
                              key: city,
                              class: "dropdown-item",
                              href: "#"
                            }, toDisplayString(city), 1);
                          }), 128))
                        ]);
                      }), 64))
                    ])
                  ])
                ]),
                _cache[2] || (_cache[2] = createBaseVNode("div", { class: "col-md-3" }, [
                  createBaseVNode("div", { class: "input-group" }, [
                    createBaseVNode("span", { class: "input-group-text bg-white border-0" }, [
                      createBaseVNode("i", { class: "fas fa-calendar text-primary" })
                    ]),
                    createBaseVNode("input", {
                      type: "month",
                      class: "form-control border-0",
                      placeholder: "可入住月份"
                    })
                  ])
                ], -1)),
                _cache[3] || (_cache[3] = createBaseVNode("div", { class: "col-md-3" }, [
                  createBaseVNode("div", { class: "input-group" }, [
                    createBaseVNode("span", { class: "input-group-text bg-white border-0" }, [
                      createBaseVNode("i", { class: "fas fa-search text-primary" })
                    ]),
                    createBaseVNode("input", {
                      type: "text",
                      class: "form-control border-0",
                      placeholder: "關鍵字搜尋..."
                    })
                  ])
                ], -1)),
                _cache[4] || (_cache[4] = createBaseVNode("div", { class: "col-md-2" }, [
                  createBaseVNode("button", { class: "btn btn-light w-100" }, [
                    createBaseVNode("i", { class: "fas fa-search me-1" }),
                    createTextVNode(" 搜尋 ")
                  ])
                ], -1))
              ])
            ])
          ]),
          createBaseVNode("section", _hoisted_8$9, [
            createBaseVNode("div", _hoisted_9$8, [
              createBaseVNode("div", _hoisted_10$7, [
                _cache[5] || (_cache[5] = createBaseVNode("span", { class: "text-muted small me-2" }, "類型：", -1)),
                (openBlock(), createElementBlock(Fragment, null, renderList(workTypes, (type) => {
                  return createBaseVNode("button", {
                    key: type.value,
                    class: "btn btn-sm btn-outline-primary rounded-pill",
                    "data-filter-type": ""
                  }, [
                    createBaseVNode("i", {
                      class: normalizeClass([type.icon, "me-1"])
                    }, null, 2),
                    createTextVNode(toDisplayString(type.label), 1)
                  ]);
                }), 64)),
                _cache[6] || (_cache[6] = createBaseVNode("span", {
                  class: "border-start mx-2",
                  style: { "height": "20px" }
                }, null, -1)),
                _cache[7] || (_cache[7] = createBaseVNode("span", { class: "text-muted small me-2" }, "特性：", -1)),
                (openBlock(), createElementBlock(Fragment, null, renderList(quickTags, (tag) => {
                  return createBaseVNode("button", {
                    key: tag.value,
                    class: "btn btn-sm btn-outline-secondary rounded-pill",
                    "data-filter-type": ""
                  }, toDisplayString(tag.icon) + " " + toDisplayString(tag.label), 1);
                }), 64))
              ])
            ])
          ]),
          createBaseVNode("section", _hoisted_11$7, [
            createBaseVNode("div", _hoisted_12$6, [
              createBaseVNode("div", _hoisted_13$5, [
                _cache[21] || (_cache[21] = createBaseVNode("div", {
                  class: "col-lg-3 mb-4",
                  id: "filterSidebar"
                }, [
                  createBaseVNode("div", { class: "card shadow-sm" }, [
                    createBaseVNode("div", { class: "card-header bg-white d-flex justify-content-between align-items-center" }, [
                      createBaseVNode("h6", { class: "mb-0" }, "篩選條件"),
                      createBaseVNode("button", { class: "btn btn-sm btn-link text-decoration-none" }, "清除全部")
                    ]),
                    createBaseVNode("div", { class: "card-body" }, [
                      createBaseVNode("div", { class: "mb-4" }, [
                        createBaseVNode("label", { class: "form-label fw-bold" }, "每日工時"),
                        createBaseVNode("div", { class: "form-check" }, [
                          createBaseVNode("input", {
                            class: "form-check-input",
                            type: "checkbox",
                            id: "hours1"
                          }),
                          createBaseVNode("label", {
                            class: "form-check-label",
                            for: "hours1"
                          }, "4 小時以下")
                        ]),
                        createBaseVNode("div", { class: "form-check" }, [
                          createBaseVNode("input", {
                            class: "form-check-input",
                            type: "checkbox",
                            id: "hours2"
                          }),
                          createBaseVNode("label", {
                            class: "form-check-label",
                            for: "hours2"
                          }, "4-5 小時")
                        ]),
                        createBaseVNode("div", { class: "form-check" }, [
                          createBaseVNode("input", {
                            class: "form-check-input",
                            type: "checkbox",
                            id: "hours3"
                          }),
                          createBaseVNode("label", {
                            class: "form-check-label",
                            for: "hours3"
                          }, "5-6 小時")
                        ])
                      ]),
                      createBaseVNode("div", { class: "mb-4" }, [
                        createBaseVNode("label", { class: "form-label fw-bold" }, "住宿類型"),
                        createBaseVNode("div", { class: "form-check" }, [
                          createBaseVNode("input", {
                            class: "form-check-input",
                            type: "checkbox",
                            id: "room1"
                          }),
                          createBaseVNode("label", {
                            class: "form-check-label",
                            for: "room1"
                          }, "獨立套房")
                        ]),
                        createBaseVNode("div", { class: "form-check" }, [
                          createBaseVNode("input", {
                            class: "form-check-input",
                            type: "checkbox",
                            id: "room2"
                          }),
                          createBaseVNode("label", {
                            class: "form-check-label",
                            for: "room2"
                          }, "多人背包房")
                        ]),
                        createBaseVNode("div", { class: "form-check" }, [
                          createBaseVNode("input", {
                            class: "form-check-input",
                            type: "checkbox",
                            id: "room3"
                          }),
                          createBaseVNode("label", {
                            class: "form-check-label",
                            for: "room3"
                          }, "帳篷/露營車")
                        ])
                      ]),
                      createBaseVNode("div", { class: "mb-4" }, [
                        createBaseVNode("label", { class: "form-label fw-bold" }, "最短工期"),
                        createBaseVNode("select", { class: "form-select" }, [
                          createBaseVNode("option", { value: "" }, "不限"),
                          createBaseVNode("option", { value: "1" }, "1 週以上"),
                          createBaseVNode("option", { value: "2" }, "2 週以上"),
                          createBaseVNode("option", { value: "4" }, "1 個月以上")
                        ])
                      ])
                    ])
                  ])
                ], -1)),
                createBaseVNode("div", _hoisted_14$4, [
                  createBaseVNode("div", _hoisted_15$3, [
                    createBaseVNode("span", _hoisted_16$3, [
                      _cache[8] || (_cache[8] = createTextVNode("共找到 ", -1)),
                      createBaseVNode("strong", null, toDisplayString(jobs.length), 1),
                      _cache[9] || (_cache[9] = createTextVNode(" 個職缺", -1))
                    ]),
                    _cache[10] || (_cache[10] = createBaseVNode("div", { class: "d-flex gap-2" }, [
                      createBaseVNode("div", { class: "btn-group" }, [
                        createBaseVNode("button", {
                          class: "btn btn-sm btn-outline-secondary active",
                          "data-view": "list"
                        }, [
                          createBaseVNode("i", { class: "fas fa-th-large" })
                        ]),
                        createBaseVNode("button", {
                          class: "btn btn-sm btn-outline-secondary",
                          "data-view": "map"
                        }, [
                          createBaseVNode("i", { class: "fas fa-map" })
                        ])
                      ]),
                      createBaseVNode("select", {
                        class: "form-select form-select-sm",
                        style: { "width": "auto" }
                      }, [
                        createBaseVNode("option", null, "推薦排序"),
                        createBaseVNode("option", null, "最新上架"),
                        createBaseVNode("option", null, "評價最高")
                      ])
                    ], -1))
                  ]),
                  createBaseVNode("div", _hoisted_17$2, [
                    createBaseVNode("div", _hoisted_18$2, [
                      (openBlock(), createElementBlock(Fragment, null, renderList(jobs, (job) => {
                        return createBaseVNode("div", {
                          key: job.id,
                          class: "col-md-6 col-lg-4"
                        }, [
                          createVNode(JobCard, { job }, null, 8, ["job"])
                        ]);
                      }), 64))
                    ]),
                    _cache[11] || (_cache[11] = createBaseVNode("nav", { class: "mt-4" }, [
                      createBaseVNode("ul", { class: "pagination justify-content-center" }, [
                        createBaseVNode("li", { class: "page-item disabled" }, [
                          createBaseVNode("a", {
                            class: "page-link",
                            href: "#"
                          }, "上一頁")
                        ]),
                        createBaseVNode("li", { class: "page-item active" }, [
                          createBaseVNode("a", {
                            class: "page-link",
                            href: "#"
                          }, "1")
                        ]),
                        createBaseVNode("li", { class: "page-item" }, [
                          createBaseVNode("a", {
                            class: "page-link",
                            href: "#"
                          }, "2")
                        ]),
                        createBaseVNode("li", { class: "page-item" }, [
                          createBaseVNode("a", {
                            class: "page-link",
                            href: "#"
                          }, "3")
                        ]),
                        createBaseVNode("li", { class: "page-item" }, [
                          createBaseVNode("a", {
                            class: "page-link",
                            href: "#"
                          }, "下一頁")
                        ])
                      ])
                    ], -1))
                  ]),
                  createBaseVNode("div", _hoisted_19$2, [
                    createBaseVNode("div", _hoisted_20$2, [
                      createBaseVNode("div", _hoisted_21$2, [
                        createBaseVNode("div", _hoisted_22$2, [
                          (openBlock(), createElementBlock("svg", _hoisted_23$2, [..._cache[12] || (_cache[12] = [
                            createBaseVNode("path", {
                              d: "M100,20 C130,30 150,60 155,100 C160,140 150,180 140,220 C130,260 110,280 90,280 C70,260 60,220 55,180 C50,140 60,100 70,60 C80,30 90,20 100,20Z",
                              fill: "#4caf50"
                            }, null, -1)
                          ])])),
                          _cache[13] || (_cache[13] = createBaseVNode("div", {
                            class: "map-marker",
                            style: { "top": "25%", "left": "55%" },
                            "data-bs-toggle": "tooltip",
                            title: "台北：2 個職缺"
                          }, [
                            createBaseVNode("i", { class: "fas fa-map-marker-alt text-danger fa-2x" }),
                            createBaseVNode("span", { class: "badge bg-danger rounded-pill" }, "2")
                          ], -1)),
                          _cache[14] || (_cache[14] = createBaseVNode("div", {
                            class: "map-marker",
                            style: { "top": "45%", "left": "50%" },
                            "data-bs-toggle": "tooltip",
                            title: "台中：1 個職缺"
                          }, [
                            createBaseVNode("i", { class: "fas fa-map-marker-alt text-primary fa-2x" }),
                            createBaseVNode("span", { class: "badge bg-primary rounded-pill" }, "1")
                          ], -1)),
                          _cache[15] || (_cache[15] = createBaseVNode("div", {
                            class: "map-marker",
                            style: { "top": "70%", "left": "45%" },
                            "data-bs-toggle": "tooltip",
                            title: "墾丁：1 個職缺"
                          }, [
                            createBaseVNode("i", { class: "fas fa-map-marker-alt text-warning fa-2x" }),
                            createBaseVNode("span", { class: "badge bg-warning rounded-pill" }, "1")
                          ], -1)),
                          _cache[16] || (_cache[16] = createBaseVNode("div", {
                            class: "map-marker",
                            style: { "top": "50%", "left": "70%" },
                            "data-bs-toggle": "tooltip",
                            title: "花蓮：1 個職缺"
                          }, [
                            createBaseVNode("i", { class: "fas fa-map-marker-alt text-success fa-2x" }),
                            createBaseVNode("span", { class: "badge bg-success rounded-pill" }, "1")
                          ], -1)),
                          _cache[17] || (_cache[17] = createBaseVNode("div", {
                            class: "map-marker",
                            style: { "top": "65%", "left": "75%" },
                            "data-bs-toggle": "tooltip",
                            title: "蘭嶼：1 個職缺"
                          }, [
                            createBaseVNode("i", { class: "fas fa-map-marker-alt text-info fa-2x" }),
                            createBaseVNode("span", { class: "badge bg-info rounded-pill" }, "1")
                          ], -1)),
                          _cache[18] || (_cache[18] = createBaseVNode("div", { class: "position-absolute bottom-0 start-0 m-3 p-3 bg-white rounded shadow-sm" }, [
                            createBaseVNode("h6", { class: "mb-2" }, [
                              createBaseVNode("i", { class: "fas fa-info-circle me-1" }),
                              createTextVNode("圖例")
                            ]),
                            createBaseVNode("div", { class: "small" }, [
                              createBaseVNode("span", { class: "text-danger" }, [
                                createBaseVNode("i", { class: "fas fa-map-marker-alt me-1" })
                              ]),
                              createTextVNode(" 2+ 職缺"),
                              createBaseVNode("br"),
                              createBaseVNode("span", { class: "text-primary" }, [
                                createBaseVNode("i", { class: "fas fa-map-marker-alt me-1" })
                              ]),
                              createTextVNode(" 1 職缺 ")
                            ])
                          ], -1)),
                          _cache[19] || (_cache[19] = createBaseVNode("div", { class: "position-absolute top-0 end-0 m-3" }, [
                            createBaseVNode("div", { class: "btn-group-vertical shadow-sm" }, [
                              createBaseVNode("button", {
                                class: "btn btn-white btn-sm border",
                                "data-action": "map-zoom-in"
                              }, [
                                createBaseVNode("i", { class: "fas fa-plus" })
                              ]),
                              createBaseVNode("button", {
                                class: "btn btn-white btn-sm border",
                                "data-action": "map-zoom-out"
                              }, [
                                createBaseVNode("i", { class: "fas fa-minus" })
                              ])
                            ])
                          ], -1)),
                          _cache[20] || (_cache[20] = createBaseVNode("div", { class: "position-absolute top-0 start-0 m-3 p-2 bg-white rounded shadow-sm" }, [
                            createBaseVNode("small", { class: "text-muted" }, [
                              createBaseVNode("i", { class: "fas fa-map me-1" }),
                              createTextVNode("台灣地區共 6 個職缺 ")
                            ])
                          ], -1))
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
});
const _hoisted_1$c = { class: "py-4" };
const _hoisted_2$c = { class: "container" };
const _hoisted_3$c = { class: "row" };
const _hoisted_4$b = { class: "col-lg-8" };
const _hoisted_5$a = { class: "mb-4" };
const _hoisted_6$a = ["src", "alt"];
const _hoisted_7$8 = { class: "row g-2" };
const _hoisted_8$8 = ["src"];
const _hoisted_9$7 = { class: "mb-4" };
const _hoisted_10$6 = { class: "d-flex justify-content-between align-items-start" };
const _hoisted_11$6 = { class: "h2" };
const _hoisted_12$5 = { class: "text-muted mb-2" };
const _hoisted_13$4 = { class: "text-end" };
const _hoisted_14$3 = { class: "h4 text-warning mb-1" };
const _hoisted_15$2 = { class: "text-muted" };
const _hoisted_16$2 = { class: "mt-2" };
const _hoisted_17$1 = {
  key: 0,
  class: "badge bg-danger"
};
const _hoisted_18$1 = {
  class: "nav nav-tabs",
  role: "tablist"
};
const _hoisted_19$1 = { class: "nav-item" };
const _hoisted_20$1 = {
  class: "nav-link",
  "data-bs-toggle": "tab",
  "data-bs-target": "#reviewsTab"
};
const _hoisted_21$1 = { class: "tab-content border border-top-0 rounded-bottom p-4 bg-white" };
const _hoisted_22$1 = {
  class: "tab-pane fade show active",
  id: "descTab"
};
const _hoisted_23$1 = { class: "text-muted" };
const _hoisted_24$1 = { class: "text-muted" };
const _hoisted_25 = {
  class: "tab-pane fade",
  id: "livingTab"
};
const _hoisted_26 = { class: "row" };
const _hoisted_27 = { class: "col-md-6 mb-3" };
const _hoisted_28 = { class: "text-muted mb-0" };
const _hoisted_29 = { class: "col-md-6 mb-3" };
const _hoisted_30 = { class: "text-muted mb-0" };
const _hoisted_31 = { class: "col-12" };
const _hoisted_32 = {
  class: "tab-pane fade",
  id: "reviewsTab"
};
const _hoisted_33 = { class: "d-flex" };
const _hoisted_34 = ["src", "alt"];
const _hoisted_35 = { class: "flex-grow-1" };
const _hoisted_36 = { class: "d-flex justify-content-between" };
const _hoisted_37 = { class: "mb-0" };
const _hoisted_38 = { class: "text-muted" };
const _hoisted_39 = { class: "text-warning small mb-2" };
const _hoisted_40 = { class: "text-muted mb-0" };
const _hoisted_41 = {
  class: "tab-pane fade",
  id: "qaTab"
};
const _hoisted_42 = { class: "d-flex" };
const _hoisted_43 = ["src"];
const _hoisted_44 = { class: "d-flex align-items-center mb-1" };
const _hoisted_45 = { class: "text-muted ms-2" };
const _hoisted_46 = { class: "mb-2" };
const _hoisted_47 = {
  key: 0,
  class: "bg-light p-2 rounded"
};
const _hoisted_48 = { class: "mb-0 small text-muted" };
const _hoisted_49 = { class: "col-lg-4" };
const _hoisted_50 = {
  class: "card shadow-sm sticky-top",
  style: { "top": "80px" }
};
const _hoisted_51 = { class: "card-body" };
const _hoisted_52 = { class: "list-unstyled text-muted" };
const _hoisted_53 = { class: "mb-2" };
const _hoisted_54 = { class: "mb-2" };
const _hoisted_55 = { class: "mb-2" };
const _hoisted_56 = { class: "d-flex justify-content-between align-items-center mb-3" };
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "job-detail-page",
  setup(__props) {
    const job = {
      id: 1,
      title: "花蓮民宿小幫手",
      hostName: "海角七號民宿",
      coverImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=500&fit=crop",
      location: { region: "東部", city: "花蓮縣壽豐鄉" },
      types: ["房務整理", "接待", "園藝"],
      availability: ["2024-01", "2024-02", "2024-03"],
      conditions: { workHours: "4-5 小時", daysOff: "週休一日", laborIntensity: "輕度", shift: "固定班", insurance: false },
      living: { roomType: "獨立套房", acFee: "業主全包", meals: "供三餐", bathroom: "獨立衛浴", amenities: ["Wifi", "冷氣", "洗衣機", "電視", "廚房"] },
      houseRules: { curfew: "無門禁", visitor: "可會客", petFriendly: "可帶寵物", smoking: "禁菸" },
      minWeeks: 2,
      isUrgent: false,
      isFeatured: true,
      postedDate: "2024-12-01",
      description: "我們是一間溫馨的海景民宿，位於花蓮壽豐，每天早晨可以看到太平洋的日出。主要工作包括：房間整理、接待旅客、協助早餐準備。工作輕鬆，下午有充分時間可以探索周邊景點或衝浪！",
      benefits: ["免費住宿（獨立套房）", "三餐全包", "免費衝浪教學", "腳踏車免費使用", "員工價入住姊妹民宿"],
      images: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200&h=120&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&h=120&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=120&fit=crop",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=200&h=120&fit=crop"
      ],
      averageRating: 4.8,
      reviewCount: 23
    };
    const reviews = [
      { id: 1, author: { name: "Alice", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", isVerified: true }, rating: 5, date: "2024-11-15", content: "老闆人超好，每天都帶我們去衝浪！環境很棒，工作輕鬆。", tags: ["環境優美", "工作輕鬆"], checks: { matchDescription: true, noHiddenCost: true }, replies: [] },
      { id: 2, author: { name: "Bob", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", isVerified: true }, rating: 4, date: "2024-10-28", content: "住宿環境很棒，獨立套房很舒適。唯一小缺點是位置稍遠，但民宿有提供腳踏車。", tags: ["住宿舒適"], checks: { matchDescription: true, noHiddenCost: true }, replies: [] }
    ];
    const questions = [
      { id: 1, author: "Carol", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", date: "2024-12-02", content: "請問一月還有名額嗎？", answer: { content: "有的！目前一月中旬還有空位，歡迎應徵！", date: "2024-12-03" } },
      { id: 2, author: "David", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", date: "2024-12-01", content: "請問可以帶狗狗嗎？", answer: { content: "可以喔！我們歡迎毛小孩。", date: "2024-12-01" } }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$l, null, {
        default: withCtx(() => [
          _cache[23] || (_cache[23] = createBaseVNode("div", { class: "bg-light py-3" }, [
            createBaseVNode("div", { class: "container" }, [
              createBaseVNode("nav", { "aria-label": "breadcrumb" }, [
                createBaseVNode("ol", { class: "breadcrumb mb-0" }, [
                  createBaseVNode("li", { class: "breadcrumb-item" }, [
                    createBaseVNode("a", { href: "./index.html" }, "首頁")
                  ]),
                  createBaseVNode("li", { class: "breadcrumb-item" }, [
                    createBaseVNode("a", { href: "./jobs.html" }, "職缺列表")
                  ]),
                  createBaseVNode("li", { class: "breadcrumb-item active" }, "花蓮民宿小幫手")
                ])
              ])
            ])
          ], -1)),
          createBaseVNode("section", _hoisted_1$c, [
            createBaseVNode("div", _hoisted_2$c, [
              createBaseVNode("div", _hoisted_3$c, [
                createBaseVNode("div", _hoisted_4$b, [
                  createBaseVNode("div", _hoisted_5$a, [
                    createBaseVNode("img", {
                      src: job.images[0],
                      class: "img-fluid rounded mb-2 w-100",
                      style: { "height": "400px", "object-fit": "cover" },
                      alt: job.title
                    }, null, 8, _hoisted_6$a),
                    createBaseVNode("div", _hoisted_7$8, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(job.images.slice(1, 5), (img, index) => {
                        return openBlock(), createElementBlock("div", {
                          key: index,
                          class: "col-3"
                        }, [
                          createBaseVNode("img", {
                            src: img,
                            class: "img-fluid rounded",
                            style: { "height": "80px", "object-fit": "cover", "cursor": "pointer" },
                            alt: "Gallery"
                          }, null, 8, _hoisted_8$8)
                        ]);
                      }), 128))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_9$7, [
                    createBaseVNode("div", _hoisted_10$6, [
                      createBaseVNode("div", null, [
                        createBaseVNode("h1", _hoisted_11$6, toDisplayString(job.title), 1),
                        createBaseVNode("p", _hoisted_12$5, [
                          _cache[0] || (_cache[0] = createBaseVNode("i", { class: "fas fa-map-marker-alt me-1" }, null, -1)),
                          createTextVNode(toDisplayString(job.location.city) + " ", 1),
                          _cache[1] || (_cache[1] = createBaseVNode("span", { class: "mx-2" }, "|", -1)),
                          _cache[2] || (_cache[2] = createBaseVNode("i", { class: "fas fa-user me-1" }, null, -1)),
                          createTextVNode(toDisplayString(job.hostName) + " ", 1),
                          _cache[3] || (_cache[3] = createBaseVNode("span", { class: "badge bg-success ms-2" }, [
                            createBaseVNode("i", { class: "fas fa-check-circle me-1" }),
                            createTextVNode("已驗證業主")
                          ], -1))
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_13$4, [
                        createBaseVNode("div", _hoisted_14$3, [
                          _cache[4] || (_cache[4] = createBaseVNode("i", { class: "fas fa-star" }, null, -1)),
                          createTextVNode(" " + toDisplayString(job.averageRating), 1)
                        ]),
                        createBaseVNode("small", _hoisted_15$2, toDisplayString(job.reviewCount) + " 則評論", 1)
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_16$2, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(job.types, (tag) => {
                        return openBlock(), createElementBlock("span", {
                          key: tag,
                          class: "badge bg-light text-dark me-1"
                        }, toDisplayString(tag), 1);
                      }), 128)),
                      job.isUrgent ? (openBlock(), createElementBlock("span", _hoisted_17$1, "急徵")) : createCommentVNode("", true)
                    ])
                  ]),
                  createBaseVNode("ul", _hoisted_18$1, [
                    _cache[5] || (_cache[5] = createBaseVNode("li", { class: "nav-item" }, [
                      createBaseVNode("button", {
                        class: "nav-link active",
                        "data-bs-toggle": "tab",
                        "data-bs-target": "#descTab"
                      }, "職缺說明")
                    ], -1)),
                    _cache[6] || (_cache[6] = createBaseVNode("li", { class: "nav-item" }, [
                      createBaseVNode("button", {
                        class: "nav-link",
                        "data-bs-toggle": "tab",
                        "data-bs-target": "#livingTab"
                      }, "住宿條件")
                    ], -1)),
                    createBaseVNode("li", _hoisted_19$1, [
                      createBaseVNode("button", _hoisted_20$1, "評論 (" + toDisplayString(job.reviewCount) + ")", 1)
                    ]),
                    _cache[7] || (_cache[7] = createBaseVNode("li", { class: "nav-item" }, [
                      createBaseVNode("button", {
                        class: "nav-link",
                        "data-bs-toggle": "tab",
                        "data-bs-target": "#qaTab"
                      }, "問答")
                    ], -1))
                  ]),
                  createBaseVNode("div", _hoisted_21$1, [
                    createBaseVNode("div", _hoisted_22$1, [
                      _cache[8] || (_cache[8] = createBaseVNode("h5", null, "工作內容", -1)),
                      createBaseVNode("p", _hoisted_23$1, toDisplayString(job.description), 1),
                      _cache[9] || (_cache[9] = createBaseVNode("h5", { class: "mt-4" }, "福利條件", -1)),
                      createBaseVNode("ul", _hoisted_24$1, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(job.benefits, (benefit) => {
                          return openBlock(), createElementBlock("li", { key: benefit }, toDisplayString(benefit), 1);
                        }), 128))
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_25, [
                      createBaseVNode("div", _hoisted_26, [
                        createBaseVNode("div", _hoisted_27, [
                          _cache[10] || (_cache[10] = createBaseVNode("h6", null, [
                            createBaseVNode("i", { class: "fas fa-bed me-2 text-primary" }),
                            createTextVNode("住宿類型")
                          ], -1)),
                          createBaseVNode("p", _hoisted_28, toDisplayString(job.living.roomType), 1)
                        ]),
                        createBaseVNode("div", _hoisted_29, [
                          _cache[11] || (_cache[11] = createBaseVNode("h6", null, [
                            createBaseVNode("i", { class: "fas fa-utensils me-2 text-primary" }),
                            createTextVNode("供餐情況")
                          ], -1)),
                          createBaseVNode("p", _hoisted_30, toDisplayString(job.living.meals), 1)
                        ]),
                        createBaseVNode("div", _hoisted_31, [
                          _cache[12] || (_cache[12] = createBaseVNode("h6", null, [
                            createBaseVNode("i", { class: "fas fa-wifi me-2 text-primary" }),
                            createTextVNode("設施")
                          ], -1)),
                          (openBlock(true), createElementBlock(Fragment, null, renderList(job.living.amenities, (item) => {
                            return openBlock(), createElementBlock("span", {
                              key: item,
                              class: "badge bg-light text-dark me-1 mb-1"
                            }, toDisplayString(item), 1);
                          }), 128))
                        ])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_32, [
                      (openBlock(), createElementBlock(Fragment, null, renderList(reviews, (review) => {
                        return createBaseVNode("div", {
                          key: review.id,
                          class: "border-bottom pb-3 mb-3"
                        }, [
                          createBaseVNode("div", _hoisted_33, [
                            createBaseVNode("img", {
                              src: review.author.avatar,
                              class: "rounded-circle me-3",
                              style: { "width": "48px", "height": "48px", "object-fit": "cover" },
                              alt: review.author.name
                            }, null, 8, _hoisted_34),
                            createBaseVNode("div", _hoisted_35, [
                              createBaseVNode("div", _hoisted_36, [
                                createBaseVNode("h6", _hoisted_37, toDisplayString(review.author.name), 1),
                                createBaseVNode("small", _hoisted_38, toDisplayString(review.date), 1)
                              ]),
                              createBaseVNode("div", _hoisted_39, [
                                (openBlock(), createElementBlock(Fragment, null, renderList(5, (n) => {
                                  return createBaseVNode("i", {
                                    key: n,
                                    class: normalizeClass(["fas", n <= review.rating ? "fa-star" : "fa-star text-muted"])
                                  }, null, 2);
                                }), 64))
                              ]),
                              createBaseVNode("p", _hoisted_40, toDisplayString(review.content), 1)
                            ])
                          ])
                        ]);
                      }), 64))
                    ]),
                    createBaseVNode("div", _hoisted_41, [
                      (openBlock(), createElementBlock(Fragment, null, renderList(questions, (qa) => {
                        return createBaseVNode("div", {
                          key: qa.id,
                          class: "border-bottom pb-3 mb-3"
                        }, [
                          createBaseVNode("div", _hoisted_42, [
                            createBaseVNode("img", {
                              src: qa.avatar,
                              class: "rounded-circle me-3",
                              style: { "width": "40px", "height": "40px", "object-fit": "cover" },
                              alt: ""
                            }, null, 8, _hoisted_43),
                            createBaseVNode("div", null, [
                              createBaseVNode("div", _hoisted_44, [
                                createBaseVNode("strong", null, toDisplayString(qa.author), 1),
                                createBaseVNode("small", _hoisted_45, toDisplayString(qa.date), 1)
                              ]),
                              createBaseVNode("p", _hoisted_46, toDisplayString(qa.content), 1),
                              qa.answer ? (openBlock(), createElementBlock("div", _hoisted_47, [
                                _cache[13] || (_cache[13] = createBaseVNode("small", { class: "text-primary" }, [
                                  createBaseVNode("i", { class: "fas fa-comment me-1" }),
                                  createTextVNode("業主回覆：")
                                ], -1)),
                                createBaseVNode("p", _hoisted_48, toDisplayString(qa.answer.content), 1)
                              ])) : createCommentVNode("", true)
                            ])
                          ])
                        ]);
                      }), 64))
                    ])
                  ])
                ]),
                createBaseVNode("div", _hoisted_49, [
                  createBaseVNode("div", _hoisted_50, [
                    createBaseVNode("div", _hoisted_51, [
                      _cache[19] || (_cache[19] = createBaseVNode("h5", { class: "card-title" }, "工作條件", -1)),
                      createBaseVNode("ul", _hoisted_52, [
                        createBaseVNode("li", _hoisted_53, [
                          _cache[14] || (_cache[14] = createBaseVNode("i", { class: "fas fa-clock me-2 text-primary" }, null, -1)),
                          createTextVNode("每日 " + toDisplayString(job.conditions.workHours), 1)
                        ]),
                        createBaseVNode("li", _hoisted_54, [
                          _cache[15] || (_cache[15] = createBaseVNode("i", { class: "fas fa-calendar-week me-2 text-primary" }, null, -1)),
                          createTextVNode(toDisplayString(job.conditions.daysOff), 1)
                        ]),
                        createBaseVNode("li", _hoisted_55, [
                          _cache[16] || (_cache[16] = createBaseVNode("i", { class: "fas fa-dumbbell me-2 text-primary" }, null, -1)),
                          createTextVNode("勞力程度：" + toDisplayString(job.conditions.laborIntensity), 1)
                        ]),
                        createBaseVNode("li", null, [
                          _cache[17] || (_cache[17] = createBaseVNode("i", { class: "fas fa-shield-alt me-2 text-primary" }, null, -1)),
                          createTextVNode("勞健保：" + toDisplayString(job.conditions.insurance ? "有" : "無"), 1)
                        ])
                      ]),
                      _cache[20] || (_cache[20] = createBaseVNode("hr", null, null, -1)),
                      createBaseVNode("div", _hoisted_56, [
                        _cache[18] || (_cache[18] = createBaseVNode("span", { class: "text-muted" }, "最短工期", -1)),
                        createBaseVNode("strong", null, toDisplayString(job.minWeeks) + " 週以上", 1)
                      ]),
                      _cache[21] || (_cache[21] = createBaseVNode("button", { class: "btn btn-primary w-100 mb-2" }, [
                        createBaseVNode("i", { class: "fas fa-paper-plane me-2" }),
                        createTextVNode("立即應徵 ")
                      ], -1)),
                      _cache[22] || (_cache[22] = createBaseVNode("button", {
                        class: "btn btn-outline-secondary w-100",
                        "data-action": "toggle-favorite"
                      }, [
                        createBaseVNode("i", { class: "far fa-heart me-2" }),
                        createTextVNode("加入收藏 ")
                      ], -1))
                    ])
                  ])
                ])
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
});
const _hoisted_1$b = { class: "auth-layout min-vh-100 d-flex align-items-center bg-light" };
const _hoisted_2$b = { class: "container" };
const _hoisted_3$b = { class: "row justify-content-center" };
const _hoisted_4$a = { class: "col-md-6 col-lg-5" };
const _hoisted_5$9 = { class: "card shadow-sm" };
const _hoisted_6$9 = { class: "card-body p-4" };
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "auth-layout",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$b, [
        createBaseVNode("div", _hoisted_2$b, [
          createBaseVNode("div", _hoisted_3$b, [
            createBaseVNode("div", _hoisted_4$a, [
              _cache[0] || (_cache[0] = createBaseVNode("div", { class: "text-center mb-4" }, [
                createBaseVNode("a", {
                  href: "./index.html",
                  class: "text-decoration-none"
                }, [
                  createBaseVNode("h2", { class: "text-primary" }, "Builder 101")
                ]),
                createBaseVNode("p", { class: "text-muted" }, "以工換宿媒合平台")
              ], -1)),
              createBaseVNode("div", _hoisted_5$9, [
                createBaseVNode("div", _hoisted_6$9, [
                  renderSlot(_ctx.$slots, "default")
                ])
              ])
            ])
          ])
        ])
      ]);
    };
  }
});
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "auth-page",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$g, null, {
        default: withCtx(() => [..._cache[0] || (_cache[0] = [
          createBaseVNode("ul", {
            class: "nav nav-tabs nav-fill mb-4",
            role: "tablist"
          }, [
            createBaseVNode("li", { class: "nav-item" }, [
              createBaseVNode("button", {
                class: "nav-link active",
                "data-bs-toggle": "tab",
                "data-bs-target": "#loginTab",
                type: "button"
              }, "登入")
            ]),
            createBaseVNode("li", { class: "nav-item" }, [
              createBaseVNode("button", {
                class: "nav-link",
                "data-bs-toggle": "tab",
                "data-bs-target": "#registerTab",
                type: "button"
              }, "註冊")
            ])
          ], -1),
          createBaseVNode("div", { class: "tab-content" }, [
            createBaseVNode("div", {
              class: "tab-pane fade show active",
              id: "loginTab"
            }, [
              createBaseVNode("form", { id: "loginForm" }, [
                createBaseVNode("div", { class: "mb-3" }, [
                  createBaseVNode("label", { class: "form-label" }, "Email"),
                  createBaseVNode("input", {
                    type: "email",
                    class: "form-control",
                    placeholder: "your@email.com",
                    required: ""
                  })
                ]),
                createBaseVNode("div", { class: "mb-3" }, [
                  createBaseVNode("label", { class: "form-label" }, "密碼"),
                  createBaseVNode("input", {
                    type: "password",
                    class: "form-control",
                    placeholder: "請輸入密碼",
                    required: ""
                  })
                ]),
                createBaseVNode("div", { class: "d-flex justify-content-between align-items-center mb-3" }, [
                  createBaseVNode("div", { class: "form-check" }, [
                    createBaseVNode("input", {
                      class: "form-check-input",
                      type: "checkbox",
                      id: "rememberMe"
                    }),
                    createBaseVNode("label", {
                      class: "form-check-label",
                      for: "rememberMe"
                    }, "記住我")
                  ]),
                  createBaseVNode("a", {
                    href: "#",
                    class: "text-decoration-none small"
                  }, "忘記密碼？")
                ]),
                createBaseVNode("button", {
                  type: "submit",
                  class: "btn btn-primary w-100"
                }, [
                  createBaseVNode("i", { class: "fas fa-sign-in-alt me-2" }),
                  createTextVNode("登入 ")
                ])
              ])
            ]),
            createBaseVNode("div", {
              class: "tab-pane fade",
              id: "registerTab"
            }, [
              createBaseVNode("form", { id: "registerForm" }, [
                createBaseVNode("div", { class: "mb-3" }, [
                  createBaseVNode("label", { class: "form-label" }, "Email"),
                  createBaseVNode("input", {
                    type: "email",
                    class: "form-control",
                    placeholder: "your@email.com",
                    required: ""
                  })
                ]),
                createBaseVNode("div", { class: "mb-3" }, [
                  createBaseVNode("label", { class: "form-label" }, "密碼"),
                  createBaseVNode("input", {
                    type: "password",
                    class: "form-control",
                    placeholder: "至少 8 個字元",
                    required: ""
                  }),
                  createBaseVNode("div", { class: "form-text" }, "密碼需包含至少 8 個字元")
                ]),
                createBaseVNode("div", { class: "mb-3" }, [
                  createBaseVNode("label", { class: "form-label" }, "確認密碼"),
                  createBaseVNode("input", {
                    type: "password",
                    class: "form-control",
                    placeholder: "再次輸入密碼",
                    required: ""
                  })
                ]),
                createBaseVNode("div", { class: "form-check mb-3" }, [
                  createBaseVNode("input", {
                    class: "form-check-input",
                    type: "checkbox",
                    id: "agreeTerms",
                    required: ""
                  }),
                  createBaseVNode("label", {
                    class: "form-check-label",
                    for: "agreeTerms"
                  }, [
                    createTextVNode(" 我已閱讀並同意 "),
                    createBaseVNode("a", { href: "#" }, "服務條款"),
                    createTextVNode(" 與 "),
                    createBaseVNode("a", { href: "#" }, "隱私權政策")
                  ])
                ]),
                createBaseVNode("button", {
                  type: "submit",
                  class: "btn btn-primary w-100"
                }, [
                  createBaseVNode("i", { class: "fas fa-user-plus me-2" }),
                  createTextVNode("建立帳號 ")
                ])
              ])
            ])
          ], -1),
          createBaseVNode("hr", { class: "my-4" }, null, -1),
          createBaseVNode("p", { class: "text-center text-muted small mb-0" }, " 註冊即表示同意 Builder 101 的使用條款與隱私權政策 ", -1)
        ])]),
        _: 1
      });
    };
  }
});
const _hoisted_1$a = { class: "container py-4" };
const _hoisted_2$a = { class: "tab-content" };
const _hoisted_3$a = {
  class: "tab-pane fade show active",
  id: "applicationsTab"
};
const _hoisted_4$9 = { class: "card shadow-sm" };
const _hoisted_5$8 = { class: "card-header bg-white" };
const _hoisted_6$8 = { class: "d-flex justify-content-between align-items-center" };
const _hoisted_7$7 = { class: "list-group list-group-flush" };
const _hoisted_8$7 = { class: "d-flex" };
const _hoisted_9$6 = ["src", "alt"];
const _hoisted_10$5 = { class: "flex-grow-1" };
const _hoisted_11$5 = { class: "d-flex justify-content-between" };
const _hoisted_12$4 = { class: "mb-1" };
const _hoisted_13$3 = { class: "text-muted small mb-1" };
const _hoisted_14$2 = { class: "text-muted small mb-0" };
const _hoisted_15$1 = {
  class: "tab-pane fade",
  id: "favoritesTab"
};
const _hoisted_16$1 = { class: "row g-4" };
const _hoisted_17 = { class: "card h-100 shadow-sm" };
const _hoisted_18 = ["src", "alt"];
const _hoisted_19 = { class: "card-body" };
const _hoisted_20 = { class: "text-muted small mb-2" };
const _hoisted_21 = { class: "text-muted small mb-0" };
const _hoisted_22 = { class: "card-footer bg-white" };
const _hoisted_23 = { class: "d-flex justify-content-between" };
const _hoisted_24 = { class: "text-muted" };
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "dashboard-page",
  setup(__props) {
    const applications = [
      { id: 1, jobId: 1, jobTitle: "花蓮民宿小幫手", hostName: "海角七號民宿", coverImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=200&h=150&fit=crop", status: "VIEWED", appliedAt: "2024-12-01", coverLetter: "" },
      { id: 2, jobId: 2, jobTitle: "墾丁衝浪民宿", hostName: "浪花民宿", coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=150&fit=crop", status: "APPLIED", appliedAt: "2024-12-05", coverLetter: "" }
    ];
    const favorites = [
      { id: 1, jobId: 3, jobTitle: "台東有機農場", hostName: "池上田園", coverImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop", location: "台東縣池上鄉", savedAt: "2024-12-03" },
      { id: 2, jobId: 4, jobTitle: "蘭嶼海景咖啡廳", hostName: "蘭嶼咖啡", coverImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop", location: "台東縣蘭嶼鄉", savedAt: "2024-12-02" }
    ];
    const statusClass = (status) => {
      const map = {
        "APPLIED": "bg-secondary",
        "VIEWED": "bg-success",
        "CONTACTED": "bg-warning text-dark",
        "CLOSED": "bg-dark"
      };
      return map[status];
    };
    const statusText = (status) => {
      const map = {
        "APPLIED": "已送出",
        "VIEWED": "業主已讀",
        "CONTACTED": "邀請面試",
        "CLOSED": "已結束"
      };
      return map[status];
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$l, null, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$a, [
            _cache[4] || (_cache[4] = createBaseVNode("h2", { class: "mb-4" }, "會員中心", -1)),
            _cache[5] || (_cache[5] = createBaseVNode("ul", {
              class: "nav nav-tabs mb-4",
              role: "tablist"
            }, [
              createBaseVNode("li", { class: "nav-item" }, [
                createBaseVNode("button", {
                  class: "nav-link active",
                  "data-bs-toggle": "tab",
                  "data-bs-target": "#applicationsTab"
                }, [
                  createBaseVNode("i", { class: "fas fa-paper-plane me-2" }),
                  createTextVNode("應徵管理 ")
                ])
              ]),
              createBaseVNode("li", { class: "nav-item" }, [
                createBaseVNode("button", {
                  class: "nav-link",
                  "data-bs-toggle": "tab",
                  "data-bs-target": "#favoritesTab"
                }, [
                  createBaseVNode("i", { class: "fas fa-heart me-2" }),
                  createTextVNode("收藏夾 ")
                ])
              ]),
              createBaseVNode("li", { class: "nav-item" }, [
                createBaseVNode("button", {
                  class: "nav-link",
                  "data-bs-toggle": "tab",
                  "data-bs-target": "#settingsTab"
                }, [
                  createBaseVNode("i", { class: "fas fa-cog me-2" }),
                  createTextVNode("個人設定 ")
                ])
              ])
            ], -1)),
            createBaseVNode("div", _hoisted_2$a, [
              createBaseVNode("div", _hoisted_3$a, [
                createBaseVNode("div", _hoisted_4$9, [
                  createBaseVNode("div", _hoisted_5$8, [
                    createBaseVNode("div", _hoisted_6$8, [
                      createBaseVNode("span", null, "我的應徵 (" + toDisplayString(applications.length) + ")", 1),
                      _cache[0] || (_cache[0] = createBaseVNode("select", {
                        class: "form-select form-select-sm",
                        style: { "width": "auto" }
                      }, [
                        createBaseVNode("option", null, "全部狀態"),
                        createBaseVNode("option", null, "進行中"),
                        createBaseVNode("option", null, "已結束")
                      ], -1))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_7$7, [
                    (openBlock(), createElementBlock(Fragment, null, renderList(applications, (app) => {
                      return createBaseVNode("div", {
                        key: app.id,
                        class: "list-group-item"
                      }, [
                        createBaseVNode("div", _hoisted_8$7, [
                          createBaseVNode("img", {
                            src: app.coverImage,
                            class: "rounded me-3",
                            style: { "width": "80px", "height": "60px", "object-fit": "cover" },
                            alt: app.jobTitle
                          }, null, 8, _hoisted_9$6),
                          createBaseVNode("div", _hoisted_10$5, [
                            createBaseVNode("div", _hoisted_11$5, [
                              createBaseVNode("h6", _hoisted_12$4, toDisplayString(app.jobTitle), 1),
                              createBaseVNode("span", {
                                class: normalizeClass(["badge", statusClass(app.status)])
                              }, toDisplayString(statusText(app.status)), 3)
                            ]),
                            createBaseVNode("p", _hoisted_13$3, toDisplayString(app.hostName), 1),
                            createBaseVNode("p", _hoisted_14$2, "應徵時間：" + toDisplayString(app.appliedAt), 1)
                          ])
                        ])
                      ]);
                    }), 64))
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_15$1, [
                createBaseVNode("div", _hoisted_16$1, [
                  (openBlock(), createElementBlock(Fragment, null, renderList(favorites, (fav) => {
                    return createBaseVNode("div", {
                      key: fav.id,
                      class: "col-md-6 col-lg-4"
                    }, [
                      createBaseVNode("div", _hoisted_17, [
                        createBaseVNode("img", {
                          src: fav.coverImage,
                          class: "card-img-top",
                          style: { "height": "150px", "object-fit": "cover" },
                          alt: fav.jobTitle
                        }, null, 8, _hoisted_18),
                        createBaseVNode("div", _hoisted_19, [
                          createBaseVNode("h6", null, toDisplayString(fav.jobTitle), 1),
                          createBaseVNode("p", _hoisted_20, toDisplayString(fav.hostName), 1),
                          createBaseVNode("p", _hoisted_21, [
                            _cache[1] || (_cache[1] = createBaseVNode("i", { class: "fas fa-map-marker-alt me-1" }, null, -1)),
                            createTextVNode(toDisplayString(fav.location), 1)
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_22, [
                          createBaseVNode("div", _hoisted_23, [
                            createBaseVNode("small", _hoisted_24, "收藏於 " + toDisplayString(fav.savedAt), 1),
                            _cache[2] || (_cache[2] = createBaseVNode("button", {
                              class: "btn btn-sm btn-outline-danger",
                              "data-action": "remove-favorite"
                            }, [
                              createBaseVNode("i", { class: "fas fa-trash" })
                            ], -1))
                          ])
                        ])
                      ])
                    ]);
                  }), 64))
                ])
              ]),
              _cache[3] || (_cache[3] = createBaseVNode("div", {
                class: "tab-pane fade",
                id: "settingsTab"
              }, [
                createBaseVNode("div", { class: "row" }, [
                  createBaseVNode("div", { class: "col-lg-8" }, [
                    createBaseVNode("div", { class: "card shadow-sm mb-4" }, [
                      createBaseVNode("div", { class: "card-header bg-white" }, [
                        createBaseVNode("h6", { class: "mb-0" }, "基本資料")
                      ]),
                      createBaseVNode("div", { class: "card-body" }, [
                        createBaseVNode("div", { class: "row mb-3" }, [
                          createBaseVNode("div", { class: "col-md-4 text-center mb-3 mb-md-0" }, [
                            createBaseVNode("img", {
                              src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
                              class: "rounded-circle mb-2",
                              style: { "width": "120px", "height": "120px", "object-fit": "cover" },
                              alt: "Avatar"
                            }),
                            createBaseVNode("div", null, [
                              createBaseVNode("button", { class: "btn btn-sm btn-outline-primary" }, "更換頭像")
                            ])
                          ]),
                          createBaseVNode("div", { class: "col-md-8" }, [
                            createBaseVNode("div", { class: "mb-3" }, [
                              createBaseVNode("label", { class: "form-label" }, "暱稱"),
                              createBaseVNode("input", {
                                type: "text",
                                class: "form-control",
                                value: "Alice 小A"
                              })
                            ]),
                            createBaseVNode("div", { class: "mb-3" }, [
                              createBaseVNode("label", { class: "form-label" }, "Email"),
                              createBaseVNode("input", {
                                type: "email",
                                class: "form-control",
                                value: "alice@example.com",
                                readonly: ""
                              }),
                              createBaseVNode("span", { class: "badge bg-success mt-1" }, [
                                createBaseVNode("i", { class: "fas fa-check me-1" }),
                                createTextVNode("已驗證")
                              ])
                            ])
                          ])
                        ]),
                        createBaseVNode("div", { class: "mb-3" }, [
                          createBaseVNode("label", { class: "form-label" }, "自我介紹"),
                          createBaseVNode("textarea", {
                            class: "form-control",
                            rows: "3"
                          }, "喜歡旅行和認識新朋友，想嘗試不同的換宿體驗！")
                        ]),
                        createBaseVNode("button", { class: "btn btn-primary" }, "儲存變更")
                      ])
                    ])
                  ])
                ])
              ], -1))
            ])
          ])
        ]),
        _: 1
      });
    };
  }
});
const _hoisted_1$9 = { class: "py-5" };
const _hoisted_2$9 = { class: "container" };
const _hoisted_3$9 = { class: "row justify-content-center" };
const _hoisted_4$8 = { class: "col-lg-8" };
const _hoisted_5$7 = { class: "mb-5" };
const _hoisted_6$7 = { class: "d-flex flex-wrap gap-2" };
const _hoisted_7$6 = { class: "card shadow-sm" };
const _hoisted_8$6 = { class: "card-body" };
const _hoisted_9$5 = { id: "contactForm" };
const _hoisted_10$4 = { class: "mb-3" };
const _hoisted_11$4 = { class: "form-select" };
const _hoisted_12$3 = ["value"];
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "contact-page",
  setup(__props) {
    const faqCategories = [
      { value: "general", label: "一般問題", icon: "fas fa-question-circle" },
      { value: "application", label: "應徵相關", icon: "fas fa-paper-plane" },
      { value: "account", label: "帳號安全", icon: "fas fa-user-shield" },
      { value: "dispute", label: "爭議處理", icon: "fas fa-balance-scale" }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$l, null, {
        default: withCtx(() => [
          createBaseVNode("section", _hoisted_1$9, [
            createBaseVNode("div", _hoisted_2$9, [
              createBaseVNode("div", _hoisted_3$9, [
                createBaseVNode("div", _hoisted_4$8, [
                  _cache[6] || (_cache[6] = createBaseVNode("div", { class: "text-center mb-5" }, [
                    createBaseVNode("h1", { class: "display-5 fw-bold" }, "需要聊聊嗎？"),
                    createBaseVNode("p", { class: "lead text-muted" }, "有任何問題，歡迎與我們聯繫！")
                  ], -1)),
                  createBaseVNode("div", _hoisted_5$7, [
                    _cache[0] || (_cache[0] = createBaseVNode("h5", { class: "mb-3" }, "常見問題類別", -1)),
                    createBaseVNode("div", _hoisted_6$7, [
                      (openBlock(), createElementBlock(Fragment, null, renderList(faqCategories, (category) => {
                        return createBaseVNode("a", {
                          key: category.value,
                          href: "./faq.html",
                          class: "btn btn-outline-primary"
                        }, [
                          createBaseVNode("i", {
                            class: normalizeClass([category.icon, "me-2"])
                          }, null, 2),
                          createTextVNode(toDisplayString(category.label), 1)
                        ]);
                      }), 64))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_7$6, [
                    _cache[5] || (_cache[5] = createBaseVNode("div", { class: "card-header bg-white" }, [
                      createBaseVNode("h5", { class: "mb-0" }, [
                        createBaseVNode("i", { class: "fas fa-envelope me-2" }),
                        createTextVNode("聯絡表單")
                      ])
                    ], -1)),
                    createBaseVNode("div", _hoisted_8$6, [
                      createBaseVNode("form", _hoisted_9$5, [
                        _cache[2] || (_cache[2] = createBaseVNode("div", { class: "row" }, [
                          createBaseVNode("div", { class: "col-md-6 mb-3" }, [
                            createBaseVNode("label", { class: "form-label" }, [
                              createTextVNode("姓名 "),
                              createBaseVNode("span", { class: "text-danger" }, "*")
                            ]),
                            createBaseVNode("input", {
                              type: "text",
                              class: "form-control",
                              placeholder: "您的姓名",
                              required: ""
                            })
                          ]),
                          createBaseVNode("div", { class: "col-md-6 mb-3" }, [
                            createBaseVNode("label", { class: "form-label" }, [
                              createTextVNode("Email "),
                              createBaseVNode("span", { class: "text-danger" }, "*")
                            ]),
                            createBaseVNode("input", {
                              type: "email",
                              class: "form-control",
                              placeholder: "your@email.com",
                              required: ""
                            })
                          ])
                        ], -1)),
                        createBaseVNode("div", _hoisted_10$4, [
                          _cache[1] || (_cache[1] = createBaseVNode("label", { class: "form-label" }, "問題類別", -1)),
                          createBaseVNode("select", _hoisted_11$4, [
                            (openBlock(), createElementBlock(Fragment, null, renderList(faqCategories, (category) => {
                              return createBaseVNode("option", {
                                key: category.value,
                                value: category.value
                              }, toDisplayString(category.label), 9, _hoisted_12$3);
                            }), 64))
                          ])
                        ]),
                        _cache[3] || (_cache[3] = createBaseVNode("div", { class: "mb-3" }, [
                          createBaseVNode("label", { class: "form-label" }, [
                            createTextVNode("訊息內容 "),
                            createBaseVNode("span", { class: "text-danger" }, "*")
                          ]),
                          createBaseVNode("textarea", {
                            class: "form-control",
                            rows: "5",
                            placeholder: "請描述您的問題或建議...",
                            required: ""
                          })
                        ], -1)),
                        _cache[4] || (_cache[4] = createBaseVNode("button", {
                          type: "submit",
                          class: "btn btn-primary"
                        }, [
                          createBaseVNode("i", { class: "fas fa-paper-plane me-2" }),
                          createTextVNode("送出訊息 ")
                        ], -1))
                      ])
                    ])
                  ]),
                  _cache[7] || (_cache[7] = createBaseVNode("div", { class: "row mt-5 text-center" }, [
                    createBaseVNode("div", { class: "col-md-4 mb-3" }, [
                      createBaseVNode("div", { class: "p-3" }, [
                        createBaseVNode("i", { class: "fas fa-envelope fa-2x text-primary mb-3" }),
                        createBaseVNode("h6", null, "Email"),
                        createBaseVNode("p", { class: "text-muted mb-0" }, "support@builder101.com")
                      ])
                    ]),
                    createBaseVNode("div", { class: "col-md-4 mb-3" }, [
                      createBaseVNode("div", { class: "p-3" }, [
                        createBaseVNode("i", { class: "fab fa-line fa-2x text-success mb-3" }),
                        createBaseVNode("h6", null, "Line@"),
                        createBaseVNode("p", { class: "text-muted mb-0" }, "@builder101")
                      ])
                    ]),
                    createBaseVNode("div", { class: "col-md-4 mb-3" }, [
                      createBaseVNode("div", { class: "p-3" }, [
                        createBaseVNode("i", { class: "fas fa-clock fa-2x text-warning mb-3" }),
                        createBaseVNode("h6", null, "回覆時間"),
                        createBaseVNode("p", { class: "text-muted mb-0" }, "1-2 個工作天")
                      ])
                    ])
                  ], -1))
                ])
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
});
const _hoisted_1$8 = { class: "py-5" };
const _hoisted_2$8 = { class: "container" };
const _hoisted_3$8 = { class: "row g-4 mb-5" };
const _hoisted_4$7 = { class: "card h-100 border-0 shadow-sm text-center" };
const _hoisted_5$6 = { class: "card-body" };
const _hoisted_6$6 = {
  class: "bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center",
  style: { "width": "64px", "height": "64px", "font-size": "1.5rem", "font-weight": "bold" }
};
const _hoisted_7$5 = { class: "text-muted" };
const _hoisted_8$5 = { class: "row mb-5" };
const _hoisted_9$4 = { class: "col-lg-6 mb-4" };
const _hoisted_10$3 = { class: "card border-0 shadow-sm h-100" };
const _hoisted_11$3 = { class: "card-body" };
const _hoisted_12$2 = { class: "list-group list-group-numbered list-group-flush" };
const _hoisted_13$2 = { class: "col-lg-6 mb-4" };
const _hoisted_14$1 = { class: "card border-0 shadow-sm h-100" };
const _hoisted_15 = { class: "card-body" };
const _hoisted_16 = { class: "list-group list-group-numbered list-group-flush" };
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "how-to-page",
  setup(__props) {
    const steps = [
      { title: "註冊帳號", description: "填寫基本資料，完成 Email 驗證，開始探索換宿機會" },
      { title: "搜尋媒合", description: "依照地點、類型、時間篩選，找到適合你的換宿職缺" },
      { title: "開始冒險", description: "與業主聯繫確認細節，準備行囊，出發去冒險！" }
    ];
    const builderSteps = [
      "註冊帳號並完成 Email 驗證",
      "填寫個人資料與技能偏好",
      "瀏覽職缺列表，使用篩選器找到理想換宿",
      "點擊「應徵」送出申請，撰寫求職信",
      "等待業主回覆，進行面試或確認",
      "收到錄取通知後，確認入住日期",
      "完成換宿後，為對方撰寫評論"
    ];
    const hostSteps = [
      "註冊帳號並完成 Email 驗證",
      "提交業主身份驗證資料",
      "刊登職缺，詳填工作內容與住宿條件",
      "審核志工應徵資料",
      "主動聯繫或回覆志工詢問",
      "確認錄取，寄送入住須知",
      "換宿結束後，為志工撰寫評論"
    ];
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$l, null, {
        default: withCtx(() => [
          createBaseVNode("section", _hoisted_1$8, [
            createBaseVNode("div", _hoisted_2$8, [
              _cache[2] || (_cache[2] = createBaseVNode("div", { class: "text-center mb-5" }, [
                createBaseVNode("h1", { class: "display-5 fw-bold" }, "如何運作"),
                createBaseVNode("p", { class: "lead text-muted" }, "三個步驟，開始你的換宿冒險")
              ], -1)),
              createBaseVNode("div", _hoisted_3$8, [
                (openBlock(), createElementBlock(Fragment, null, renderList(steps, (step, index) => {
                  return createBaseVNode("div", {
                    key: step.title,
                    class: "col-md-4"
                  }, [
                    createBaseVNode("div", _hoisted_4$7, [
                      createBaseVNode("div", _hoisted_5$6, [
                        createBaseVNode("div", _hoisted_6$6, toDisplayString(index + 1), 1),
                        createBaseVNode("h4", null, toDisplayString(step.title), 1),
                        createBaseVNode("p", _hoisted_7$5, toDisplayString(step.description), 1)
                      ])
                    ])
                  ]);
                }), 64))
              ]),
              createBaseVNode("div", _hoisted_8$5, [
                createBaseVNode("div", _hoisted_9$4, [
                  createBaseVNode("div", _hoisted_10$3, [
                    _cache[0] || (_cache[0] = createBaseVNode("div", { class: "card-header bg-primary text-white" }, [
                      createBaseVNode("h4", { class: "mb-0" }, [
                        createBaseVNode("i", { class: "fas fa-user me-2" }),
                        createTextVNode("我是志工 (Builder)")
                      ])
                    ], -1)),
                    createBaseVNode("div", _hoisted_11$3, [
                      createBaseVNode("ol", _hoisted_12$2, [
                        (openBlock(), createElementBlock(Fragment, null, renderList(builderSteps, (item) => {
                          return createBaseVNode("li", {
                            key: item,
                            class: "list-group-item"
                          }, toDisplayString(item), 1);
                        }), 64))
                      ])
                    ])
                  ])
                ]),
                createBaseVNode("div", _hoisted_13$2, [
                  createBaseVNode("div", _hoisted_14$1, [
                    _cache[1] || (_cache[1] = createBaseVNode("div", { class: "card-header bg-success text-white" }, [
                      createBaseVNode("h4", { class: "mb-0" }, [
                        createBaseVNode("i", { class: "fas fa-home me-2" }),
                        createTextVNode("我是業主 (Host)")
                      ])
                    ], -1)),
                    createBaseVNode("div", _hoisted_15, [
                      createBaseVNode("ol", _hoisted_16, [
                        (openBlock(), createElementBlock(Fragment, null, renderList(hostSteps, (item) => {
                          return createBaseVNode("li", {
                            key: item,
                            class: "list-group-item"
                          }, toDisplayString(item), 1);
                        }), 64))
                      ])
                    ])
                  ])
                ])
              ]),
              _cache[3] || (_cache[3] = createBaseVNode("div", { class: "text-center" }, [
                createBaseVNode("h3", { class: "mb-4" }, "準備好開始了嗎？"),
                createBaseVNode("a", {
                  href: "./jobs.html",
                  class: "btn btn-primary btn-lg me-2"
                }, [
                  createBaseVNode("i", { class: "fas fa-search me-2" }),
                  createTextVNode("探索職缺 ")
                ]),
                createBaseVNode("a", {
                  href: "./auth.html",
                  class: "btn btn-outline-primary btn-lg"
                }, [
                  createBaseVNode("i", { class: "fas fa-user-plus me-2" }),
                  createTextVNode("免費註冊 ")
                ])
              ], -1))
            ])
          ])
        ]),
        _: 1
      });
    };
  }
});
const _hoisted_1$7 = { class: "py-5" };
const _hoisted_2$7 = { class: "container" };
const _hoisted_3$7 = { class: "row" };
const _hoisted_4$6 = { class: "col-lg-3 mb-4" };
const _hoisted_5$5 = {
  class: "nav flex-column nav-pills",
  role: "tablist"
};
const _hoisted_6$5 = ["data-bs-target"];
const _hoisted_7$4 = { class: "col-lg-9" };
const _hoisted_8$4 = { class: "tab-content" };
const _hoisted_9$3 = ["id"];
const _hoisted_10$2 = ["id"];
const _hoisted_11$2 = { class: "accordion-header" };
const _hoisted_12$1 = ["data-bs-target"];
const _hoisted_13$1 = ["id", "data-bs-parent"];
const _hoisted_14 = { class: "accordion-body text-muted" };
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "faq-page",
  setup(__props) {
    const categories = [
      {
        id: "general",
        name: "一般問題",
        icon: "fas fa-question-circle",
        faqs: [
          { q: "什麼是打工換宿？", a: "打工換宿是指志工以每日數小時的勞務工作，換取免費住宿的旅遊方式。常見於民宿、農場、咖啡廳等場所。" },
          { q: "Builder 101 是免費的嗎？", a: "是的！志工使用平台完全免費。業主刊登職缺目前也是免費的。" },
          { q: "換宿期間需要自付哪些費用？", a: "依各職缺條件而定，通常志工需自付：交通費、部分餐費（若非全包）、個人消費。詳細資訊請參考各職缺說明。" }
        ]
      },
      {
        id: "application",
        name: "應徵相關",
        icon: "fas fa-paper-plane",
        faqs: [
          { q: "如何應徵職缺？", a: "登入帳號後，在職缺詳情頁點擊「應徵」按鈕，填寫求職信即可送出申請。" },
          { q: "應徵後多久會有回覆？", a: "一般 3-7 個工作天內會收到業主回覆。若超過 14 天未回覆，可視為未錄取。" },
          { q: "可以同時應徵多個職缺嗎？", a: "可以！但請留意各職缺的工作期間是否有衝突，並誠實告知業主您的應徵狀況。" }
        ]
      },
      {
        id: "account",
        name: "帳號安全",
        icon: "fas fa-user-shield",
        faqs: [
          { q: "如何修改密碼？", a: "登入後進入「會員中心」>「個人設定」，點擊「修改密碼」即可變更。" },
          { q: "忘記密碼怎麼辦？", a: "在登入頁面點擊「忘記密碼」，輸入註冊 Email，系統將寄送密碼重設連結。" },
          { q: "如何提升帳號驗證等級？", a: "完成 Email 驗證為 L1，完成身份手機驗證為 L2。更高等級可增加信任度與媒合機會。" }
        ]
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$l, null, {
        default: withCtx(() => [
          createBaseVNode("section", _hoisted_1$7, [
            createBaseVNode("div", _hoisted_2$7, [
              _cache[0] || (_cache[0] = createBaseVNode("div", { class: "text-center mb-5" }, [
                createBaseVNode("h1", { class: "display-5 fw-bold" }, "常見問答"),
                createBaseVNode("p", { class: "lead text-muted" }, [
                  createTextVNode("找不到答案？歡迎"),
                  createBaseVNode("a", { href: "./contact.html" }, "聯絡我們")
                ])
              ], -1)),
              createBaseVNode("div", _hoisted_3$7, [
                createBaseVNode("div", _hoisted_4$6, [
                  createBaseVNode("div", _hoisted_5$5, [
                    (openBlock(), createElementBlock(Fragment, null, renderList(categories, (cat, index) => {
                      return createBaseVNode("button", {
                        key: cat.id,
                        class: normalizeClass(["nav-link text-start", { active: index === 0 }]),
                        "data-bs-toggle": "pill",
                        "data-bs-target": `#${cat.id}`
                      }, [
                        createBaseVNode("i", {
                          class: normalizeClass([cat.icon, "me-2"])
                        }, null, 2),
                        createTextVNode(toDisplayString(cat.name), 1)
                      ], 10, _hoisted_6$5);
                    }), 64))
                  ])
                ]),
                createBaseVNode("div", _hoisted_7$4, [
                  createBaseVNode("div", _hoisted_8$4, [
                    (openBlock(), createElementBlock(Fragment, null, renderList(categories, (cat, catIndex) => {
                      return createBaseVNode("div", {
                        key: cat.id,
                        class: normalizeClass(["tab-pane fade", { "show active": catIndex === 0 }]),
                        id: cat.id
                      }, [
                        createBaseVNode("div", {
                          class: "accordion",
                          id: `accordion-${cat.id}`
                        }, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(cat.faqs, (faq, faqIndex) => {
                            return openBlock(), createElementBlock("div", {
                              key: faq.q,
                              class: "accordion-item"
                            }, [
                              createBaseVNode("h2", _hoisted_11$2, [
                                createBaseVNode("button", {
                                  class: normalizeClass(["accordion-button", { collapsed: faqIndex !== 0 }]),
                                  "data-bs-toggle": "collapse",
                                  "data-bs-target": `#${cat.id}-${faqIndex}`
                                }, toDisplayString(faq.q), 11, _hoisted_12$1)
                              ]),
                              createBaseVNode("div", {
                                id: `${cat.id}-${faqIndex}`,
                                class: normalizeClass(["accordion-collapse collapse", { show: faqIndex === 0 }]),
                                "data-bs-parent": `#accordion-${cat.id}`
                              }, [
                                createBaseVNode("div", _hoisted_14, toDisplayString(faq.a), 1)
                              ], 10, _hoisted_13$1)
                            ]);
                          }), 128))
                        ], 8, _hoisted_10$2)
                      ], 10, _hoisted_9$3);
                    }), 64))
                  ])
                ])
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
});
const _hoisted_1$6 = { class: "card border-0 shadow-sm text-center h-100 card-hover" };
const _hoisted_2$6 = { class: "card-body p-4" };
const _hoisted_3$6 = ["src", "alt"];
const _hoisted_4$5 = { class: "card-title mb-1" };
const _hoisted_5$4 = { class: "text-muted small mb-2" };
const _hoisted_6$4 = { class: "card-text small text-muted" };
const _hoisted_7$3 = { class: "social-links mt-3" };
const _hoisted_8$3 = ["href"];
const _hoisted_9$2 = ["href"];
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "team-member-card",
  props: {
    member: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        createBaseVNode("div", _hoisted_2$6, [
          createBaseVNode("img", {
            src: __props.member.avatar,
            alt: __props.member.name,
            class: "rounded-circle mb-3",
            style: { "width": "120px", "height": "120px", "object-fit": "cover" }
          }, null, 8, _hoisted_3$6),
          createBaseVNode("h5", _hoisted_4$5, toDisplayString(__props.member.name), 1),
          createBaseVNode("p", _hoisted_5$4, toDisplayString(__props.member.title), 1),
          createBaseVNode("p", _hoisted_6$4, toDisplayString(__props.member.bio), 1),
          createBaseVNode("div", _hoisted_7$3, [
            __props.member.linkedin ? (openBlock(), createElementBlock("a", {
              key: 0,
              href: __props.member.linkedin,
              class: "text-muted me-2"
            }, [..._cache[0] || (_cache[0] = [
              createBaseVNode("i", { class: "fab fa-linkedin fa-lg" }, null, -1)
            ])], 8, _hoisted_8$3)) : createCommentVNode("", true),
            __props.member.github ? (openBlock(), createElementBlock("a", {
              key: 1,
              href: __props.member.github,
              class: "text-muted"
            }, [..._cache[1] || (_cache[1] = [
              createBaseVNode("i", { class: "fab fa-github fa-lg" }, null, -1)
            ])], 8, _hoisted_9$2)) : createCommentVNode("", true)
          ])
        ])
      ]);
    };
  }
});
const TeamMemberCard = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-29762c2f"]]);
const _hoisted_1$5 = { class: "team-photos py-5 bg-light" };
const _hoisted_2$5 = { class: "container" };
const _hoisted_3$5 = {
  id: "teamPhotosCarousel",
  class: "carousel slide",
  "data-bs-ride": "carousel"
};
const _hoisted_4$4 = { class: "carousel-inner rounded-3 overflow-hidden shadow" };
const _hoisted_5$3 = ["src", "alt"];
const _hoisted_6$3 = { class: "team-members py-5" };
const _hoisted_7$2 = { class: "container" };
const _hoisted_8$2 = { class: "row g-4" };
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "about-page",
  setup(__props) {
    const teamPhotos = [
      {
        src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=400&fit=crop",
        alt: "團隊戶外活動"
      },
      {
        src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&h=400&fit=crop",
        alt: "團隊討論會議"
      },
      {
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop",
        alt: "團隊工作場景"
      }
    ];
    const teamMembers = [
      {
        name: "Kevin Chen",
        title: "Founder & CEO",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
        bio: "熱愛旅行與科技，致力於打造更美好的換宿體驗。",
        linkedin: "#",
        github: "#"
      },
      {
        name: "Lisa Wang",
        title: "Product Manager",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
        bio: "專注於使用者體驗，讓每個操作都簡單直覺。",
        linkedin: "#"
      },
      {
        name: "David Lee",
        title: "Lead Developer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
        bio: "全端工程師，熱衷於用程式解決問題。",
        github: "#"
      },
      {
        name: "Amy Huang",
        title: "Community Manager",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
        bio: "負責維護社群關係，連結志願者與民宿主。",
        linkedin: "#"
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$l, null, {
        default: withCtx(() => [
          _cache[3] || (_cache[3] = createBaseVNode("section", { class: "about-hero bg-primary text-white py-5" }, [
            createBaseVNode("div", { class: "container text-center" }, [
              createBaseVNode("h1", { class: "display-4 fw-bold animate__animated animate__fadeInDown" }, "關於我們"),
              createBaseVNode("p", { class: "lead mt-3 animate__animated animate__fadeInUp" }, "一群致力於連結志願者與民宿主的夥伴")
            ])
          ], -1)),
          createBaseVNode("section", _hoisted_1$5, [
            createBaseVNode("div", _hoisted_2$5, [
              createBaseVNode("div", _hoisted_3$5, [
                createBaseVNode("div", _hoisted_4$4, [
                  (openBlock(), createElementBlock(Fragment, null, renderList(teamPhotos, (photo, index) => {
                    return createBaseVNode("div", {
                      key: photo.alt,
                      class: normalizeClass(["carousel-item", { active: index === 0 }])
                    }, [
                      createBaseVNode("img", {
                        src: photo.src,
                        alt: photo.alt,
                        class: "d-block w-100",
                        style: { "height": "400px", "object-fit": "cover" }
                      }, null, 8, _hoisted_5$3)
                    ], 2);
                  }), 64))
                ]),
                _cache[0] || (_cache[0] = createBaseVNode("button", {
                  class: "carousel-control-prev",
                  type: "button",
                  "data-bs-target": "#teamPhotosCarousel",
                  "data-bs-slide": "prev"
                }, [
                  createBaseVNode("span", { class: "carousel-control-prev-icon" })
                ], -1)),
                _cache[1] || (_cache[1] = createBaseVNode("button", {
                  class: "carousel-control-next",
                  type: "button",
                  "data-bs-target": "#teamPhotosCarousel",
                  "data-bs-slide": "next"
                }, [
                  createBaseVNode("span", { class: "carousel-control-next-icon" })
                ], -1))
              ])
            ])
          ]),
          _cache[4] || (_cache[4] = createBaseVNode("section", { class: "platform-intro py-5" }, [
            createBaseVNode("div", { class: "container" }, [
              createBaseVNode("div", { class: "row justify-content-center" }, [
                createBaseVNode("div", { class: "col-lg-8 text-center" }, [
                  createBaseVNode("h2", { class: "mb-4" }, "Builder 101 是什麼？"),
                  createBaseVNode("p", { class: "lead text-muted" }, " Builder 101 是一群致力於推動「以工換宿」文化的夥伴所建立的媒合平台。 我們相信旅行不只是觀光，更是一種生活方式的探索。 "),
                  createBaseVNode("p", { class: "text-muted mb-4" }, " 透過我們的平台，志願者可以在旅途中貢獻自己的專長，換取免費住宿； 民宿主則能獲得來自世界各地的協助，同時與志願者交流文化。 這是一種雙贏的合作模式，讓每一次的相遇都充滿意義。 "),
                  createBaseVNode("div", { class: "row g-4 text-center mt-4" }, [
                    createBaseVNode("div", { class: "col-md-4" }, [
                      createBaseVNode("div", { class: "stat-box" }, [
                        createBaseVNode("h3", { class: "text-primary display-5 fw-bold" }, "500+"),
                        createBaseVNode("p", { class: "text-muted mb-0" }, "合作民宿")
                      ])
                    ]),
                    createBaseVNode("div", { class: "col-md-4" }, [
                      createBaseVNode("div", { class: "stat-box" }, [
                        createBaseVNode("h3", { class: "text-primary display-5 fw-bold" }, "2000+"),
                        createBaseVNode("p", { class: "text-muted mb-0" }, "活躍志願者")
                      ])
                    ]),
                    createBaseVNode("div", { class: "col-md-4" }, [
                      createBaseVNode("div", { class: "stat-box" }, [
                        createBaseVNode("h3", { class: "text-primary display-5 fw-bold" }, "10000+"),
                        createBaseVNode("p", { class: "text-muted mb-0" }, "成功媒合")
                      ])
                    ])
                  ])
                ])
              ])
            ])
          ], -1)),
          _cache[5] || (_cache[5] = createBaseVNode("section", { class: "mission py-5 bg-light" }, [
            createBaseVNode("div", { class: "container" }, [
              createBaseVNode("div", { class: "row align-items-center g-5" }, [
                createBaseVNode("div", { class: "col-lg-6" }, [
                  createBaseVNode("img", {
                    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
                    alt: "團隊合作",
                    class: "img-fluid rounded-3 shadow"
                  })
                ]),
                createBaseVNode("div", { class: "col-lg-6" }, [
                  createBaseVNode("h2", { class: "mb-4" }, "我們的使命"),
                  createBaseVNode("p", { class: "text-muted" }, " 我們希望打破傳統旅行的框架，讓每個人都能透過自己的技能與熱情， 在世界各地找到屬於自己的第二個家。 "),
                  createBaseVNode("ul", { class: "list-unstyled mt-4" }, [
                    createBaseVNode("li", { class: "d-flex align-items-center mb-3" }, [
                      createBaseVNode("i", { class: "fas fa-check-circle text-success me-3 fa-lg" }),
                      createBaseVNode("span", null, "建立安全可靠的媒合環境")
                    ]),
                    createBaseVNode("li", { class: "d-flex align-items-center mb-3" }, [
                      createBaseVNode("i", { class: "fas fa-check-circle text-success me-3 fa-lg" }),
                      createBaseVNode("span", null, "促進跨文化交流與理解")
                    ]),
                    createBaseVNode("li", { class: "d-flex align-items-center mb-3" }, [
                      createBaseVNode("i", { class: "fas fa-check-circle text-success me-3 fa-lg" }),
                      createBaseVNode("span", null, "支持在地社區永續發展")
                    ]),
                    createBaseVNode("li", { class: "d-flex align-items-center mb-3" }, [
                      createBaseVNode("i", { class: "fas fa-check-circle text-success me-3 fa-lg" }),
                      createBaseVNode("span", null, "讓旅行成為學習與成長的機會")
                    ])
                  ])
                ])
              ])
            ])
          ], -1)),
          createBaseVNode("section", _hoisted_6$3, [
            createBaseVNode("div", _hoisted_7$2, [
              _cache[2] || (_cache[2] = createBaseVNode("h2", { class: "text-center mb-5" }, "團隊成員", -1)),
              createBaseVNode("div", _hoisted_8$2, [
                (openBlock(), createElementBlock(Fragment, null, renderList(teamMembers, (member) => {
                  return createBaseVNode("div", {
                    key: member.name,
                    class: "col-md-6 col-lg-3"
                  }, [
                    createVNode(TeamMemberCard, { member }, null, 8, ["member"])
                  ]);
                }), 64))
              ])
            ])
          ]),
          _cache[6] || (_cache[6] = createBaseVNode("section", { class: "cta py-5 bg-primary text-white" }, [
            createBaseVNode("div", { class: "container text-center" }, [
              createBaseVNode("h2", { class: "mb-4" }, "準備好開始你的旅程了嗎？"),
              createBaseVNode("p", { class: "lead mb-4" }, "加入 Builder 101，開啟你的以工換宿冒險"),
              createBaseVNode("a", {
                href: "./jobs.html",
                class: "btn btn-light btn-lg me-2"
              }, [
                createBaseVNode("i", { class: "fas fa-search me-2" }),
                createTextVNode("探索項目 ")
              ]),
              createBaseVNode("a", {
                href: "./auth.html",
                class: "btn btn-outline-light btn-lg"
              }, [
                createBaseVNode("i", { class: "fas fa-user-plus me-2" }),
                createTextVNode("立即註冊 ")
              ])
            ])
          ], -1))
        ]),
        _: 1
      });
    };
  }
});
const AboutPage = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-c0958e85"]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "not-found-page",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$l, null, {
        default: withCtx(() => [..._cache[0] || (_cache[0] = [
          createBaseVNode("section", { class: "py-5" }, [
            createBaseVNode("div", { class: "container" }, [
              createBaseVNode("div", { class: "row justify-content-center" }, [
                createBaseVNode("div", { class: "col-md-8 text-center" }, [
                  createBaseVNode("div", { class: "mb-4" }, [
                    createBaseVNode("i", { class: "fas fa-map-signs fa-5x text-muted mb-4" })
                  ]),
                  createBaseVNode("h1", { class: "display-1 fw-bold text-primary" }, "404"),
                  createBaseVNode("h2", { class: "mb-4" }, "迷路了嗎？"),
                  createBaseVNode("p", { class: "lead text-muted mb-5" }, " 您尋找的頁面可能已被移除、名稱已變更，或暫時無法使用。 "),
                  createBaseVNode("div", { class: "d-flex flex-wrap justify-content-center gap-3" }, [
                    createBaseVNode("a", {
                      href: "./index.html",
                      class: "btn btn-primary btn-lg"
                    }, [
                      createBaseVNode("i", { class: "fas fa-home me-2" }),
                      createTextVNode("回到首頁 ")
                    ]),
                    createBaseVNode("a", {
                      href: "./jobs.html",
                      class: "btn btn-outline-primary btn-lg"
                    }, [
                      createBaseVNode("i", { class: "fas fa-search me-2" }),
                      createTextVNode("探索項目 ")
                    ]),
                    createBaseVNode("a", {
                      href: "./contact.html",
                      class: "btn btn-outline-secondary btn-lg"
                    }, [
                      createBaseVNode("i", { class: "fas fa-envelope me-2" }),
                      createTextVNode("聯絡我們 ")
                    ])
                  ])
                ])
              ])
            ])
          ], -1)
        ])]),
        _: 1
      });
    };
  }
});
const NotFoundPage = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-369d9e3c"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "terms-page",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$l, null, {
        default: withCtx(() => [..._cache[0] || (_cache[0] = [
          createBaseVNode("section", { class: "py-5" }, [
            createBaseVNode("div", { class: "container" }, [
              createBaseVNode("div", { class: "row justify-content-center" }, [
                createBaseVNode("div", { class: "col-lg-8" }, [
                  createBaseVNode("h1", { class: "display-5 fw-bold mb-4" }, "服務條款與隱私權政策"),
                  createBaseVNode("p", { class: "text-muted mb-5" }, "最後更新日期：2024-12-07"),
                  createBaseVNode("nav", { class: "mb-5" }, [
                    createBaseVNode("ul", { class: "nav nav-pills" }, [
                      createBaseVNode("li", { class: "nav-item" }, [
                        createBaseVNode("a", {
                          class: "nav-link active",
                          href: "#terms"
                        }, "服務條款")
                      ]),
                      createBaseVNode("li", { class: "nav-item" }, [
                        createBaseVNode("a", {
                          class: "nav-link",
                          href: "#privacy"
                        }, "隱私權政策")
                      ])
                    ])
                  ]),
                  createBaseVNode("section", {
                    id: "terms",
                    class: "mb-5"
                  }, [
                    createBaseVNode("h2", { class: "h3 fw-bold mb-4" }, [
                      createBaseVNode("i", { class: "fas fa-file-contract me-2 text-primary" }),
                      createTextVNode("服務條款 ")
                    ]),
                    createBaseVNode("div", { class: "card mb-4" }, [
                      createBaseVNode("div", { class: "card-body" }, [
                        createBaseVNode("h5", { class: "card-title" }, "1. 服務說明"),
                        createBaseVNode("p", { class: "card-text text-muted" }, " Builder 101 是一個以工換宿媒合平台，連結志願者 (Builder) 與民宿主 (Host)。 本平台提供職缺資訊瀏覽、應徵申請等服務，實際換宿條件由志願者與民宿主雙方協議確認。 ")
                      ])
                    ]),
                    createBaseVNode("div", { class: "card mb-4" }, [
                      createBaseVNode("div", { class: "card-body" }, [
                        createBaseVNode("h5", { class: "card-title" }, "2. 使用者責任"),
                        createBaseVNode("ul", { class: "text-muted" }, [
                          createBaseVNode("li", null, "使用者須提供真實、準確的個人資料"),
                          createBaseVNode("li", null, "使用者不得發布虛假、誤導性內容"),
                          createBaseVNode("li", null, "使用者須尊重他人權益，不得騷擾或侵犯他人"),
                          createBaseVNode("li", null, "使用者須遵守當地法律法規")
                        ])
                      ])
                    ]),
                    createBaseVNode("div", { class: "card mb-4" }, [
                      createBaseVNode("div", { class: "card-body" }, [
                        createBaseVNode("h5", { class: "card-title" }, "3. 免責聲明"),
                        createBaseVNode("p", { class: "card-text text-muted" }, " 本平台僅提供媒合服務，不介入志願者與民宿主之間的實際契約關係。 使用者應自行評估風險，平台不對換宿期間發生的任何糾紛或損失負責。 ")
                      ])
                    ]),
                    createBaseVNode("div", { class: "card mb-4" }, [
                      createBaseVNode("div", { class: "card-body" }, [
                        createBaseVNode("h5", { class: "card-title" }, "4. 智慧財產權"),
                        createBaseVNode("p", { class: "card-text text-muted" }, " 本平台所有內容（包括但不限於文字、圖片、設計）均受著作權法保護。 未經授權，禁止複製、轉載或商業使用。 ")
                      ])
                    ])
                  ]),
                  createBaseVNode("section", {
                    id: "privacy",
                    class: "mb-5"
                  }, [
                    createBaseVNode("h2", { class: "h3 fw-bold mb-4" }, [
                      createBaseVNode("i", { class: "fas fa-shield-alt me-2 text-primary" }),
                      createTextVNode("隱私權政策 ")
                    ]),
                    createBaseVNode("div", { class: "card mb-4" }, [
                      createBaseVNode("div", { class: "card-body" }, [
                        createBaseVNode("h5", { class: "card-title" }, "1. 資料蒐集"),
                        createBaseVNode("p", { class: "card-text text-muted" }, "我們可能蒐集以下資料："),
                        createBaseVNode("ul", { class: "text-muted" }, [
                          createBaseVNode("li", null, "帳號資料（Email、密碼加密存儲）"),
                          createBaseVNode("li", null, "個人檔案（暱稱、自我介紹、技能標籤）"),
                          createBaseVNode("li", null, "使用紀錄（瀏覽、收藏、應徵）"),
                          createBaseVNode("li", null, "裝置資訊（IP 位址、瀏覽器類型）")
                        ])
                      ])
                    ]),
                    createBaseVNode("div", { class: "card mb-4" }, [
                      createBaseVNode("div", { class: "card-body" }, [
                        createBaseVNode("h5", { class: "card-title" }, "2. 資料使用"),
                        createBaseVNode("p", { class: "card-text text-muted" }, "我們使用您的資料用於："),
                        createBaseVNode("ul", { class: "text-muted" }, [
                          createBaseVNode("li", null, "提供及改善平台服務"),
                          createBaseVNode("li", null, "個人化推薦內容"),
                          createBaseVNode("li", null, "發送系統通知與服務更新"),
                          createBaseVNode("li", null, "統計分析與服務優化")
                        ])
                      ])
                    ]),
                    createBaseVNode("div", { class: "card mb-4" }, [
                      createBaseVNode("div", { class: "card-body" }, [
                        createBaseVNode("h5", { class: "card-title" }, "3. 資料保護"),
                        createBaseVNode("p", { class: "card-text text-muted" }, " 我們採用業界標準的安全措施保護您的個人資料，包括資料加密、存取控制等。 您的密碼將以加密形式儲存，我們無法查看您的原始密碼。 ")
                      ])
                    ]),
                    createBaseVNode("div", { class: "card mb-4" }, [
                      createBaseVNode("div", { class: "card-body" }, [
                        createBaseVNode("h5", { class: "card-title" }, "4. Cookie 使用"),
                        createBaseVNode("p", { class: "card-text text-muted" }, " 本平台使用 Cookie 及 localStorage 技術，用於維持登入狀態、記錄使用者偏好等功能。 您可透過瀏覽器設定管理 Cookie，但這可能影響部分功能的使用。 ")
                      ])
                    ]),
                    createBaseVNode("div", { class: "card mb-4" }, [
                      createBaseVNode("div", { class: "card-body" }, [
                        createBaseVNode("h5", { class: "card-title" }, "5. 聯絡我們"),
                        createBaseVNode("p", { class: "card-text text-muted" }, [
                          createTextVNode(" 如您對本隱私權政策有任何疑問，歡迎透過 "),
                          createBaseVNode("a", { href: "./contact.html" }, "聯絡我們"),
                          createTextVNode(" 頁面與我們聯繫。 ")
                        ])
                      ])
                    ])
                  ]),
                  createBaseVNode("div", { class: "alert alert-info" }, [
                    createBaseVNode("i", { class: "fas fa-info-circle me-2" }),
                    createTextVNode(" 本條款可能不定期更新，更新後將於本頁面公告。繼續使用本服務即表示您同意更新後的條款。 ")
                  ])
                ])
              ])
            ])
          ], -1)
        ])]),
        _: 1
      });
    };
  }
});
const _hoisted_1$4 = { class: "d-flex w-100 justify-content-between align-items-start" };
const _hoisted_2$4 = { class: "d-flex align-items-start" };
const _hoisted_3$4 = { class: "notification-icon me-3" };
const _hoisted_4$3 = { class: "mb-1 text-muted small" };
const _hoisted_5$2 = { class: "text-muted" };
const _hoisted_6$2 = {
  key: 0,
  class: "badge bg-primary rounded-pill"
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "notification-item",
  props: {
    notification: {}
  },
  setup(__props) {
    const props = __props;
    const iconClass = computed(() => {
      const iconMap = {
        application: "fas fa-paper-plane text-primary",
        system: "fas fa-bullhorn text-warning",
        message: "fas fa-comment text-success"
      };
      return iconMap[props.notification.type] || "fas fa-bell text-secondary";
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("a", {
        href: "#",
        class: normalizeClass(["list-group-item list-group-item-action", { "bg-light": !__props.notification.read }])
      }, [
        createBaseVNode("div", _hoisted_1$4, [
          createBaseVNode("div", _hoisted_2$4, [
            createBaseVNode("div", _hoisted_3$4, [
              createBaseVNode("i", {
                class: normalizeClass([iconClass.value, "fa-lg"])
              }, null, 2)
            ]),
            createBaseVNode("div", null, [
              createBaseVNode("h6", {
                class: normalizeClass(["mb-1", { "fw-bold": !__props.notification.read }])
              }, toDisplayString(__props.notification.title), 3),
              createBaseVNode("p", _hoisted_4$3, toDisplayString(__props.notification.message), 1),
              createBaseVNode("small", _hoisted_5$2, toDisplayString(__props.notification.time), 1)
            ])
          ]),
          !__props.notification.read ? (openBlock(), createElementBlock("span", _hoisted_6$2, "新")) : createCommentVNode("", true)
        ])
      ], 2);
    };
  }
});
const NotificationItemComponent = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-c9a5ef04"]]);
const _hoisted_1$3 = { class: "py-5" };
const _hoisted_2$3 = { class: "container" };
const _hoisted_3$3 = { class: "list-group" };
const _hoisted_4$2 = {
  key: 0,
  class: "text-center py-5"
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "notifications-page",
  setup(__props) {
    const notifications = [
      {
        type: "application",
        title: "應徵狀態更新",
        message: "您對「海角七號民宿」的應徵已被查看",
        time: "2 小時前",
        read: false
      },
      {
        type: "system",
        title: "系統公告",
        message: "平台將於 12/15 進行系統維護，屆時將暫停服務 2 小時",
        time: "1 天前",
        read: false
      },
      {
        type: "message",
        title: "新訊息",
        message: "海角七號民宿老闆回覆了您的問題",
        time: "2 天前",
        read: true
      },
      {
        type: "application",
        title: "恭喜！您已收到邀請",
        message: "墾丁衝浪小屋已邀請您進行面試",
        time: "3 天前",
        read: true
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$l, null, {
        default: withCtx(() => [
          createBaseVNode("section", _hoisted_1$3, [
            createBaseVNode("div", _hoisted_2$3, [
              _cache[1] || (_cache[1] = createBaseVNode("div", { class: "d-flex justify-content-between align-items-center mb-4" }, [
                createBaseVNode("h1", { class: "fw-bold" }, "通知中心"),
                createBaseVNode("button", {
                  class: "btn btn-outline-secondary btn-sm",
                  "data-action": "mark-all-read"
                }, [
                  createBaseVNode("i", { class: "fas fa-check-double me-1" }),
                  createTextVNode("全部標為已讀 ")
                ])
              ], -1)),
              _cache[2] || (_cache[2] = createBaseVNode("ul", { class: "nav nav-pills mb-4" }, [
                createBaseVNode("li", { class: "nav-item" }, [
                  createBaseVNode("button", {
                    class: "nav-link active",
                    "data-filter": "all"
                  }, "全部")
                ]),
                createBaseVNode("li", { class: "nav-item" }, [
                  createBaseVNode("button", {
                    class: "nav-link",
                    "data-filter": "unread"
                  }, "未讀")
                ]),
                createBaseVNode("li", { class: "nav-item" }, [
                  createBaseVNode("button", {
                    class: "nav-link",
                    "data-filter": "system"
                  }, "系統公告")
                ])
              ], -1)),
              createBaseVNode("div", _hoisted_3$3, [
                (openBlock(), createElementBlock(Fragment, null, renderList(notifications, (notification, index) => {
                  return createVNode(NotificationItemComponent, {
                    key: index,
                    notification
                  }, null, 8, ["notification"]);
                }), 64))
              ]),
              notifications.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_4$2, [..._cache[0] || (_cache[0] = [
                createBaseVNode("i", { class: "fas fa-bell-slash fa-4x text-muted mb-3" }, null, -1),
                createBaseVNode("h5", { class: "text-muted" }, "目前沒有通知", -1)
              ])])) : createCommentVNode("", true)
            ])
          ])
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "avatar-placeholder",
  props: {
    name: {},
    color: {},
    size: {}
  },
  setup(__props) {
    const props = __props;
    const initial = computed(() => props.name.charAt(0).toUpperCase());
    const sizeMap = {
      sm: "24px",
      md: "36px",
      lg: "48px"
    };
    const fontSizeMap = {
      sm: "10px",
      md: "14px",
      lg: "18px"
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "avatar-placeholder rounded-circle",
        style: normalizeStyle({ backgroundColor: __props.color, width: sizeMap[__props.size || "md"], height: sizeMap[__props.size || "md"], fontSize: fontSizeMap[__props.size || "md"] })
      }, toDisplayString(initial.value), 5);
    };
  }
});
const AvatarPlaceholder = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-b936a942"]]);
const _hoisted_1$2 = { class: "card h-100 shadow-sm story-card" };
const _hoisted_2$2 = { class: "position-relative" };
const _hoisted_3$2 = { class: "story-cover-overlay d-flex align-items-end p-3" };
const _hoisted_4$1 = { class: "badge bg-white text-dark" };
const _hoisted_5$1 = { class: "card-body" };
const _hoisted_6$1 = { class: "card-title" };
const _hoisted_7$1 = { class: "card-text text-muted small" };
const _hoisted_8$1 = { class: "d-flex align-items-center" };
const _hoisted_9$1 = { class: "ms-2" };
const _hoisted_10$1 = { class: "fw-semibold" };
const _hoisted_11$1 = { class: "text-muted" };
const _hoisted_12 = { class: "card-footer bg-white border-0" };
const _hoisted_13 = ["href"];
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "story-card",
  props: {
    story: {},
    index: {}
  },
  setup(__props) {
    const props = __props;
    const detailUrl = computed(() => `./story-detail.html?id=${props.index}`);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("div", _hoisted_2$2, [
          createBaseVNode("div", {
            class: "story-cover",
            style: normalizeStyle({ backgroundColor: __props.story.coverColor })
          }, [
            createBaseVNode("div", _hoisted_3$2, [
              createBaseVNode("span", _hoisted_4$1, toDisplayString(__props.story.location), 1)
            ])
          ], 4)
        ]),
        createBaseVNode("div", _hoisted_5$1, [
          createBaseVNode("h5", _hoisted_6$1, toDisplayString(__props.story.title), 1),
          createBaseVNode("p", _hoisted_7$1, toDisplayString(__props.story.excerpt), 1),
          createBaseVNode("div", _hoisted_8$1, [
            createVNode(AvatarPlaceholder, {
              name: __props.story.author,
              color: __props.story.avatarColor,
              size: "md"
            }, null, 8, ["name", "color"]),
            createBaseVNode("div", _hoisted_9$1, [
              createBaseVNode("small", _hoisted_10$1, toDisplayString(__props.story.author), 1),
              _cache[0] || (_cache[0] = createBaseVNode("br", null, null, -1)),
              createBaseVNode("small", _hoisted_11$1, toDisplayString(__props.story.date), 1)
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_12, [
          createBaseVNode("a", {
            href: detailUrl.value,
            class: "btn btn-outline-primary btn-sm w-100"
          }, " 閱讀全文 ", 8, _hoisted_13)
        ])
      ]);
    };
  }
});
const StoryCard = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-a6e09ba1"]]);
const _hoisted_1$1 = { class: "py-5" };
const _hoisted_2$1 = { class: "container" };
const _hoisted_3$1 = { class: "row g-4" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "stories-page",
  setup(__props) {
    const stories = [
      {
        title: "在蘭嶼遇見不一樣的自己",
        excerpt: "兩個月的換宿生活，讓我學會放慢腳步，傾聽大海的聲音...",
        author: "Alice Lin",
        date: "2024-11-15",
        location: "蘭嶼",
        coverColor: "#3498db",
        avatarColor: "#e74c3c"
      },
      {
        title: "清境農場的晨間生活",
        excerpt: "每天被羊群叫醒，在雲海中開始一天的工作，這是都市人難以想像的日常...",
        author: "Bob Chen",
        date: "2024-10-28",
        location: "清境",
        coverColor: "#27ae60",
        avatarColor: "#9b59b6"
      },
      {
        title: "墾丁衝浪的夏天",
        excerpt: "從完全不會衝浪到能駕馭小浪，這個夏天我在墾丁找到了新的熱情...",
        author: "Cathy Wang",
        date: "2024-09-10",
        location: "墾丁",
        coverColor: "#f39c12",
        avatarColor: "#1abc9c"
      },
      {
        title: "台東都蘭的藝術之旅",
        excerpt: "在這片土地上，我遇見了許多創作者，也開始嘗試自己的創作...",
        author: "David Lee",
        date: "2024-08-22",
        location: "都蘭",
        coverColor: "#9b59b6",
        avatarColor: "#e67e22"
      },
      {
        title: "花蓮瑞穗的溫泉民宿",
        excerpt: "每天工作結束後泡溫泉，是最療癒的放鬆方式...",
        author: "Emily Ho",
        date: "2024-07-15",
        location: "瑞穗",
        coverColor: "#e74c3c",
        avatarColor: "#3498db"
      },
      {
        title: "澎湖的海洋生活",
        excerpt: "浮潛、看海龜、吃海鮮，這裡的海洋資源讓人驚嘆...",
        author: "Frank Hsu",
        date: "2024-06-30",
        location: "澎湖",
        coverColor: "#1abc9c",
        avatarColor: "#f39c12"
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$l, null, {
        default: withCtx(() => [
          _cache[1] || (_cache[1] = createBaseVNode("section", { class: "bg-primary text-white py-5" }, [
            createBaseVNode("div", { class: "container text-center" }, [
              createBaseVNode("h1", { class: "display-5 fw-bold" }, "換宿故事"),
              createBaseVNode("p", { class: "lead" }, "聽聽 Builder 們的真實體驗分享")
            ])
          ], -1)),
          createBaseVNode("section", _hoisted_1$1, [
            createBaseVNode("div", _hoisted_2$1, [
              createBaseVNode("div", _hoisted_3$1, [
                (openBlock(), createElementBlock(Fragment, null, renderList(stories, (story, index) => {
                  return createBaseVNode("div", {
                    key: index,
                    class: "col-md-6 col-lg-4"
                  }, [
                    createVNode(StoryCard, {
                      story,
                      index
                    }, null, 8, ["story", "index"])
                  ]);
                }), 64))
              ]),
              _cache[0] || (_cache[0] = createBaseVNode("div", { class: "text-center mt-5" }, [
                createBaseVNode("button", {
                  class: "btn btn-outline-primary btn-lg",
                  "data-action": "load-more"
                }, [
                  createBaseVNode("i", { class: "fas fa-plus me-2" }),
                  createTextVNode("載入更多故事 ")
                ])
              ], -1))
            ])
          ]),
          _cache[2] || (_cache[2] = createBaseVNode("section", { class: "bg-light py-5" }, [
            createBaseVNode("div", { class: "container text-center" }, [
              createBaseVNode("h3", { class: "mb-3" }, "有故事想分享嗎？"),
              createBaseVNode("p", { class: "text-muted mb-4" }, "完成換宿後，歡迎回來分享您的體驗！"),
              createBaseVNode("a", {
                href: "./auth.html",
                class: "btn btn-primary btn-lg"
              }, [
                createBaseVNode("i", { class: "fas fa-pen me-2" }),
                createTextVNode("撰寫我的故事 ")
              ])
            ])
          ], -1))
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "story-detail-page",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$l, null, {
        default: withCtx(() => [..._cache[0] || (_cache[0] = [
          createBaseVNode("div", { class: "bg-light py-3" }, [
            createBaseVNode("div", { class: "container" }, [
              createBaseVNode("nav", { "aria-label": "breadcrumb" }, [
                createBaseVNode("ol", { class: "breadcrumb mb-0" }, [
                  createBaseVNode("li", { class: "breadcrumb-item" }, [
                    createBaseVNode("a", { href: "./index.html" }, "首頁")
                  ]),
                  createBaseVNode("li", { class: "breadcrumb-item" }, [
                    createBaseVNode("a", { href: "./stories.html" }, "換宿故事")
                  ]),
                  createBaseVNode("li", {
                    class: "breadcrumb-item active",
                    "aria-current": "page"
                  }, "在蘭嶼遇見不一樣的自己")
                ])
              ])
            ])
          ], -1),
          createBaseVNode("article", { class: "py-5" }, [
            createBaseVNode("div", { class: "container" }, [
              createBaseVNode("div", { class: "row justify-content-center" }, [
                createBaseVNode("div", { class: "col-lg-8" }, [
                  createBaseVNode("header", { class: "mb-5" }, [
                    createBaseVNode("span", { class: "badge bg-primary mb-3" }, "蘭嶼"),
                    createBaseVNode("h1", { class: "display-5 fw-bold mb-3" }, "在蘭嶼遇見不一樣的自己"),
                    createBaseVNode("p", { class: "lead text-muted" }, "兩個月的換宿生活，讓我學會放慢腳步，傾聽大海的聲音"),
                    createBaseVNode("div", { class: "d-flex align-items-center mt-4" }, [
                      createBaseVNode("img", {
                        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
                        alt: "Alice Lin 頭像",
                        class: "rounded-circle me-3",
                        style: { "width": "50px", "height": "50px", "object-fit": "cover" }
                      }),
                      createBaseVNode("div", null, [
                        createBaseVNode("strong", null, "Alice Lin"),
                        createBaseVNode("br"),
                        createBaseVNode("small", { class: "text-muted" }, "2024 年 11 月 15 日 · 5 分鐘閱讀")
                      ])
                    ])
                  ]),
                  createBaseVNode("div", {
                    class: "story-cover rounded mb-5",
                    style: { "background-color": "#3498db", "height": "400px" }
                  }),
                  createBaseVNode("div", { class: "story-content" }, [
                    createBaseVNode("h2", null, "為什麼選擇蘭嶼"),
                    createBaseVNode("p", null, " 在都市工作三年後，我開始感到疲憊。每天重複的通勤、會議、加班，讓我忘記了生活還有其他可能。 某天深夜滑手機時，偶然看到 Builder 101 上的一則換宿職缺——蘭嶼的海角民宿正在徵求小幫手。 "),
                    createBaseVNode("p", null, " 「每天工作 4-5 小時，協助房務整理與帶領浮潛體驗，提供住宿與三餐。」 看到這段文字，我毫不猶豫地按下了應徵按鈕。 "),
                    createBaseVNode("h2", null, "初抵蘭嶼"),
                    createBaseVNode("p", null, " 從台東搭船到蘭嶼需要兩個半小時。那天風浪很大，船身搖晃得厲害，但當我看見那片湛藍的海洋時， 一切暈船的不適都消失了。民宿老闆阿德叔騎著摩托車來接我，帶我穿過野銀部落的小路， 最後停在一間面海的白色小屋前。 "),
                    createBaseVNode("blockquote", { class: "blockquote border-start border-primary border-4 ps-4 my-4" }, [
                      createBaseVNode("p", { class: "mb-0" }, "「這裡沒有便利商店，也沒有外送，但有最美的星空。」"),
                      createBaseVNode("footer", { class: "blockquote-footer mt-2" }, "阿德叔的第一句話")
                    ]),
                    createBaseVNode("h2", null, "換宿生活日常"),
                    createBaseVNode("p", null, " 每天早上六點，我會被東邊的陽光喚醒。簡單吃過早餐後，開始整理房間、更換床單。 下午的時光屬於海洋——帶著客人去浮潛、看海龜、認識這片海底世界。 "),
                    createBaseVNode("p", null, " 晚上則是最珍貴的時刻。沒有光害的夜空，銀河清晰可見。我常常躺在民宿的露台上， 聽著海浪聲，看著滿天星斗，想著人生的各種可能。 "),
                    createBaseVNode("h2", null, "我學到的事"),
                    createBaseVNode("ul", null, [
                      createBaseVNode("li", null, "放慢腳步，不是偷懶，是給自己空間思考"),
                      createBaseVNode("li", null, "真正的富足，不在於擁有多少，而在於需要多少"),
                      createBaseVNode("li", null, "人與人之間的連結，比想像中更容易建立"),
                      createBaseVNode("li", null, "大自然是最好的療癒師")
                    ]),
                    createBaseVNode("h2", null, "給未來 Builder 的建議"),
                    createBaseVNode("p", null, " 如果你也在考慮換宿，我的建議是：不要想太多，直接出發。 不論結果如何，這段經歷都會成為人生中珍貴的回憶。 "),
                    createBaseVNode("p", null, " 帶上一顆開放的心，準備好迎接不同的生活方式。 你可能會遇到挑戰，但更多的是驚喜和成長。 ")
                  ]),
                  createBaseVNode("div", { class: "mt-5 mb-4" }, [
                    createBaseVNode("span", { class: "badge bg-secondary me-2" }, "換宿心得"),
                    createBaseVNode("span", { class: "badge bg-secondary me-2" }, "蘭嶼"),
                    createBaseVNode("span", { class: "badge bg-secondary me-2" }, "離島"),
                    createBaseVNode("span", { class: "badge bg-secondary" }, "海洋")
                  ]),
                  createBaseVNode("div", { class: "border-top pt-4" }, [
                    createBaseVNode("div", { class: "d-flex justify-content-between align-items-center" }, [
                      createBaseVNode("span", { class: "text-muted" }, "分享這篇故事："),
                      createBaseVNode("div", { class: "d-flex gap-2" }, [
                        createBaseVNode("button", {
                          class: "btn btn-outline-primary btn-sm",
                          "data-action": "share-fb"
                        }, [
                          createBaseVNode("i", { class: "fab fa-facebook" })
                        ]),
                        createBaseVNode("button", {
                          class: "btn btn-outline-success btn-sm",
                          "data-action": "share-line"
                        }, [
                          createBaseVNode("i", { class: "fab fa-line" })
                        ]),
                        createBaseVNode("button", {
                          class: "btn btn-outline-secondary btn-sm",
                          "data-action": "copy-link"
                        }, [
                          createBaseVNode("i", { class: "fas fa-link" })
                        ])
                      ])
                    ])
                  ]),
                  createBaseVNode("div", { class: "mt-5" }, [
                    createBaseVNode("h4", { class: "mb-4" }, "更多故事"),
                    createBaseVNode("div", { class: "list-group" }, [
                      createBaseVNode("a", {
                        href: "./story-detail.html?id=2",
                        class: "list-group-item list-group-item-action"
                      }, [
                        createBaseVNode("div", { class: "d-flex justify-content-between" }, [
                          createBaseVNode("span", null, "墾丁衝浪的夏天"),
                          createBaseVNode("span", { class: "badge bg-primary" }, "墾丁")
                        ])
                      ]),
                      createBaseVNode("a", {
                        href: "./story-detail.html?id=3",
                        class: "list-group-item list-group-item-action"
                      }, [
                        createBaseVNode("div", { class: "d-flex justify-content-between" }, [
                          createBaseVNode("span", null, "清境農場的晨間生活"),
                          createBaseVNode("span", { class: "badge bg-primary" }, "清境")
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ])
          ], -1)
        ])]),
        _: 1
      });
    };
  }
});
const StoryDetailPage = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-66e4e345"]]);
const _hoisted_1 = { class: "py-5" };
const _hoisted_2 = { class: "container" };
const _hoisted_3 = { class: "row" };
const _hoisted_4 = { class: "col-12" };
const _hoisted_5 = { class: "tab-content" };
const _hoisted_6 = {
  class: "tab-pane fade show active",
  id: "reviews"
};
const _hoisted_7 = { class: "list-group" };
const _hoisted_8 = { class: "d-flex justify-content-between align-items-start mb-2" };
const _hoisted_9 = { class: "text-muted small ms-2" };
const _hoisted_10 = { class: "mb-2" };
const _hoisted_11 = { class: "text-muted" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profile-page",
  setup(__props) {
    const reviews = [
      {
        hostName: "海角七號民宿",
        location: "蘭嶼",
        rating: 5,
        content: "Alice 非常認真負責，房務整理得很乾淨，也很會和客人互動。期待她再來！",
        date: "2024-11-20"
      },
      {
        hostName: "清境農場小屋",
        location: "清境",
        rating: 5,
        content: "工作態度積極，拍的照片超美，幫民宿的 IG 增加了很多粉絲！",
        date: "2024-09-15"
      },
      {
        hostName: "墾丁衝浪小屋",
        location: "墾丁",
        rating: 4,
        content: "學習能力強，很快就能上手各項工作。",
        date: "2024-07-28"
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$l, null, {
        default: withCtx(() => [
          createBaseVNode("section", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("div", _hoisted_3, [
                _cache[3] || (_cache[3] = createBaseVNode("div", { class: "col-12 mb-5" }, [
                  createBaseVNode("div", { class: "card shadow-sm" }, [
                    createBaseVNode("div", { class: "card-body p-4" }, [
                      createBaseVNode("div", { class: "row align-items-center" }, [
                        createBaseVNode("div", { class: "col-md-3 text-center mb-3 mb-md-0" }, [
                          createBaseVNode("img", {
                            src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
                            alt: "Alice Lin",
                            class: "rounded-circle",
                            style: { "width": "120px", "height": "120px", "object-fit": "cover" }
                          }),
                          createBaseVNode("div", { class: "mt-3" }, [
                            createBaseVNode("span", { class: "badge bg-success" }, [
                              createBaseVNode("i", { class: "fas fa-shield-alt me-1" }),
                              createTextVNode("已驗證 ")
                            ])
                          ])
                        ]),
                        createBaseVNode("div", { class: "col-md-9" }, [
                          createBaseVNode("h2", { class: "mb-2" }, "Alice Lin"),
                          createBaseVNode("p", { class: "text-muted mb-3" }, "@alice_lin · 加入於 2024 年 3 月"),
                          createBaseVNode("p", { class: "mb-3" }, [
                            createBaseVNode("i", { class: "fas fa-map-marker-alt text-primary me-2" }),
                            createTextVNode("台北市 "),
                            createBaseVNode("span", { class: "mx-3" }, "|"),
                            createBaseVNode("i", { class: "fas fa-briefcase text-primary me-2" }),
                            createTextVNode("設計師 ")
                          ]),
                          createBaseVNode("p", { class: "mb-0" }, " 熱愛旅行與攝影的設計師，喜歡透過換宿體驗不同的生活方式。 目標是走遍台灣的每個角落！ ")
                        ])
                      ])
                    ])
                  ])
                ], -1)),
                _cache[4] || (_cache[4] = createBaseVNode("div", { class: "col-12 mb-4" }, [
                  createBaseVNode("div", { class: "row g-3" }, [
                    createBaseVNode("div", { class: "col-md-3 col-6" }, [
                      createBaseVNode("div", { class: "card text-center h-100" }, [
                        createBaseVNode("div", { class: "card-body" }, [
                          createBaseVNode("div", { class: "display-6 text-primary fw-bold" }, "3"),
                          createBaseVNode("small", { class: "text-muted" }, "完成換宿")
                        ])
                      ])
                    ]),
                    createBaseVNode("div", { class: "col-md-3 col-6" }, [
                      createBaseVNode("div", { class: "card text-center h-100" }, [
                        createBaseVNode("div", { class: "card-body" }, [
                          createBaseVNode("div", { class: "display-6 text-primary fw-bold" }, "5"),
                          createBaseVNode("small", { class: "text-muted" }, "撰寫評價")
                        ])
                      ])
                    ]),
                    createBaseVNode("div", { class: "col-md-3 col-6" }, [
                      createBaseVNode("div", { class: "card text-center h-100" }, [
                        createBaseVNode("div", { class: "card-body" }, [
                          createBaseVNode("div", { class: "display-6 text-primary fw-bold" }, "2"),
                          createBaseVNode("small", { class: "text-muted" }, "發表故事")
                        ])
                      ])
                    ]),
                    createBaseVNode("div", { class: "col-md-3 col-6" }, [
                      createBaseVNode("div", { class: "card text-center h-100" }, [
                        createBaseVNode("div", { class: "card-body" }, [
                          createBaseVNode("div", { class: "display-6 text-primary fw-bold" }, "4.8"),
                          createBaseVNode("small", { class: "text-muted" }, "平均評分")
                        ])
                      ])
                    ])
                  ])
                ], -1)),
                createBaseVNode("div", _hoisted_4, [
                  _cache[2] || (_cache[2] = createBaseVNode("ul", {
                    class: "nav nav-tabs mb-4",
                    role: "tablist"
                  }, [
                    createBaseVNode("li", { class: "nav-item" }, [
                      createBaseVNode("button", {
                        class: "nav-link active",
                        "data-bs-toggle": "tab",
                        "data-bs-target": "#reviews"
                      }, [
                        createBaseVNode("i", { class: "fas fa-star me-2" }),
                        createTextVNode("評價 (5) ")
                      ])
                    ]),
                    createBaseVNode("li", { class: "nav-item" }, [
                      createBaseVNode("button", {
                        class: "nav-link",
                        "data-bs-toggle": "tab",
                        "data-bs-target": "#stories"
                      }, [
                        createBaseVNode("i", { class: "fas fa-book me-2" }),
                        createTextVNode("故事 (2) ")
                      ])
                    ]),
                    createBaseVNode("li", { class: "nav-item" }, [
                      createBaseVNode("button", {
                        class: "nav-link",
                        "data-bs-toggle": "tab",
                        "data-bs-target": "#skills"
                      }, [
                        createBaseVNode("i", { class: "fas fa-tools me-2" }),
                        createTextVNode("技能標籤 ")
                      ])
                    ])
                  ], -1)),
                  createBaseVNode("div", _hoisted_5, [
                    createBaseVNode("div", _hoisted_6, [
                      createBaseVNode("div", _hoisted_7, [
                        (openBlock(), createElementBlock(Fragment, null, renderList(reviews, (review, index) => {
                          return createBaseVNode("div", {
                            key: index,
                            class: "list-group-item"
                          }, [
                            createBaseVNode("div", _hoisted_8, [
                              createBaseVNode("div", null, [
                                createBaseVNode("strong", null, toDisplayString(review.hostName), 1),
                                createBaseVNode("span", _hoisted_9, toDisplayString(review.location), 1)
                              ]),
                              createBaseVNode("div", null, [
                                (openBlock(), createElementBlock(Fragment, null, renderList(5, (n) => {
                                  return createBaseVNode("i", {
                                    key: n,
                                    class: normalizeClass(["fas fa-star", n <= review.rating ? "text-warning" : "text-muted"])
                                  }, null, 2);
                                }), 64))
                              ])
                            ]),
                            createBaseVNode("p", _hoisted_10, toDisplayString(review.content), 1),
                            createBaseVNode("small", _hoisted_11, toDisplayString(review.date), 1)
                          ]);
                        }), 64))
                      ])
                    ]),
                    _cache[0] || (_cache[0] = createBaseVNode("div", {
                      class: "tab-pane fade",
                      id: "stories"
                    }, [
                      createBaseVNode("div", { class: "row g-3" }, [
                        createBaseVNode("div", { class: "col-md-6" }, [
                          createBaseVNode("div", { class: "card h-100" }, [
                            createBaseVNode("div", { class: "card-body" }, [
                              createBaseVNode("h6", { class: "card-title" }, "在蘭嶼遇見不一樣的自己"),
                              createBaseVNode("p", { class: "card-text text-muted small" }, " 兩個月的換宿生活，讓我學會放慢腳步... "),
                              createBaseVNode("a", {
                                href: "./story-detail.html",
                                class: "btn btn-outline-primary btn-sm"
                              }, " 閱讀全文 ")
                            ])
                          ])
                        ]),
                        createBaseVNode("div", { class: "col-md-6" }, [
                          createBaseVNode("div", { class: "card h-100" }, [
                            createBaseVNode("div", { class: "card-body" }, [
                              createBaseVNode("h6", { class: "card-title" }, "清境的星空與羊群"),
                              createBaseVNode("p", { class: "card-text text-muted small" }, " 每天被羊群叫醒，在雲海中開始一天... "),
                              createBaseVNode("a", {
                                href: "./story-detail.html",
                                class: "btn btn-outline-primary btn-sm"
                              }, " 閱讀全文 ")
                            ])
                          ])
                        ])
                      ])
                    ], -1)),
                    _cache[1] || (_cache[1] = createBaseVNode("div", {
                      class: "tab-pane fade",
                      id: "skills"
                    }, [
                      createBaseVNode("div", { class: "d-flex flex-wrap gap-2" }, [
                        createBaseVNode("span", { class: "badge bg-primary fs-6" }, "房務整理"),
                        createBaseVNode("span", { class: "badge bg-primary fs-6" }, "攝影"),
                        createBaseVNode("span", { class: "badge bg-primary fs-6" }, "社群經營"),
                        createBaseVNode("span", { class: "badge bg-primary fs-6" }, "基礎烹飪"),
                        createBaseVNode("span", { class: "badge bg-primary fs-6" }, "浮潛教學"),
                        createBaseVNode("span", { class: "badge bg-secondary fs-6" }, "日文 N3"),
                        createBaseVNode("span", { class: "badge bg-secondary fs-6" }, "英文流利")
                      ])
                    ], -1))
                  ])
                ])
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
});
const ProfilePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c257013d"]]);
const routes = [
  { path: "/", component: _sfc_main$j },
  { path: "/jobs", component: _sfc_main$i },
  { path: "/job-detail", component: _sfc_main$h },
  { path: "/auth", component: _sfc_main$f },
  { path: "/dashboard", component: _sfc_main$e },
  { path: "/contact", component: _sfc_main$d },
  { path: "/how-to", component: _sfc_main$c },
  { path: "/faq", component: _sfc_main$b },
  { path: "/about", component: AboutPage },
  { path: "/terms", component: _sfc_main$7 },
  { path: "/404", component: NotFoundPage },
  { path: "/notifications", component: _sfc_main$5 },
  { path: "/stories", component: _sfc_main$2 },
  { path: "/story-detail", component: StoryDetailPage },
  { path: "/profile", component: ProfilePage }
];
const STORAGE_KEYS = {
  USER: "builder101_user",
  FAVORITES: "builder101_favorites",
  DARK_MODE: "builder101_darkMode"
};
ViteSSG(
  { template: "<router-view />" },
  { routes },
  ({ router, isClient }) => {
    if (isClient) {
      initializeApp();
      router.afterEach(() => {
        setTimeout(() => {
          if (typeof $ === "undefined") return;
          initializeTooltips();
          initializeAuthState();
          initializeFavorites();
          initializeFormValidation();
          initializeNavbarScroll();
          initializeBackToTop();
          initializeApplicationFlow();
          initializeDarkMode();
          initializeSearchAutocomplete();
        }, 100);
      });
    }
  }
);
function initializeApp() {
  if (typeof $ === "undefined") return;
  if ($("#loadingOverlay").length === 0) {
    $("body").append(`
            <div id="loadingOverlay" class="loading-overlay d-none">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `);
  }
  if ($("#loadingStyles").length === 0) {
    $("head").append(`
            <style id="loadingStyles">
                .loading-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(255,255,255,0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                }
                .navbar-shrink {
                    padding-top: 0.5rem !important;
                    padding-bottom: 0.5rem !important;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                [data-theme="dark"] {
                    --bs-body-bg: #1a1a2e;
                    --bs-body-color: #eee;
                }
                [data-theme="dark"] .bg-light { background-color: #16213e !important; }
                [data-theme="dark"] .card { background-color: #0f3460; color: #eee; }
                [data-theme="dark"] .text-muted { color: #aaa !important; }
                [data-theme="dark"] footer { background-color: #0f0f23 !important; }
                .dark-mode-toggle { cursor: pointer; }
            </style>
        `);
  }
}
function initializeAuthState() {
  const user = getUser();
  if (user) {
    $('[data-auth="guest"]').addClass("d-none");
    $('[data-auth="member"]').removeClass("d-none");
    $("[data-user-name]").text(user.name || user.email.split("@")[0]);
  } else {
    $('[data-auth="guest"]').removeClass("d-none");
    $('[data-auth="member"]').addClass("d-none");
  }
  $(document).off("click", '[data-action="logout"]');
  $(document).on("click", '[data-action="logout"]', function(e) {
    e.preventDefault();
    logout();
    showToast("已成功登出", "info");
    window.location.href = "./index.html";
  });
}
function getUser() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}
function setUser(email, name) {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify({ email, name }));
  initializeAuthState();
}
function logout() {
  localStorage.removeItem(STORAGE_KEYS.USER);
  initializeAuthState();
}
function initializeFormValidation() {
  $(document).off("submit", "#loginForm");
  $(document).on("submit", "#loginForm", function(e) {
    e.preventDefault();
    const $form = $(this);
    const email = $form.find('input[type="email"]').val();
    const password = $form.find('input[type="password"]').val();
    if (!validateEmail(email)) {
      showToast("請輸入有效的 Email 格式", "danger");
      return;
    }
    if (password.length < 6) {
      showToast("密碼至少需要 6 個字元", "danger");
      return;
    }
    showLoading();
    setTimeout(() => {
      hideLoading();
      setUser(email, email.split("@")[0]);
      showToast("登入成功！歡迎回來", "success");
      setTimeout(() => {
        window.location.href = "./index.html";
      }, 1e3);
    }, 800);
  });
  $(document).off("submit", "#registerForm");
  $(document).on("submit", "#registerForm", function(e) {
    e.preventDefault();
    const $form = $(this);
    const email = $form.find('input[type="email"]').val();
    const password = $form.find('input[type="password"]').first().val();
    const confirmPassword = $form.find('input[type="password"]').last().val();
    if (!validateEmail(email)) {
      showToast("請輸入有效的 Email 格式", "danger");
      return;
    }
    if (!validatePassword(password)) {
      showToast("密碼需至少 8 個字元，包含大小寫字母與數字", "danger");
      return;
    }
    if (password !== confirmPassword) {
      showToast("兩次輸入的密碼不一致", "danger");
      return;
    }
    showLoading();
    setTimeout(() => {
      hideLoading();
      setUser(email, email.split("@")[0]);
      showToast("註冊成功！歡迎加入 Builder 101", "success");
      setTimeout(() => {
        window.location.href = "./index.html";
      }, 1e3);
    }, 800);
  });
  $(document).off("submit", "#contactForm");
  $(document).on("submit", "#contactForm", function(e) {
    e.preventDefault();
    showLoading();
    setTimeout(() => {
      hideLoading();
      showToast("訊息已送出！我們會盡快回覆您", "success");
      $(this).trigger("reset");
    }, 600);
  });
  $(document).off("click", '[data-action="forgot-password"]');
  $(document).on("click", '[data-action="forgot-password"]', function(e) {
    e.preventDefault();
    const email = prompt("請輸入您的註冊 Email：");
    if (email && validateEmail(email)) {
      showToast("密碼重設連結已寄送至您的信箱", "success");
    } else if (email) {
      showToast("請輸入有效的 Email", "danger");
    }
  });
}
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePassword(password) {
  return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
}
function initializeFavorites() {
  $(document).off("click", '[data-action="toggle-favorite"]');
  $(document).on("click", '[data-action="toggle-favorite"]', function() {
    const $btn = $(this);
    const $icon = $btn.find("i");
    const jobId = $btn.data("job-id") || "job-" + Date.now();
    const favorites = getFavorites();
    if ($icon.hasClass("far")) {
      $icon.removeClass("far").addClass("fas text-danger");
      favorites.push(jobId);
      saveFavorites(favorites);
      showToast("已加入收藏", "success");
    } else {
      $icon.removeClass("fas text-danger").addClass("far");
      const index = favorites.indexOf(jobId);
      if (index > -1) favorites.splice(index, 1);
      saveFavorites(favorites);
      showToast("已取消收藏", "info");
    }
  });
}
function getFavorites() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
function saveFavorites(favorites) {
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
}
function initializeApplicationFlow() {
  $(document).off("click", '[data-action="apply-job"]');
  $(document).on("click", '[data-action="apply-job"]', function() {
    const user = getUser();
    if (!user) {
      showToast("請先登入才能應徵", "warning");
      setTimeout(() => {
        window.location.href = "./auth.html";
      }, 1500);
      return;
    }
    const modalHtml = `
            <div class="modal fade" id="applyModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">應徵申請</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="applyForm">
                                <div class="mb-3">
                                    <label class="form-label">自我介紹</label>
                                    <textarea class="form-control" rows="4" placeholder="請簡單介紹自己..." required></textarea>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">可開始日期</label>
                                    <input type="date" class="form-control" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">預計停留天數</label>
                                    <select class="form-select" required>
                                        <option value="">請選擇</option>
                                        <option value="7">7 天</option>
                                        <option value="14">14 天</option>
                                        <option value="30">1 個月</option>
                                        <option value="60">2 個月</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" data-action="submit-apply">
                                <i class="fas fa-paper-plane me-2"></i>送出申請
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    $("#applyModal").remove();
    $("body").append(modalHtml);
    const modal = new window.bootstrap.Modal("#applyModal");
    modal.show();
  });
  $(document).off("click", '[data-action="submit-apply"]');
  $(document).on("click", '[data-action="submit-apply"]', function() {
    const $form = $("#applyForm");
    const intro = $form.find("textarea").val();
    const date = $form.find('input[type="date"]').val();
    const days = $form.find("select").val();
    if (!intro || !date || !days) {
      showToast("請填寫完整資料", "warning");
      return;
    }
    showLoading();
    setTimeout(() => {
      hideLoading()(window).bootstrap.Modal.getInstance("#applyModal").hide();
      showToast("應徵申請已送出！請耐心等候業主回覆", "success");
    }, 1e3);
  });
}
function initializeNavbarScroll() {
  const $navbar = $(".navbar");
  $(window).off("scroll.navbar");
  $(window).on("scroll.navbar", function() {
    if ($(this).scrollTop() > 50) {
      $navbar.addClass("navbar-shrink");
    } else {
      $navbar.removeClass("navbar-shrink");
    }
  });
}
function initializeBackToTop() {
  const $backToTop = $('[data-action="back-to-top"]');
  $backToTop.hide();
  $(window).off("scroll.backToTop");
  $(window).on("scroll.backToTop", function() {
    if ($(this).scrollTop() > 300) {
      $backToTop.fadeIn();
    } else {
      $backToTop.fadeOut();
    }
  });
  $(document).off("click", '[data-action="back-to-top"]');
  $(document).on("click", '[data-action="back-to-top"]', function() {
    $("html, body").animate({ scrollTop: 0 }, "smooth");
  });
}
function initializeDarkMode() {
  const isDark = localStorage.getItem(STORAGE_KEYS.DARK_MODE) === "true";
  if (isDark) {
    $("html").attr("data-theme", "dark");
  }
  $(document).off("click", '[data-action="toggle-dark-mode"]');
  $(document).on("click", '[data-action="toggle-dark-mode"]', function() {
    const currentMode = $("html").attr("data-theme");
    if (currentMode === "dark") {
      $("html").removeAttr("data-theme");
      localStorage.setItem(STORAGE_KEYS.DARK_MODE, "false");
      showToast("已切換至淺色模式", "info");
    } else {
      $("html").attr("data-theme", "dark");
      localStorage.setItem(STORAGE_KEYS.DARK_MODE, "true");
      showToast("已切換至深色模式", "info");
    }
  });
}
function initializeSearchAutocomplete() {
  const suggestions = [
    "台北民宿",
    "墾丁衝浪",
    "蘭嶼換宿",
    "清境農場",
    "花蓮",
    "台東都蘭",
    "澎湖",
    "小琉球",
    "咖啡廳",
    "農場工作",
    "潛水教學"
  ];
  $(document).off("input", '[data-search="autocomplete"]');
  $(document).on("input", '[data-search="autocomplete"]', function() {
    const $input = $(this);
    const value = $input.val().toLowerCase();
    const $dropdown = $input.siblings(".search-suggestions");
    if (value.length < 1) {
      $dropdown.addClass("d-none");
      return;
    }
    const matches = suggestions.filter((s) => s.toLowerCase().includes(value));
    if (matches.length > 0) {
      const html = matches.map((m) => `<a href="./jobs.html?q=${m}" class="list-group-item list-group-item-action">${m}</a>`).join("");
      $dropdown.html(html).removeClass("d-none");
    } else {
      $dropdown.addClass("d-none");
    }
  });
}
function showLoading() {
  $("#loadingOverlay").removeClass("d-none");
}
function hideLoading() {
  $("#loadingOverlay").addClass("d-none");
}
function initializeTooltips() {
  $('[data-bs-toggle="tooltip"]').tooltip();
}
function showToast(message, type = "info") {
  if (typeof $ === "undefined") return;
  let $container = $("#toastContainer");
  if ($container.length === 0) {
    $container = $('<div id="toastContainer" class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1100;"></div>');
    $("body").append($container);
  }
  const iconMap = {
    success: "fa-check-circle text-success",
    info: "fa-info-circle text-info",
    warning: "fa-exclamation-triangle text-warning",
    danger: "fa-times-circle text-danger"
  };
  const toastId = "toast-" + Date.now();
  const toastHtml = `
        <div id="${toastId}" class="toast show" role="alert">
            <div class="toast-header">
                <i class="fas ${iconMap[type]} me-2"></i>
                <strong class="me-auto">Builder 101</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">${message}</div>
        </div>
    `;
  $container.append(toastHtml);
  setTimeout(() => {
    $(`#${toastId}`).fadeOut(300, function() {
      $(this).remove();
    });
  }, 3e3);
}

---
title: Basic concepts of Text Rendering with Lightning Text Texture Renderer
---
The Lightning Text Texture Renderer is a class within the renderer that is responsible for rendering text textures. It provides a set of properties and methods to manage and manipulate text rendering settings and operations.

The renderer uses a canvas context to draw the text. The context can be either an OffscreenCanvasRenderingContext2D or a CanvasRenderingContext2D, which are used to draw 2D graphics on a canvas.

The renderer has a settings property that holds the configuration for the text rendering. This includes properties like font style, size, color, alignment, and other text-related settings.

The renderer also has a method called `calculateRenderInfo` that calculates and returns information needed for rendering the text. This includes the width and height of the text, the lines of text, and other metrics.

Another important method in the renderer is `draw`, which takes the render information and draws the text on the canvas. It also allows for lines to be overridden for partial rendering.

The renderer also provides methods for setting font properties, loading fonts, wrapping text, and measuring text. These methods are used internally to manage the text rendering process.

<SwmSnippet path="/src/core/text-rendering/renderers/LightningTextTextureRenderer.ts" line="163">

---

# LightningTextTextureRenderer Class

The `LightningTextTextureRenderer` class is defined here. It has a constructor that takes a canvas and a context, and initializes the settings for the renderer.

```typescript
export class LightningTextTextureRenderer {
  private _canvas: OffscreenCanvas | HTMLCanvasElement;
  private _context:
    | OffscreenCanvasRenderingContext2D
    | CanvasRenderingContext2D;
  private _settings: Settings;
  private renderInfo: RenderInfo | undefined;

  constructor(
    canvas: OffscreenCanvas | HTMLCanvasElement,
    context: OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D,
  ) {
    this._canvas = canvas;
    this._context = context;
    this._settings = this.mergeDefaults({});
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/text-rendering/renderers/LightningTextTextureRenderer.ts" line="180">

---

# Settings Property

The `settings` property is a getter and setter that allows you to get and set the settings for the renderer.

```typescript
  set settings(v: Partial<Settings>) {
    this._settings = this.mergeDefaults(v);
  }

  get settings(): Settings {
    return this._settings;
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/text-rendering/renderers/LightningTextTextureRenderer.ts" line="238">

---

# calculateRenderInfo Method

The `calculateRenderInfo` method calculates and returns information needed for rendering the text. This includes the width and height of the text, the lines of text, and other metrics.

```typescript
  calculateRenderInfo(): RenderInfo {
    const renderInfo: Partial<RenderInfo> = {};

    const precision = this.getPrecision();

    const paddingLeft = this._settings.paddingLeft * precision;
    const paddingRight = this._settings.paddingRight * precision;
    const fontSize = this._settings.fontSize * precision;
    let offsetY =
      this._settings.offsetY === null
        ? null
        : this._settings.offsetY * precision;
    const w = this._settings.w * precision;
    const h = this._settings.h * precision;
    let wordWrapWidth = this._settings.wordWrapWidth * precision;
    const cutSx = this._settings.cutSx * precision;
    const cutEx = this._settings.cutEx * precision;
    const cutSy = this._settings.cutSy * precision;
    const cutEy = this._settings.cutEy * precision;
    const letterSpacing = (this._settings.letterSpacing || 0) * precision;
    const textIndent = this._settings.textIndent * precision;
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/text-rendering/renderers/LightningTextTextureRenderer.ts" line="461">

---

# draw Method

The `draw` method takes the render information and draws the text on the canvas. It also allows for lines to be overridden for partial rendering.

```typescript
  draw(
    renderInfo: RenderInfo,
    linesOverride?: { lines: string[]; lineWidths: number[] },
  ) {
    const precision = this.getPrecision();

    // Allow lines to be overriden for partial rendering.
    const lines = linesOverride?.lines || renderInfo.lines;
    const lineWidths = linesOverride?.lineWidths || renderInfo.lineWidths;
    const height = linesOverride
      ? calcHeight(
          this._settings.textBaseline,
          renderInfo.fontSize,
          renderInfo.lineHeight,
          linesOverride.lines.length,
          this._settings.offsetY === null
            ? null
            : this._settings.offsetY * precision,
        )
      : renderInfo.height;

```

---

</SwmSnippet>

# Lightning Text Texture Renderer Functions

This section will cover the main functions of the Lightning Text Texture Renderer.

<SwmSnippet path="/src/core/text-rendering/renderers/LightningTextTextureRenderer.ts" line="238">

---

## calculateRenderInfo

The `calculateRenderInfo` method calculates and returns information needed for rendering the text. This includes the width and height of the text, the lines of text, and other metrics.

```typescript
  calculateRenderInfo(): RenderInfo {
    const renderInfo: Partial<RenderInfo> = {};

    const precision = this.getPrecision();

    const paddingLeft = this._settings.paddingLeft * precision;
    const paddingRight = this._settings.paddingRight * precision;
    const fontSize = this._settings.fontSize * precision;
    let offsetY =
      this._settings.offsetY === null
        ? null
        : this._settings.offsetY * precision;
    const w = this._settings.w * precision;
    const h = this._settings.h * precision;
    let wordWrapWidth = this._settings.wordWrapWidth * precision;
    const cutSx = this._settings.cutSx * precision;
    const cutEx = this._settings.cutEx * precision;
    const cutSy = this._settings.cutSy * precision;
    const cutEy = this._settings.cutEy * precision;
    const letterSpacing = (this._settings.letterSpacing || 0) * precision;
    const textIndent = this._settings.textIndent * precision;
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/text-rendering/renderers/LightningTextTextureRenderer.ts" line="461">

---

## draw

`draw` is a method that takes the render information and draws the text on the canvas. It also allows for lines to be overridden for partial rendering.

```typescript
  draw(
    renderInfo: RenderInfo,
    linesOverride?: { lines: string[]; lineWidths: number[] },
  ) {
    const precision = this.getPrecision();

    // Allow lines to be overriden for partial rendering.
    const lines = linesOverride?.lines || renderInfo.lines;
    const lineWidths = linesOverride?.lineWidths || renderInfo.lineWidths;
    const height = linesOverride
      ? calcHeight(
          this._settings.textBaseline,
          renderInfo.fontSize,
          renderInfo.lineHeight,
          linesOverride.lines.length,
          this._settings.offsetY === null
            ? null
            : this._settings.offsetY * precision,
        )
      : renderInfo.height;

```

---

</SwmSnippet>

&nbsp;

*This is an auto-generated document by Swimm AI 🌊 and has not yet been verified by a human*

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="overview"><sup>Powered by [Swimm](/)</sup></SwmMeta>

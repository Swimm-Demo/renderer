---
title: Usage of GLenum Constants in the WebGL Context Wrapper
---
This document will cover the usage of GLenum constants in the Lightning 3 Renderer. We'll cover:

1. The role of the `Settings` interface
2. The role of the `RenderInfo` interface
3. The `LightningTextTextureRenderer` class and its methods
4. The usage of GLenum constants in the `calculateRenderInfo` and `draw` methods.

<SwmSnippet path="/src/core/text-rendering/renderers/LightningTextTextureRenderer.ts" line="63">

---

# The `Settings` Interface

The `Settings` interface defines the configuration for the text texture. It includes properties like `w`, `h`, `text`, `fontStyle`, `fontSize`, `fontBaselineRatio`, `fontFamily`, `trFontFace`, `wordWrap`, `wordWrapWidth`, `wordBreak`, `textOverflow`, `lineHeight`, `textBaseline`, `textAlign`, `verticalAlign`, `offsetY`, `maxLines`, `maxHeight`, `overflowSuffix`, `precision`, `textColor`, `paddingLeft`, `paddingRight`, `shadow`, `shadowColor`, `shadowOffsetX`, `shadowOffsetY`, `shadowBlur`, `highlight`, `highlightHeight`, `highlightColor`, `highlightOffset`, `highlightPaddingLeft`, `highlightPaddingRight`, `letterSpacing`, `textIndent`, `cutSx`, `cutSy`, `cutEx`, `cutEy`, `advancedRenderer`, and `textRenderIssueMargin`.

```typescript
export interface Settings {
  w: number;
  h: number;
  text: string;
  fontStyle: string;
  fontSize: number;
  fontBaselineRatio: number;
  fontFamily: string | null;
  trFontFace: WebTrFontFace | null;
  wordWrap: boolean;
  wordWrapWidth: number;
  wordBreak: boolean;
  textOverflow: TextOverflow | null;
  lineHeight: number | null;
  textBaseline: TextBaseline;
  textAlign: TextAlign;
  verticalAlign: TextVerticalAlign;
  offsetY: number | null;
  maxLines: number;
  maxHeight: number | null;
  overflowSuffix: string;
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/text-rendering/renderers/LightningTextTextureRenderer.ts" line="111">

---

# The `RenderInfo` Interface

The `RenderInfo` interface defines the rendering information for the text texture. It includes properties like `w`, `h`, `lines`, `precision`, `remainingText`, `moreTextLines`, `width`, `innerWidth`, `height`, `fontSize`, `cutSx`, `cutSy`, `cutEx`, `cutEy`, `lineHeight`, `defLineHeight`, `lineWidths`, `offsetY`, `paddingLeft`, `paddingRight`, `letterSpacing`, `textIndent`, and `metrics`.

```typescript
export interface RenderInfo {
  w: number;
  h: number;
  lines: string[];
  precision: number;
  remainingText: string;
  moreTextLines: boolean;
  width: number;
  innerWidth: number;
  height: number;
  fontSize: number;
  cutSx: number;
  cutSy: number;
  cutEx: number;
  cutEy: number;
  lineHeight: number;
  defLineHeight: number;
  lineWidths: number[];
  offsetY: number;
  paddingLeft: number;
  paddingRight: number;
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/text-rendering/renderers/LightningTextTextureRenderer.ts" line="163">

---

# The `LightningTextTextureRenderer` Class

The `LightningTextTextureRenderer` class is responsible for rendering the text texture. It uses the `Settings` and `RenderInfo` interfaces to configure and manage the rendering process.

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

  set settings(v: Partial<Settings>) {
    this._settings = this.mergeDefaults(v);
  }

```

---

</SwmSnippet>

<SwmSnippet path="/src/core/text-rendering/renderers/LightningTextTextureRenderer.ts" line="238">

---

# Usage of GLenum Constants in `calculateRenderInfo` Method

The `calculateRenderInfo` method is used to calculate the rendering information for the text texture. It uses GLenum constants like `precision`, `cutSx`, `cutEx`, `cutSy`, `cutEy`, `letterSpacing`, `textIndent`, and `calcMaxLines` to perform the calculations.

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

# Usage of GLenum Constants in `draw` Method

The `draw` method is used to draw the text texture. It uses GLenum constants like `precision` and `metrics` to perform the drawing.

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

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="follow-up"><sup>Powered by [Swimm](/)</sup></SwmMeta>

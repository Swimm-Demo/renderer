---
title: Exploring the Core Rendering Library
---
The 'Lib' in Core Rendering refers to a collection of utility files and classes that provide fundamental functionalities for the rendering process in the Lightning 3 Renderer. It includes files like 'RenderCoords.ts', 'utils.ts', 'WebGlContextWrapper.ts', and 'Matrix3d.ts'.

The 'RenderCoords.ts' file defines a class 'RenderCoords' that handles the coordinates used in rendering. It provides methods for translating coordinates and accessing specific coordinates.

The 'utils.ts' file provides utility functions and types that are used across the rendering process. It includes functions for handling RGBA color values, Rect and Bound interfaces for defining shapes, and functions for manipulating these shapes.

The 'WebGlContextWrapper.ts' file defines a class 'WebGlContextWrapper' that wraps around the WebGL context. It provides an optimized subset of the WebGLRenderingContext & WebGL2RenderingContext API that is used by the renderer.

The 'Matrix3d.ts' file defines a class 'Matrix3d' that represents a 3D matrix for 2D graphics transformation. It provides methods for matrix operations like translation, scaling, and rotation.

The 'textureCompression.ts' file provides functions for handling compressed textures. It includes functions for loading compressed textures and determining if a given image URL is a compressed texture.

<SwmSnippet path="/src/core/lib/utils.ts" line="20">

---

# Utils

The 'utils.ts' file provides utility functions and types that are used across the rendering process. It includes functions for handling RGBA color values, Rect and Bound interfaces for defining shapes, and functions for manipulating these shapes.

```typescript
export const PROTOCOL_REGEX = /^(data|ftps?|https?):/;

export type RGBA = [r: number, g: number, b: number, a: number];
export const getNormalizedRgbaComponents = (rgba: number): RGBA => {
  const r = rgba >>> 24;
  const g = (rgba >>> 16) & 0xff;
  const b = (rgba >>> 8) & 0xff;
  const a = rgba & 0xff;
  return [r / 255, g / 255, b / 255, a / 255];
};

export const getRgbaComponents = (rgba: number): RGBA => {
  const r = rgba >>> 24;
  const g = (rgba >>> 16) & 0xff;
  const b = (rgba >>> 8) & 0xff;
  const a = rgba & 0xff;
  return [r, g, b, a];
};

export const norm = (rgba: number): number => {
  const r = rgba >>> 24;
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/lib/WebGlContextWrapper.ts" line="27">

---

# WebGlContextWrapper

The 'WebGlContextWrapper.ts' file defines a class 'WebGlContextWrapper' that wraps around the WebGL context. It provides an optimized subset of the WebGLRenderingContext & WebGL2RenderingContext API that is used by the renderer.

```typescript
export class WebGlContextWrapper {
  //#region Cached WebGL State
  private activeTextureUnit = 0;
  private texture2dUnits: Array<WebGLTexture | null>;
  private texture2dParams: WeakMap<
    WebGLTexture,
    Record<number, number | undefined>
  > = new WeakMap();
  private scissorEnabled;
  private scissorX: number;
  private scissorY: number;
  private scissorWidth: number;
  private scissorHeight: number;
  private blendEnabled;
  private blendSrcRgb: number;
  private blendDstRgb: number;
  private blendSrcAlpha: number;
  private blendDstAlpha: number;
  private boundArrayBuffer: WebGLBuffer | null;
  private boundElementArrayBuffer: WebGLBuffer | null;
  private curProgram: WebGLProgram | null;
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/renderers/webgl/WebGlCoreRenderer.ts" line="66">

---

# Use of WebGlContextWrapper

The 'WebGlContextWrapper' is used in various parts of the renderer. For example, in 'WebGlCoreRenderer.ts', it is used to create a new instance of 'WebGlContextWrapper' and store it in the 'glw' property of the 'WebGlCoreRenderer' class.

```typescript
  //// WebGL Native Context and Data
  glw: WebGlContextWrapper;
  system: CoreWebGlSystem;

  //// Persistent data
  quadBuffer: ArrayBuffer = new ArrayBuffer(1024 * 1024 * 4);
  fQuadBuffer: Float32Array = new Float32Array(this.quadBuffer);
  uiQuadBuffer: Uint32Array = new Uint32Array(this.quadBuffer);
  renderOps: WebGlCoreRenderOp[] = [];

  //// Render Op / Buffer Filling State
  curBufferIdx = 0;
  curRenderOp: WebGlCoreRenderOp | null = null;
  override rttNodes: CoreNode[] = [];
  activeRttNode: CoreNode | null = null;

  //// Default Shader
  defaultShader: WebGlCoreShader;
  quadBufferCollection: BufferCollection;

  /**
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/renderers/webgl/WebGlCoreShader.ts" line="349">

---

# Use of useProgram

The 'useProgram' method of 'WebGlContextWrapper' is used in 'WebGlCoreShader.ts' within the 'attach' method to set the current WebGL program to the program of the shader.

```typescript
  override attach(): void {
    this.glw.useProgram(this.program);
    this.glw.useProgram(this.program);
    if (this.glw.isWebGl2() && this.vao) {
```

---

</SwmSnippet>

&nbsp;

*This is an auto-generated document by Swimm AI 🌊 and has not yet been verified by a human*

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="overview"><sup>Powered by [Swimm](/)</sup></SwmMeta>

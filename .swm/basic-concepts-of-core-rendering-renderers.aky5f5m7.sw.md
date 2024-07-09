---
title: Basic Concepts of Core Rendering Renderers
---
Renderers in Core Rendering are classes that handle the process of drawing a 2D scene onto a surface. They are responsible for managing textures, shaders, and other graphical resources.

The CoreRenderer class is an abstract base class for all renderers. It defines the common interface and properties that all renderers must implement and maintain, such as the rendering mode, stage, and various managers for textures and shaders.

Derived classes like CanvasCoreRenderer and WebGlCoreRenderer extend the CoreRenderer class and provide the specific implementation details for rendering on a canvas or using WebGL, respectively.

The CoreRendererOptions interface defines the options that can be passed to a CoreRenderer upon creation. These options include the stage, canvas, pixel ratio, and managers for textures and shaders.

The CoreRenderer class and its derived classes are used throughout the codebase wherever rendering operations are performed. They are typically instantiated with the necessary options and then used to perform rendering tasks.

<SwmSnippet path="/src/core/renderers/CoreRenderer.ts" line="73">

---

# CoreRenderer Class

The CoreRenderer class is an abstract base class for all renderers. It defines the common interface and properties that all renderers must implement and maintain, such as the rendering mode, stage, and various managers for textures and shaders.

```typescript
export abstract class CoreRenderer {
  public options: CoreRendererOptions;
  public mode: 'webgl' | 'canvas' | undefined;

  protected stage: Stage;

  //// Core Managers
  txManager: CoreTextureManager;
  txMemManager: TextureMemoryManager;
  shManager: CoreShaderManager;
  rttNodes: CoreNode[] = [];

  constructor(options: CoreRendererOptions) {
    this.options = options;
    this.stage = options.stage;
    this.txManager = options.txManager;
    this.txMemManager = options.txMemManager;
    this.shManager = options.shManager;
  }

  abstract reset(): void;
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/renderers/CoreRenderer.ts" line="61">

---

# CoreRendererOptions Interface

The CoreRendererOptions interface defines the options that can be passed to a CoreRenderer upon creation. These options include the stage, canvas, pixel ratio, and managers for textures and shaders.

```typescript
export interface CoreRendererOptions {
  stage: Stage;
  canvas: HTMLCanvasElement | OffscreenCanvas;
  pixelRatio: number;
  txManager: CoreTextureManager;
  txMemManager: TextureMemoryManager;
  shManager: CoreShaderManager;
  clearColor: number;
  bufferMemory: number;
  contextSpy: ContextSpy | null;
}
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/renderers/canvas/CanvasCoreRenderer.ts" line="43">

---

# CanvasCoreRenderer Class

The CanvasCoreRenderer class extends the CoreRenderer class and provides the specific implementation details for rendering on a canvas.

```typescript
  private clearColor: RGBA | undefined;
  public renderToTextureActive = false;
  activeRttNode: CoreNode | null = null;
  constructor(options: CoreRendererOptions) {
    super(options);

    this.mode = 'canvas';
    this.shManager.renderer = this;

    const { canvas, pixelRatio, clearColor } = options;
    this.canvas = canvas as HTMLCanvasElement;
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.pixelRatio = pixelRatio;
    this.clearColor = clearColor ? getRgbaComponents(clearColor) : undefined;
  }

  reset(): void {
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/renderers/webgl/WebGlCoreRenderer.ts" line="65">

---

# WebGlCoreRenderer Class

The WebGlCoreRenderer class extends the CoreRenderer class and provides the specific implementation details for rendering using WebGL.

```typescript
export class WebGlCoreRenderer extends CoreRenderer {
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

```

---

</SwmSnippet>

&nbsp;

*This is an auto-generated document by Swimm AI 🌊 and has not yet been verified by a human*

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="overview"><sup>Powered by [Swimm](/)</sup></SwmMeta>

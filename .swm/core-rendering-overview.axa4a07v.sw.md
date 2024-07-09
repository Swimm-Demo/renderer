---
title: Core Rendering Overview
---
Core Rendering in the Lightning 3 Renderer refers to the process of drawing 2D scenes on web browsers running on embedded devices. This is achieved through the use of WebGL, a JavaScript API for rendering interactive 2D and 3D graphics.

The `CoreRenderer` class is an abstract class that provides the base for the rendering process. It includes properties such as `options`, `mode`, `stage`, and managers for textures and shaders. It also includes abstract methods that need to be implemented by the specific renderer classes, such as `reset`, `render`, `addQuad`, and `createCtxTexture`.

The `CoreRenderer` class is extended by specific renderer classes like `WebGlCoreRenderer` and `CanvasCoreRenderer`. These classes provide the actual implementation of the rendering process for WebGL and Canvas respectively.

The `CoreRendererOptions` interface defines the options that can be passed to the `CoreRenderer` class. These options include the stage, canvas, pixel ratio, texture manager, shader manager, clear color, buffer memory, and context spy.

The `CoreRenderOp` class is an abstract class that provides a base for the rendering operations. It includes an abstract `draw` method that needs to be implemented by the specific render operation classes.

The `renderToTexture` method in the `CoreRenderer` class is used to render a node to a texture. This is useful for creating complex effects or for optimizing performance by reducing the number of draw calls.

The `render` method in the `CoreRenderer` class is an abstract method that needs to be implemented by the specific renderer classes. This method is responsible for rendering the scene to a specified surface.

The `CanvasCoreRenderer` class extends the `CoreRenderer` class and provides the implementation of the rendering process for Canvas. It includes methods like `reset`, `render`, and `addQuad`.

<SwmSnippet path="/src/core/renderers/CoreRenderer.ts" line="73">

---

# CoreRenderer Class

The `CoreRenderer` class is an abstract class that provides the base for the rendering process. It includes properties such as `options`, `mode`, `stage`, and managers for textures and shaders. It also includes abstract methods that need to be implemented by the specific renderer classes, such as `reset`, `render`, `addQuad`, and `createCtxTexture`.

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

The `CoreRendererOptions` interface defines the options that can be passed to the `CoreRenderer` class. These options include the stage, canvas, pixel ratio, texture manager, shader manager, clear color, buffer memory, and context spy.

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

<SwmSnippet path="/src/core/renderers/CoreRenderOp.ts" line="20">

---

# CoreRenderOp Class

The `CoreRenderOp` class is an abstract class that provides a base for the rendering operations. It includes an abstract `draw` method that needs to be implemented by the specific render operation classes.

```typescript
export abstract class CoreRenderOp {
  abstract draw(): void;
}
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/renderers/CoreRenderer.ts" line="102">

---

# renderToTexture Method

The `renderToTexture` method in the `CoreRenderer` class is used to render a node to a texture. This is useful for creating complex effects or for optimizing performance by reducing the number of draw calls.

```typescript
  abstract renderToTexture(node: CoreNode): void;
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/renderers/canvas/CanvasCoreRenderer.ts" line="39">

---

# CanvasCoreRenderer Class

The `CanvasCoreRenderer` class extends the `CoreRenderer` class and provides the implementation of the rendering process for Canvas. It includes methods like `reset`, `render`, and `addQuad`.

```typescript
export class CanvasCoreRenderer extends CoreRenderer {
  private context: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private pixelRatio: number;
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

&nbsp;

*This is an auto-generated document by Swimm AI 🌊 and has not yet been verified by a human*

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="overview"><sup>Powered by [Swimm](/)</sup></SwmMeta>

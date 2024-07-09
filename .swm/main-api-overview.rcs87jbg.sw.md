---
title: Main API Overview
---
<SwmSnippet path="/src/main-api/RendererMain.ts" line="282">

---

The Renderer Main API is the primary class used to configure and operate the Renderer. It is used to create and destroy Nodes, as well as Texture and Shader references.

````typescript
 * The Renderer Main API
 *
 * @remarks
 * This is the primary class used to configure and operate the Renderer.
 *
 * It is used to create and destroy Nodes, as well as Texture and Shader
 * references.
 *
 * Example:
 * ```ts
 * import { RendererMain, MainCoreDriver } from '@lightningjs/renderer';
 *
 * // Initialize the Renderer
 * const renderer = new RendererMain(
 *   {
 *     appWidth: 1920,
 *     appHeight: 1080
 *   },
 *   'app',
 *   new MainCoreDriver(),
 * );
````

---

</SwmSnippet>

<SwmSnippet path="/src/main-api/RendererMain.ts" line="46">

---

The Main API includes the concept of a Texture, which is an immutable reference to a specific Texture type. This structure is created by the RendererMain's `createTexture` method and is used to point to an actual `Texture` instance in the Core API Space.

```typescript
/**
 * An immutable reference to a specific Texture type
 *
 * @remarks
 * See {@link TextureRef} for more details.
 */
export interface SpecificTextureRef<TxType extends keyof TextureMap> {
  readonly descType: 'texture';
  readonly txType: TxType;
  readonly props: ExtractProps<TextureMap[TxType]>;
  readonly options?: Readonly<TextureOptions>;
}
```

---

</SwmSnippet>

<SwmSnippet path="/src/main-api/RendererMain.ts" line="81">

---

Similarly, the Main API also includes the concept of a Shader, which is an immutable reference to a specific Shader type. This structure is created by the RendererMain's `createShader` method and is used to point to an actual `Shader` instance in the Core API Space.

```typescript
 * An immutable reference to a specific Shader type
 *
 * @remarks
 * See {@link ShaderRef} for more details.
 */
export interface SpecificShaderRef<ShType extends keyof ShaderMap> {
  readonly descType: 'shader';
  readonly shType: ShType;
  readonly props: ExtractProps<ShaderMap[ShType]>;
}
```

---

</SwmSnippet>

<SwmSnippet path="/src/main-api/Inspector.ts" line="14">

---

The Main API also includes an Inspector tool that allows you to inspect the state of the renderer and the nodes that are being rendered. It is used for debugging and development purposes.

```typescript
/**
 * Inspector
 *
 * The inspector is a tool that allows you to inspect the state of the renderer
 * and the nodes that are being rendered. It is a tool that is used for debugging
 * and development purposes.
 *
 * The inspector will generate a DOM tree that mirrors the state of the renderer
 */
```

---

</SwmSnippet>

<SwmSnippet path="/src/main-api/INode.ts" line="463">

---

A Node is a basic building block of the Renderer scene graph in the Main API. It can be a container for other Nodes, or it can be a leaf Node that renders a solid color, gradient, image, or specific texture, using a specific shader.

```typescript
 * Main API interface representing a Node in the Renderer scene graph.
 *
 * @remarks
 * A Node is a basic building block of the Renderer scene graph. It can be a
 * container for other Nodes, or it can be a leaf Node that renders a solid
 * color, gradient, image, or specific texture, using a specific shader.
 *
 * For text rendering, see {@link ITextNode}.
 *
 * Nodes are represented by an interface since they may be implemented in
 * different ways depending on the Core Driver. For example, the MainCoreDriver
 * implements it with it's `MainOnlyNode` while the ThreadXCoreDriver implements
 * it with it's `ThreadXMainNode`.
 */
```

---

</SwmSnippet>

<SwmSnippet path="/src/main-api/ICoreDriver.ts" line="33">

---

The Main API is implemented by Core Drivers. Both the `MainCoreDriver` and the `ThreadXCoreDriver` exist that implement this interface to support both the single-threaded and multi-threaded Core modes.

```typescript
 * This interface is to be implemented by Core Drivers
 *
 * @remarks
 * Both the {@link MainCoreDriver} and the {@link ThreadXCoreDriver} exist
 * that implement this interface to support both the single-threaded and
 * multi-threaded Core modes.
 */
```

---

</SwmSnippet>

<SwmSnippet path="/src/main-api/RendererMain.ts" line="305">

---

## RendererMain Class

The `RendererMain` class is the primary class used to configure and operate the Renderer. It provides methods for creating and destroying Nodes, as well as Texture and Shader references.

```typescript
export class RendererMain extends EventEmitter {
  readonly root: INode | null = null;
  readonly driver: ICoreDriver;
  readonly canvas: HTMLCanvasElement;
  readonly settings: Readonly<Required<RendererMainSettings>>;
  private inspector: Inspector | null = null;
  private nodes: Map<number, INode> = new Map();
  private nextTextureId = 1;

  /**
   * Texture Usage Tracker for Usage Based Texture Garbage Collection
   *
   * @remarks
   * For internal use only. DO NOT ACCESS.
   */
  public textureTracker: TextureUsageTracker;

  /**
   * Constructs a new Renderer instance
   *
   * @param settings Renderer settings
```

---

</SwmSnippet>

<SwmSnippet path="/src/main-api/RendererMain.ts" line="52">

---

## Texture and Shader References

The Main API provides interfaces and types for creating references to Textures and Shaders. These references are used to communicate with the Core API Space to create, load, and destroy the Texture and Shader instances.

```typescript
export interface SpecificTextureRef<TxType extends keyof TextureMap> {
  readonly descType: 'texture';
  readonly txType: TxType;
  readonly props: ExtractProps<TextureMap[TxType]>;
  readonly options?: Readonly<TextureOptions>;
}

type MapTextureRefs<TxType extends keyof TextureMap> =
  TxType extends keyof TextureMap ? SpecificTextureRef<TxType> : never;

/**
 * An immutable reference to a Texture
 *
 * @remarks
 * This structure should only be created by the RendererMain's `createTexture`
 * method. The structure is immutable and should not be modified once created.
 *
 * A `TextureRef` exists in the Main API Space and is used to point to an actual
 * `Texture` instance in the Core API Space. The `TextureRef` is used to
 * communicate with the Core API Space to create, load, and destroy the
 * `Texture` instance.
```

---

</SwmSnippet>

<SwmSnippet path="/src/main-api/Inspector.ts" line="147">

---

## Inspector Class

The `Inspector` class is a tool that allows you to inspect the state of the renderer and the nodes that are being rendered. It is used for debugging and development purposes.

```typescript
export class Inspector {
  private root: HTMLElement | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private height = 1080;
  private width = 1920;
  private scaleX = 1;
  private scaleY = 1;

  constructor(canvas: HTMLCanvasElement, settings: RendererMainSettings) {
    if (isProductionEnvironment()) return;

    if (!settings) {
      throw new Error('settings is required');
    }

    // calc dimensions based on the devicePixelRatio
    this.height = Math.ceil(
      settings.appHeight ?? 1080 / (settings.deviceLogicalPixelRatio ?? 1),
    );

    this.width = Math.ceil(
```

---

</SwmSnippet>

&nbsp;

*This is an auto-generated document by Swimm AI 🌊 and has not yet been verified by a human*

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="overview"><sup>Powered by [Swimm](/)</sup></SwmMeta>

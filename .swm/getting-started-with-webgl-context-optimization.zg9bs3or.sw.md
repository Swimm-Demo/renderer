---
title: Getting Started with WebGL Context Optimization
---
The WebGlContextWrapper is a class that provides an optimized wrapper around the WebGLRenderingContext and WebGL2RenderingContext APIs. It is designed to enhance performance by caching high volume WebGL methods to avoid unnecessary WebGL calls if the state is already set to the desired value. While most methods in this class are direct passthroughs to the WebGL context, some methods combine multiple WebGL calls into one for convenience, modify arguments to be more convenient, or are replaced by more specific methods.

The WebGlContextWrapper also exposes a subset of GLenum constants as properties on this class for convenience. This includes constants such as ONE, UNPACK_FLIP_Y_WEBGL, FLOAT, LINEAR, and others. These constants are used throughout the renderer for various operations.

The WebGlContextWrapper class also includes a method called isWebGl2, which returns true if the WebGL context is WebGL2. This is used to determine the capabilities of the WebGL context and adjust rendering operations accordingly.

The WebGlContextWrapper class also includes a method called clear, which is used to clear the WebGL context. This method is always called with the COLOR_BUFFER_BIT mask, indicating that the color buffer should be cleared.

The WebGlContextWrapper class is used extensively throughout the renderer. It is used in the creation of shaders, textures, and other WebGL resources. It is also used in the rendering process to set up the WebGL context and perform rendering operations.

<SwmSnippet path="/src/core/lib/WebGlContextWrapper.ts" line="27">

---

# WebGlContextWrapper Class

This is the definition of the WebGlContextWrapper class. It includes a number of properties and methods that wrap the WebGLRenderingContext and WebGL2RenderingContext APIs.

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

<SwmSnippet path="/src/core/lib/WebGlContextWrapper.ts" line="183">

---

# isWebGl2 Method

The isWebGl2 method is used to check if the WebGL context is WebGL2. This is used to determine the capabilities of the WebGL context and adjust rendering operations accordingly.

```typescript
  /**
   * Returns true if the WebGL context is WebGL2
   *
   * @returns
   */
  isWebGl2() {
    return isWebGl2(this.gl);
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/lib/WebGlContextWrapper.ts" line="604">

---

# clear Method

The clear method is used to clear the WebGL context. This method is always called with the COLOR_BUFFER_BIT mask, indicating that the color buffer should be cleared.

```typescript
  clear() {
    const { gl } = this;
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/lib/WebGlContextWrapper.ts" line="58">

---

# GLenum Constants

The WebGlContextWrapper class exposes a subset of GLenum constants as properties. These constants are used throughout the renderer for various operations.

```typescript
  //#region WebGL Enums
  public readonly MAX_RENDERBUFFER_SIZE;
  public readonly MAX_TEXTURE_SIZE;
  public readonly MAX_VIEWPORT_DIMS;
  public readonly MAX_VERTEX_TEXTURE_IMAGE_UNITS;
  public readonly MAX_TEXTURE_IMAGE_UNITS;
  public readonly MAX_COMBINED_TEXTURE_IMAGE_UNITS;
  public readonly MAX_VERTEX_ATTRIBS;
  public readonly MAX_VARYING_VECTORS;
  public readonly MAX_VERTEX_UNIFORM_VECTORS;
  public readonly MAX_FRAGMENT_UNIFORM_VECTORS;
  public readonly TEXTURE_MAG_FILTER;
  public readonly TEXTURE_MIN_FILTER;
  public readonly TEXTURE_WRAP_S;
  public readonly TEXTURE_WRAP_T;
  public readonly LINEAR;
  public readonly CLAMP_TO_EDGE;
  public readonly RGBA;
  public readonly UNSIGNED_BYTE;
  public readonly UNPACK_PREMULTIPLY_ALPHA_WEBGL;
  public readonly UNPACK_FLIP_Y_WEBGL;
```

---

</SwmSnippet>

# WebGlContextWrapper Functions

This section will cover the main functions of the WebGlContextWrapper class, focusing on the isWebGl2, clear, and createBuffer methods.

<SwmSnippet path="/src/core/lib/WebGlContextWrapper.ts" line="183">

---

## isWebGl2

The `isWebGl2` method is used to check if the WebGL context is WebGL2. This information is used to determine the capabilities of the WebGL context and adjust rendering operations accordingly.

```typescript
  /**
   * Returns true if the WebGL context is WebGL2
   *
   * @returns
   */
  isWebGl2() {
    return isWebGl2(this.gl);
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/lib/WebGlContextWrapper.ts" line="596">

---

## clear

The `clear` method is used to clear the WebGL context. This method is always called with the COLOR_BUFFER_BIT mask, indicating that the color buffer should be cleared.

````typescript
  /**
   * ```
   * gl.clear(gl.COLOR_BUFFER_BIT);
   * ```
   *
   * @remarks
   * **WebGL Difference**: Clear mask is always `gl.COLOR_BUFFER_BIT`
   */
  clear() {
    const { gl } = this;
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
````

---

</SwmSnippet>

<SwmSnippet path="/src/core/lib/WebGlContextWrapper.ts" line="538">

---

## createBuffer

The `createBuffer` method is used to create a new WebGL buffer. This method is used in various places in the renderer to create buffers for storing vertex and index data.

````typescript
  /**
   * ```
   * gl.createBuffer();
   * ```
   *
   * @returns
   */
  createBuffer() {
    const { gl } = this;
    return gl.createBuffer();
  }
````

---

</SwmSnippet>

&nbsp;

*This is an auto-generated document by Swimm AI 🌊 and has not yet been verified by a human*

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="overview"><sup>Powered by [Swimm](/)</sup></SwmMeta>

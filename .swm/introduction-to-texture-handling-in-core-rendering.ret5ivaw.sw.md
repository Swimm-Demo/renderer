---
title: Introduction to Texture Handling in Core Rendering
---
Textures in the Core Rendering of the Renderer project are used to handle the visual aspects of the rendered objects. They are essentially images that are mapped onto the surface of 3D models.

The `RenderTexture` class is a type of texture that is used for off-screen rendering. It has properties such as width and height, which can be adjusted as per the requirements. The `RenderTextureProps` interface defines these properties.

The `ImageTexture` class is another type of texture that uses an image loaded from a URL. It has properties defined by the `ImageTextureProps` interface, such as the source of the image and whether to premultiply the alpha channel into the color channels of the image.

The `TextureData` interface is used to populate a CoreContextTexture. It includes the texture data and a flag to indicate whether to premultiply alpha when uploading texture data to the GPU.

<SwmSnippet path="/src/core/textures/RenderTexture.ts" line="40">

---

# RenderTexture

The `RenderTexture` class is a type of texture that is used for off-screen rendering. It has properties such as width and height, which can be adjusted as per the requirements.

```typescript
export class RenderTexture extends Texture {
  props: Required<RenderTextureProps>;

  constructor(txManager: CoreTextureManager, props?: RenderTextureProps) {
    super(txManager);
    this.props = RenderTexture.resolveDefaults(props || {});
  }

  get width() {
    return this.props.width;
  }

  set width(value: number) {
    this.props.width = value;
  }

  get height() {
    return this.props.height;
  }

  set height(value: number) {
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/textures/ImageTexture.ts" line="74">

---

# ImageTexture

The `ImageTexture` class is another type of texture that uses an image loaded from a URL. It has properties defined by the `ImageTextureProps` interface, such as the source of the image and whether to premultiply the alpha channel into the color channels of the image.

```typescript
export class ImageTexture extends Texture {
  props: Required<ImageTextureProps>;

  constructor(txManager: CoreTextureManager, props: ImageTextureProps) {
    super(txManager);
    this.props = ImageTexture.resolveDefaults(props);
  }

  hasAlphaChannel(mimeType: string) {
    return mimeType.indexOf('image/png') !== -1;
  }

  override async getTextureData(): Promise<TextureData> {
    const { src, premultiplyAlpha } = this.props;
    if (!src) {
      return {
        data: null,
      };
    }

    if (typeof src !== 'string') {
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/textures/Texture.ts" line="83">

---

# TextureData

The `TextureData` interface is used to populate a CoreContextTexture. It includes the texture data and a flag to indicate whether to premultiply alpha when uploading texture data to the GPU.

```typescript
export interface TextureData {
  /**
   * The texture data
   */
  data:
    | ImageBitmap
    | ImageData
    | SubTextureProps
    | CompressedData
    | HTMLImageElement
    | null;
  /**
   * Premultiply alpha when uploading texture data to the GPU
   *
   * @defaultValue `false`
   */
  premultiplyAlpha?: boolean | null;
}
```

---

</SwmSnippet>

# Texture Functions

Understanding Texture Functions

<SwmSnippet path="/src/core/textures/Texture.ts" line="213">

---

## getTextureData Function

The `getTextureData` function is an abstract method in the `Texture` class. This method is called by the CoreContextTexture when the texture is loaded. The texture data is then used to populate the CoreContextTexture. Each concrete `Texture` subclass must implement this method appropriately.

```typescript
  /**
   * Get the texture data for this texture.
   *
   * @remarks
   * This method is called by the CoreContextTexture when the texture is loaded.
   * The texture data is then used to populate the CoreContextTexture.
   *
   * @returns
   * The texture data for this texture.
   */
  abstract getTextureData(): Promise<TextureData>;
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/textures/Texture.ts" line="244">

---

## resolveDefaults Function

The `resolveDefaults` function is an abstract method in the `Texture` class. Each concrete `Texture` subclass must implement this method to provide default values for the texture's optional properties. This function takes the texture's properties as an argument and returns the default values for the texture's properties.

```typescript
  /**
   * Resolve the default values for the texture's properties.
   *
   * @remarks
   * Each concrete `Texture` subclass must implement this method to provide
   * default values for the texture's optional properties.
   *
   * @param props
   * @returns
   * The default values for the texture's properties.
   */
  static resolveDefaults(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    props: unknown,
  ): Record<string, unknown> {
    return {};
  }
```

---

</SwmSnippet>

&nbsp;

*This is an auto-generated document by Swimm AI 🌊 and has not yet been verified by a human*

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="overview"><sup>Powered by [Swimm](/)</sup></SwmMeta>

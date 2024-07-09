---
title: Getting Started with Shader Effects in WebGL Rendering
---
Shaders in the renderer are used to create visual effects in the WebGL rendering context. They are written in GLSL (OpenGL Shading Language) and are used to control the rendering of pixels and vertices on the screen.

The renderer uses shaders in various ways. For instance, the `DynamicShader` class uses shaders to dynamically create visual effects based on the properties and effects passed to it. It counts duplicate effects, initializes new effect classes, and builds the source for the shader.

The `ShaderEffect` class is an abstract class that provides a base for creating different types of shader effects. It includes methods for getting effect keys, resolving defaults, and getting method parameters. It also includes properties for shader masks, colorization, and effect masks.

The renderer also provides specific shader effect classes, such as `GrayscaleEffect`, `BorderEffect`, `BorderLeftEffect`, and `BorderTopEffect`, among others. These classes extend the `ShaderEffect` class and provide specific implementations for different visual effects.

The renderer also includes a `DefaultShader` class, which provides a default vertex shader source. This is used when no specific shader effect is applied.

<SwmSnippet path="/src/core/renderers/webgl/shaders/effects/ShaderEffect.ts" line="37">

---

# ShaderEffect Class

The `ShaderEffect` class is an abstract class that provides a base for creating different types of shader effects. It includes methods for getting effect keys, resolving defaults, and getting method parameters. It also includes properties for shader masks, colorization, and effect masks.

```typescript
export abstract class ShaderEffect {
  readonly priority = 1;
  readonly name: string = '';

  ref: string;
  target: string;

  passParameters = '';
  declaredUniforms = '';
  uniformInfo: Record<string, UniformInfo> = {};

  static uniforms: ShaderEffectUniforms = {};
  static methods?: Record<string, string>;

  static onShaderMask?: ((value: Record<string, unknown>) => string) | string;

  static onColorize?: ((value: Record<string, unknown>) => string) | string;
  static onEffectMask?: ((value: Record<string, unknown>) => string) | string;

  static getEffectKey(props: Record<string, unknown>): string {
    return '';
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/renderers/webgl/shaders/DynamicShader.ts" line="204">

---

# DynamicShader Class

The `DynamicShader` class uses shaders to dynamically create visual effects based on the properties and effects passed to it. It counts duplicate effects, initializes new effect classes, and builds the source for the shader.

```typescript
  static createShader(
    props: DynamicShaderProps,
    effectContructors: Partial<EffectMap>,
  ) {
    //counts duplicate effects
    const effectNameCount: Record<string, number> = {};
    const methods: Record<string, string> = {};

    let declareUniforms = '';
    const uniforms: UniformInfo[] = [];

    const uFx: Record<string, unknown>[] = [];

    const effects = props.effects!.map((effect) => {
      const baseClass = effectContructors[effect.type]!;
      const key = baseClass.getEffectKey(effect.props || {});

      effectNameCount[key] = effectNameCount[key] ? ++effectNameCount[key] : 1;

      const nr = effectNameCount[key]!;

```

---

</SwmSnippet>

<SwmSnippet path="/src/core/renderers/webgl/shaders/effects/GrayscaleEffect.ts" line="40">

---

# Specific Shader Effects

The renderer also provides specific shader effect classes, such as `GrayscaleEffect`, `BorderEffect`, `BorderLeftEffect`, and `BorderTopEffect`, among others. These classes extend the `ShaderEffect` class and provide specific implementations for different visual effects.

```typescript
export class GrayscaleEffect extends ShaderEffect {
  override readonly name = 'grayscale';
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/renderers/webgl/shaders/DefaultShader.ts" line="44">

---

# DefaultShader Class

The renderer also includes a `DefaultShader` class, which provides a default vertex shader source. This is used when no specific shader effect is applied.

```typescript
  static override shaderSources: ShaderProgramSources = {
```

---

</SwmSnippet>

&nbsp;

*This is an auto-generated document by Swimm AI 🌊 and has not yet been verified by a human*

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="overview"><sup>Powered by [Swimm](/)</sup></SwmMeta>

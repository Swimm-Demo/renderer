---
title: Dynamically Applying Shader Effects in the Renderer
---
This document will cover the process of applying shader effects dynamically in the Lightning 3 Renderer. The topics covered include:

1. The role of the DynamicShader class
2. The use of the DynamicShaderProps interface
3. The function of the getResolvedEffect function
4. The purpose of the EffectDesc interface
5. The application of shader effects in the createShader method.

<SwmSnippet path="/src/core/renderers/webgl/shaders/DynamicShader.ts" line="104">

---

# The Role of the DynamicShader Class

The DynamicShader class is responsible for managing the application of shader effects. It maintains an array of effects and provides methods for binding properties and determining if shader properties can be batched.

```typescript
export class DynamicShader extends WebGlCoreShader {
  effects: Array<InstanceType<EffectMap[keyof EffectMap]>> = [];

  constructor(
    renderer: WebGlCoreRenderer,
    props: DynamicShaderProps,
    effectContructors: Partial<EffectMap>,
  ) {
    const shader = DynamicShader.createShader(props, effectContructors);
    super({
      renderer,
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/renderers/webgl/shaders/DynamicShader.ts" line="70">

---

# The Use of the DynamicShaderProps Interface

The DynamicShaderProps interface defines the properties that are used when applying shader effects. It extends other interfaces to include dimensions and alpha properties, and also includes an optional array of EffectDesc objects.

```typescript
export interface DynamicShaderProps
  extends DimensionsShaderProp,
    AlphaShaderProp {
  effects?: EffectDesc[];
}
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/renderers/webgl/shaders/DynamicShader.ts" line="84">

---

# The Function of the getResolvedEffect Function

The getResolvedEffect function is used to retrieve the resolved effects for a given set of effects and effect constructors. It uses a cache to improve performance, and maps the effects to their resolved values.

```typescript
const getResolvedEffect = (
  effects: EffectDesc[] | undefined,
  effectContructors: Partial<EffectMap> | undefined,
): EffectDesc[] => {
  const key = JSON.stringify(effects);
  if (effectCache.has(key)) {
    return effectCache.get(key)!;
  }

  const value = (effects ?? []).map((effect) => ({
    type: effect.type,
    props: effectContructors![effect.type]!.resolveDefaults(
      (effect.props || {}) as any,
    ),
  })) as EffectDesc[];

  effectCache.set(key, value);
  return value;
};
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/renderers/webgl/shaders/DynamicShader.ts" line="76">

---

# The Purpose of the EffectDesc Interface

The EffectDesc interface is used to describe a specific effect. It includes a type and optional properties.

```typescript
export interface SpecificEffectDesc<
  FxType extends keyof EffectMap = keyof EffectMap,
> {
  type: FxType;
  props?: ExtractProps<EffectMap[FxType]>;
}
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/renderers/webgl/shaders/DynamicShader.ts" line="204">

---

# The Application of Shader Effects in the createShader Method

The createShader method is used to create a new shader with the given properties and effect constructors. It maps the effects to their corresponding classes, creates new instances of these classes, and builds the shader code.

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

&nbsp;

*This is an auto-generated document by Swimm AI 🌊 and has not yet been verified by a human*

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="follow-up"><sup>Powered by [Swimm](/)</sup></SwmMeta>

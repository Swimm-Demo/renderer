---
title: Getting Started with Shader Effects
---
Effects in the renderer project refer to the visual transformations applied to the 2D scene. These transformations are implemented using WebGL Shaders, specifically through the ShaderEffect class and its subclasses.

The ShaderEffect class is an abstract class that provides a structure for creating different types of effects. It contains properties and methods that are common to all effects, such as uniforms and methods for handling shader masks and colorization.

Subclasses of ShaderEffect, such as GrayscaleEffect, BorderEffect, and LinearGradientEffect, implement specific visual effects. They override the properties and methods of ShaderEffect as necessary to achieve the desired effect.

The ShaderEffect class and its subclasses are used throughout the renderer project to apply effects to the 2D scene. For example, they are used in the DynamicShader class to apply effects dynamically based on the properties of the scene.

<SwmSnippet path="/src/core/renderers/webgl/shaders/effects/EffectUtils.ts" line="1">

---

# ShaderEffect Class

The ShaderEffect class is an abstract class that provides a structure for creating different types of effects. It contains properties and methods that are common to all effects, such as uniforms and methods for handling shader masks and colorization.

```typescript
/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2023 Comcast Cable Communications Management, LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/renderers/webgl/shaders/effects/GrayscaleEffect.ts" line="1">

---

# Subclasses of ShaderEffect

Subclasses of ShaderEffect, such as GrayscaleEffect, implement specific visual effects. They override the properties and methods of ShaderEffect as necessary to achieve the desired effect.

```typescript
/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2023 Comcast Cable Communications Management, LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/renderers/webgl/shaders/effects/BorderEffect.ts" line="1">

---

# Applying Effects

The ShaderEffect class and its subclasses are used throughout the renderer project to apply effects to the 2D scene. For example, they are used in the DynamicShader class to apply effects dynamically based on the properties of the scene.

```typescript
/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2023 Comcast Cable Communications Management, LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
```

---

</SwmSnippet>

&nbsp;

*This is an auto-generated document by Swimm AI 🌊 and has not yet been verified by a human*

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="overview"><sup>Powered by [Swimm](/)</sup></SwmMeta>

---
title: Overview
---
The repo renderer, specifically the Lightning 3 Renderer, is a powerful 2D scene renderer. It's designed to render highly performant user interfaces on web browsers running on embedded devices using WebGL. However, it's not designed for direct application development. Instead, it provides a lightweight API for front-end application frameworks like Bolt and Solid.

## Main Components

### Rendering Drivers

Rendering drivers are responsible for managing the rendering process of the user interface in different threads.

- <SwmLink doc-title="Rendering drivers overview">[Rendering drivers overview](.swm/rendering-drivers-overview.w0gn46bh.sw.md)</SwmLink>
- <SwmLink doc-title="Basic concepts of main rendering process">[Basic concepts of main rendering process](.swm/basic-concepts-of-main-rendering-process.z9q4yiaj.sw.md)</SwmLink>
- **Main only node**
  - <SwmLink doc-title="Understanding main node">[Understanding main node](.swm/understanding-main-node.yi0k8w03.sw.md)</SwmLink>
  - <SwmLink doc-title="The mainonlynode class">[The mainonlynode class](.swm/the-mainonlynode-class.zmhw5.sw.md)</SwmLink>
- **Threadx**
  - <SwmLink doc-title="Getting started with threadx in rendering drivers">[Getting started with threadx in rendering drivers](.swm/getting-started-with-threadx-in-rendering-drivers.eryh4ao8.sw.md)</SwmLink>
  - <SwmLink doc-title="Exploring the node structure in threadx">[Exploring the node structure in threadx](.swm/exploring-the-node-structure-in-threadx.fy70imvd.sw.md)</SwmLink>
  - <SwmLink doc-title="The threadxrenderernode class">[The threadxrenderernode class](.swm/the-threadxrenderernode-class.4xh43.sw.md)</SwmLink>

### Core Rendering

Core Rendering is the process of drawing 2D scenes on the screen, implemented through the `CoreRenderer` class and its subclasses, and configured via `CoreRendererOptions`. It uses `CoreRenderOp` to define the operations that can be performed by the renderer.

- <SwmLink doc-title="Core rendering overview">[Core rendering overview](.swm/core-rendering-overview.axa4a07v.sw.md)</SwmLink>
- <SwmLink doc-title="Exploring the core rendering library">[Exploring the core rendering library](.swm/exploring-the-core-rendering-library.nwj8kxi4.sw.md)</SwmLink>
- <SwmLink doc-title="What is the text rendering node">[What is the text rendering node](.swm/what-is-the-text-rendering-node.3rdj7faz.sw.md)</SwmLink>
- **Core node**
  - <SwmLink doc-title="Understanding corenode in scene graph">[Understanding corenode in scene graph](.swm/understanding-corenode-in-scene-graph.tt2ijk33.sw.md)</SwmLink>
  - <SwmLink doc-title="Best practices to manage complex parent child relationships with transformations in the corenode system">[Best practices to manage complex parent child relationships with transformations in the corenode system](.swm/best-practices-to-manage-complex-parent-child-relationships-with-transformations-in-the-corenode-system.u2g1kcjg.sw.md)</SwmLink>
- **Web gl context wrapper**
  - <SwmLink doc-title="Getting started with webgl context optimization">[Getting started with webgl context optimization](.swm/getting-started-with-webgl-context-optimization.zg9bs3or.sw.md)</SwmLink>
  - <SwmLink doc-title="Usage of glenum constants in the webgl context wrapper">[Usage of glenum constants in the webgl context wrapper](.swm/usage-of-glenum-constants-in-the-webgl-context-wrapper.jae45w6z.sw.md)</SwmLink>
- **Text rendering**
  - <SwmLink doc-title="Understanding text rendering in core rendering">[Understanding text rendering in core rendering](.swm/understanding-text-rendering-in-core-rendering.tiavm4hv.sw.md)</SwmLink>
  - <SwmLink doc-title="Basic concepts of text rendering with lightning text texture renderer">[Basic concepts of text rendering with lightning text texture renderer](.swm/basic-concepts-of-text-rendering-with-lightning-text-texture-renderer.oujtc2zu.sw.md)</SwmLink>
  - <SwmLink doc-title="Introduction to canvas text rendering">[Introduction to canvas text rendering](.swm/introduction-to-canvas-text-rendering.k0vhtyux.sw.md)</SwmLink>
  - <SwmLink doc-title="Introduction to sdf text rendering">[Introduction to sdf text rendering](.swm/introduction-to-sdf-text-rendering.pego3zvl.sw.md)</SwmLink>
- **Textures**
  - <SwmLink doc-title="Introduction to texture handling in core rendering">[Introduction to texture handling in core rendering](.swm/introduction-to-texture-handling-in-core-rendering.ret5ivaw.sw.md)</SwmLink>
  - <SwmLink doc-title="The texture class">[The texture class](.swm/the-texture-class.40p4g.sw.md)</SwmLink>
- **Renderers**
  - <SwmLink doc-title="Basic concepts of core rendering renderers">[Basic concepts of core rendering renderers](.swm/basic-concepts-of-core-rendering-renderers.aky5f5m7.sw.md)</SwmLink>
  - <SwmLink doc-title="Getting started with shader effects in webgl rendering">[Getting started with shader effects in webgl rendering](.swm/getting-started-with-shader-effects-in-webgl-rendering.0g1o7uz1.sw.md)</SwmLink>
  - **Effects**
    - <SwmLink doc-title="Getting started with shader effects">[Getting started with shader effects](.swm/getting-started-with-shader-effects.ludv9lcv.sw.md)</SwmLink>
    - <SwmLink doc-title="Dynamically applying shader effects in the renderer">[Dynamically applying shader effects in the renderer](.swm/dynamically-applying-shader-effects-in-the-renderer.u89xc6i1.sw.md)</SwmLink>
    - <SwmLink doc-title="The shadereffect class">[The shadereffect class](.swm/the-shadereffect-class.6zga3.sw.md)</SwmLink>
  - **Classes**
    - <SwmLink doc-title="The webglcoreshader class">[The webglcoreshader class](.swm/the-webglcoreshader-class.bb5xi.sw.md)</SwmLink>
    - <SwmLink doc-title="The webglcorectxtexture class">[The webglcorectxtexture class](.swm/the-webglcorectxtexture-class.ofgfs.sw.md)</SwmLink>
    - <SwmLink doc-title="The webglcoreshader class">[The webglcoreshader class](.swm/the-webglcoreshader-class.awwp3.sw.md)</SwmLink>

### Main API

The Main API is a set of tools and interfaces that provide a way to interact with the Lightning 3 Renderer, allowing the creation and management of Nodes, Textures, and Shaders, as well as providing debugging and inspection tools.

- <SwmLink doc-title="Main api overview">[Main api overview](.swm/main-api-overview.rcs87jbg.sw.md)</SwmLink>
- <SwmLink doc-title="Understanding the inspector tool">[Understanding the inspector tool](.swm/understanding-the-inspector-tool.ckrp1423.sw.md)</SwmLink>

### Flows

- <SwmLink doc-title="Renderer initialization process">[Renderer initialization process](.swm/renderer-initialization-process.7tm7ilju.sw.md)</SwmLink>

## Classes

- <SwmLink doc-title="The eventemitter class">[The eventemitter class](.swm/the-eventemitter-class.fl3p5.sw.md)</SwmLink>

## Build Tools

- <SwmLink doc-title="Docker usage in visual regression testing">[Docker usage in visual regression testing](.swm/docker-usage-in-visual-regression-testing.hbm9ylot.sw.md)</SwmLink>

&nbsp;

*This is an auto-generated document by Swimm AI 🌊 and has not yet been verified by a human*

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="other"><sup>Powered by [Swimm](/)</sup></SwmMeta>

/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2024 Comcast Cable Communications Management, LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { ExampleSettings } from '../common/ExampleSettings.js';

export async function automation(settings: ExampleSettings) {
  const next = await test(settings);
  await settings.snapshot();
  while (await next()) {
    await settings.snapshot();
  }
}

/**
 * Similar to `text-layout-consistency` but focuses on the consistency between
 * the canvas text renderer and the sdf text renderer when using a font with
 * modified metrics.
 *
 * Expected results: The two text nodes should overlap precisely and the text
 * should appear as one purple block.
 *
 * Press the right arrow key to cycle through the different widths
 *
 * @param param0
 * @returns
 */
export default async function test({ renderer, testRoot }: ExampleSettings) {
  const fontFamily = 'Ubuntu';
  const fontFamilyModified = 'Ubuntu-Modified-Metrics';

  const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  const fontSize = 100;
  const yPos = 0;
  testRoot.width = 1000;
  testRoot.height = 1000;
  testRoot.color = 0xffffffff;

  const canvasText = renderer.createTextNode({
    y: yPos,
    width: testRoot.width,
    text,
    fontSize,
    fontFamily,
    contain: 'width',
    color: 0xff0000ff,
    textRendererOverride: 'canvas',
    parent: testRoot,
  });
  const sdfText = renderer.createTextNode({
    y: yPos,
    width: testRoot.width,
    text,
    fontSize,
    fontFamily,
    contain: 'width',
    color: 0x0000ff77,
    parent: testRoot,
    zIndex: 3,
  });
  const indexInfo = renderer.createTextNode({
    x: testRoot.width,
    y: testRoot.height,
    mount: 1,
    width: 0,
    height: 0,
    color: 0x000000ff,
    fontFamily: 'Ubuntu',
    fontSize: 20,
    text: '1',
    parent: testRoot,
  });

  let i = 0;
  const mutations = [
    () => {
      canvasText.fontFamily = sdfText.fontFamily = fontFamily;
      canvasText.width = sdfText.width = 500;
    },
    () => {
      canvasText.fontFamily = sdfText.fontFamily = fontFamilyModified;
    },
    () => {
      canvasText.fontFamily = sdfText.fontFamily = fontFamily;
    },
    () => {
      canvasText.fontFamily = sdfText.fontFamily = fontFamilyModified;
      canvasText.width = sdfText.width = 1000;
    },
    () => {
      canvasText.fontFamily = sdfText.fontFamily = fontFamily;
    },
  ];

  /**
   * Run the next mutation in the list
   *
   * @param idx
   * @returns `false` if loop is set to false and we've already gone through all mutations. Otherwise `true`.
   */
  async function next(loop = false, idx = i + 1): Promise<boolean> {
    if (idx > mutations.length - 1) {
      if (!loop) {
        return false;
      }
      idx = 0;
    }
    i = idx;
    mutations[i]?.();
    indexInfo.text = (i + 1).toString();
    return true;
  }
  await next(false, 0);

  window.addEventListener('keydown', (event) => {
    // When right arrow is pressed, call next
    if (event.key === 'ArrowRight') {
      next(true).catch(console.error);
    }
  });

  return next;
}

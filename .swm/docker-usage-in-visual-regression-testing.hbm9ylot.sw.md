---
title: Docker Usage in Visual Regression Testing
---
This document provides a detailed walkthrough of how Docker is used in the context of the Lightning 3 Renderer project, specifically focusing on the Dockerfile configuration and its usage in the visual-regression testing.

<SwmSnippet path="/Dockerfile" line="1">

---

# Dockerfile Configuration

The Dockerfile begins with the selection of the base image, which in this case is `mcr.microsoft.com/playwright:v1.39.0-jammy`. This image is designed for Playwright, a Node.js library to automate Chromium, Firefox and WebKit browsers. The working directory is then set to `/work`. Next, the global package manager `pnpm` is installed using `npm install -g pnpm`. The `.npmrc` and `package.json` files are then copied into the Docker container, and `pnpm` is used to install the version of Node declared in `.npmrc`. The Dockerfile concludes with the setting of the entry point command, which echoes a message indicating that the Visual Regression Test Runner must be run with `pnpm run test:visual --ci`.

```
# Use Playwright's base image
FROM mcr.microsoft.com/playwright:v1.39.0-jammy

# Set the working directory
WORKDIR /work

# Install PNPM
RUN npm install -g pnpm

# Copy the necessary files to the container
COPY .npmrc .npmrc
COPY package.json package.json

# Get pnpm to install the version of Node declared in .npmrc
RUN pnpm exec ls

# Set the entry point command
CMD ["/bin/bash", "-c", "echo 'Must run with Visual Regression Test Runner: `pnpm run test:visual --ci`'"]
```

---

</SwmSnippet>

<SwmSnippet path="/visual-regression/src/index.ts" line="142">

---

# Docker Usage in Visual Regression Testing

The `dockerCiMode` function in `visual-regression/src/index.ts` is responsible for re-launching the script in a Docker container with the `ci` runtime environment. It relays the command line arguments to the Docker container, gets the directory of the current file, and runs the Docker command with the appropriate volume mappings and working directory. The Docker container runs with the `visual-regression:latest` image and executes the command `pnpm install && RUNTIME_ENV=ci pnpm test:visual` with the relayed command line arguments.

```typescript
/**
 * Re-launches this script in a docker container with the `ci` runtime environment
 *
 * @returns Exit code
 */
async function dockerCiMode(): Promise<number> {
  // Relay the command line arguments to the docker container
  const commandLineStr = [
    argv.capture ? '--capture' : '',
    argv.overwrite ? '--overwrite' : '',
    argv.verbose ? '--verbose' : '',
    argv.skipBuild ? '--skipBuild' : '',
    argv.port ? `--port ${argv.port}` : '',
    argv.filter ? `--filter "${argv.filter}"` : '',
  ].join(' ');

  // Get the directory of the current file
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const rootDir = path.resolve(__dirname, '..', '..', '..');

  const childProc = $({ stdio: 'inherit' })`docker run --network host \
```

---

</SwmSnippet>

&nbsp;

*This is an auto-generated document by Swimm AI 🌊 and has not yet been verified by a human*

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="general-build-tool"><sup>Powered by [Swimm](/)</sup></SwmMeta>

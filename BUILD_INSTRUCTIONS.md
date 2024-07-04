# Building Heat.js v4.0.1

Before getting started with Heat.js, please read through the following instructions:


## Step 1: Install Packages:

Install the packages using the following NPM commands:

### 1. Install TypeScript:

```markdown
npm install -g typescript
```

### 2. Install tsup:

```markdown
npm i tsup -D
```

### 3. Install terser:

```markdown
npm install terser -D
```

### 4. Install swc/core (if ES5 is required):

```markdown
npm install @swc/core -D
```


## Step 2: Build Project:

### 1. Full Build:

To build the TypeScript, run the following command:

```markdown
npm run build-typescript
```

To build the SASS, run the following command:

```markdown
npm run build-sass
```

To build the everything, run the following command:

```markdown
npm run build
```

### 2. Minimized Build:

To build the TypeScript, run the following command:

```markdown
npm run build-minimized-typescript
```

To build the SASS, run the following command:

```markdown
npm run build-minimized-sass
```

To build the everything, run the following command:

```markdown
npm run build-minimized
```

### 3. ESM Build:

To build the TypeScript, run the following command:

```markdown
npm run build-typescript-esm
```
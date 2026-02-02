# Building Heat.js

Before getting started with Heat.js, please read through the following instructions:


## Step 1: Install Packages:

Install the packages using the following NPM commands:

### 1. Install TypeScript:

```markdown
npm install -g typescript
```

### 2. Install packages:

```markdown
npm install
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

To build everything, run the following command:

```markdown
npm run build-all
```

To build everything and verify via ESLint, run the following command:

```markdown
npm run build-all-verify
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

To build everything minimized, run the following command:

```markdown
npm run build-minimized
```

### 3. ESM Build:

To build the TypeScript, run the following command:

```markdown
npm run build-typescript-esm
```

## Step 3: Run ESLint:

To verify the code follows all the pre-configured style rules, run the following command:

```markdown
npx eslint '**/*.ts'
```
# Studio Framer

Studio Framer is a lightweight JavaScript framework for building interactive web applications with a focus on modularity, state management, and dynamic styling. It provides a simple API for creating components, managing state, and handling user actions.

## Features

- **Component-based architecture:** Define UI components with encapsulated logic and rendering.
- **State management:** Easily manage and update application state.
- **Dynamic styling:** Inject CSS directly from JavaScript for flexible theming.
- **Action handling:** Attach event listeners to DOM elements for interactive UIs.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/studio-framer.git
cd studio-framer
```

### Project Structure

```
index.html
studio/
  index.js
  style.js
  framework/
    frame.js
    css.js
    utils.js
ts/
  frame.ts
  types.ts
```

### Usage

1. **Include the framework in your HTML:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Studio Framer Example</title>
</head>
<body>
  <div id="base"></div>
  <script src="./studio/index.js" type="module"></script>
</body>
</html>
```

2. **Create a page/component in JavaScript:**

Example from [`studio/index.js`](studio/index.js):

```js
export const homePage = () => {
  const [count, useCount] = usePixel('count', 0)
  const [show, setShow] = usePixel('show', false)

  return {
    canvas: () => `
      <div class="div">
        <h1> {{name}} </h1>
        <button id="index-page">Count {{count}}</button>
        <button id="change-page" class="new"> ${useStore('show') ? "Hey Dear" : "wasted haaa!"}</button>
        <App />
      </div>
    `,
    state: {
      count: count,
      show: show,
      name: "Studio Framer",
      title: "homepage",
    },
    action: [
      {
        id: "index-page",
        type: "click",
        func: () => useCount(count => count + 1)
      },
      {
        id: "change-page",
        type: "click",
        func: () => setShow(prev => !prev)
      }
    ],
    style: ''
  }
}
```

3. **Start the app:**

The main entry point is [`studio/index.js`](studio/index.js), which calls `navigate(homePage)` on window load.

## Customization

- Add new components by defining functions that return an object with `canvas`, `state`, and `action` also `style` for manual styling.
- Use `usePixel` for state hooks and `useStore` to access state values.
- Style your app using [`studio/style.js`](studio/style.js) or inject CSS dynamically.

## License

MIT License
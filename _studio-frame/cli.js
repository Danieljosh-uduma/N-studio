#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const command = process.argv[2] || 'serve';

async function init() {
    console.log('🚀 Initializing new Studio Framer project...');
    const root = process.cwd();

    const folders = ['src', 'src/pages', 'src/styles', 'public'];
    folders.forEach(dir => {
        const fullPath = path.join(root, dir);
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
        }
    });

    const templates = {
        'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Studio Framer App</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            background-color: #000; 
            color: #fff; 
            font-family: 'Inter', -apple-system, system-ui, sans-serif;
        }
    </style>
</head>
<body>
    <div id="base"></div>
    <script src="./index.js" type="module"></script>
</body>
</html>`,
        'index.js': `import { studio } from 'studio-framer';
import config from './studio.config.js';

// Initialize Studio
studio.setConfig(config);`,
        'studio.config.js': `import { homePage } from './src/pages/home.js';

export default {
    tailwind: true,
    routes: {
        '/': homePage
    }
};`,
        'src/pages/home.js': `import { usePixel } from 'studio-framer';

    export const homePage = () => {
    const [getCount, setCount] = usePixel('count', 0);

    return {
        canvas: () => \`
            <div style="height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                <h1 style="font-size: 4rem; background: linear-gradient(to right, #6366F1, #06B6D4); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                    Studio Framer
                </h1>
                <p style="color: #94A3B8; margin-top: 1rem;" class="mb-6">Welcome to your new project!</p>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="btn">Count {{count}} </button>
            </div>
        \`,
        action: {
            id: 'btn',
            type: 'click',
            func: () => setCount(c => c + 1)
        }
    };
};`
    };

    for (const [file, content] of Object.entries(templates)) {
        const filePath = path.join(root, file);
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, content.trim());
            console.log(`  + Created ${file}`);
        } else {
            console.log(`  - ${file} already exists, skipping.`);
        }
    }

    // Create a basic package.json if it doesn't exist
    const pkgPath = path.join(root, 'package.json');
    if (!fs.existsSync(pkgPath)) {
        const pkg = {
            name: "my-studio-app",
            version: "1.0.0",
            type: "module",
            scripts: {
                "start": "studio serve"
            },
            dependencies: {
                "studio-framer": "latest"
            }
        };
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
        console.log('  + Created package.json');
    }

    console.log('\n✅ Project initialized! Run "npm install" then "npx studio serve" to start.');
}

function serve() {
    const serverPath = path.join(__dirname, 'server.js');
    const child = spawn('node', [serverPath], { stdio: 'inherit' });
    
    child.on('close', (code) => {
        process.exit(code);
    });
}

if (command === 'init') {
    await init();
} else if (command === 'serve') {
    serve();
} else {
    console.log('Usage: studio [init|serve]');
}

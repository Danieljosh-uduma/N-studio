import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

async function build() {
    const outDir = '_studio';
    
    // Ensure output directory exists
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
    }

    console.log('🚀 Starting Studio Framer build...');

    try {
        // 1. Bundle and minify JS
        console.log('📦 Bundling JavaScript...');
        await esbuild.build({
            entryPoints: ['index.js'],
            bundle: true,
            minify: true,
            outfile: path.join(outDir, 'index.js'),
            format: 'esm',
            target: ['es2020'],
        });

        // 2. Process HTML and extract CSS
        console.log('🎨 Processing HTML and CSS...');
        const htmlSource = fs.readFileSync('index.html', 'utf8');
        
        // Extract style content
        const styleMatch = htmlSource.match(/<style>([\s\S]*?)<\/style>/);
        let cssContent = '';
        if (styleMatch) {
            cssContent = styleMatch[1].trim();
        }

        // Write CSS file
        fs.writeFileSync(path.join(outDir, 'index.css'), cssContent);

        // Update HTML: remove internal style, add link tag
        let updatedHtml = htmlSource.replace(/<style>[\s\S]*?<\/style>/, '<link rel="stylesheet" href="index.css">');
        
        // Ensure index.js link is correct (it usually is if it matches ./index.js)
        // Write updated HTML
        fs.writeFileSync(path.join(outDir, 'index.html'), updatedHtml);

        console.log('✅ Build complete! Output directory: /_studio');
        console.log('   - index.js (bundled & minified)');
        console.log('   - index.css (extracted styles)');
        console.log('   - index.html (production ready)');
    } catch (error) {
        console.error('❌ Build failed:', error);
        process.exit(1);
    }
}

build();

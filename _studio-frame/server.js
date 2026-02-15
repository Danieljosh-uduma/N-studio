import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PORT = process.env.PORT || 3000;
const ROOT_DIR = process.cwd();

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  let filePath = path.join(ROOT_DIR, req.url === '/' ? 'index.html' : req.url);
  
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // SPA Fallback: if file not found and no extension, serve index.html
        if (!extname) {
          fs.readFile(path.join(ROOT_DIR, 'index.html'), (err, indexContent) => {
            if (err) {
              res.writeHead(500);
              res.end('Error loading index.html');
            } else {
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end(indexContent, 'utf-8');
            }
          });
        } else {
          res.writeHead(404);
          res.end('Not Found');
        }
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      let finalContent = content;

      // Smart Module Resolution: Resolve bare 'studio-framer' imports in JS files
      if (extname === '.js') {
        const textContent = content.toString('utf-8');
        // Replace bare 'studio-framer' imports with relative paths to node_modules
        const updatedText = textContent.replace(
          /(from\s+['"])studio-framer(['"])/g, 
          '$1/node_modules/studio-framer/frame.js$2'
        );
        finalContent = Buffer.from(updatedText, 'utf-8');
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(finalContent);
    }
  });
});

server.listen(PORT, () => {
  console.log(`\x1b[32m✔ Studio Framer server running at http://localhost:${PORT}\x1b[0m`);
});

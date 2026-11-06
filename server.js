const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

let PORT = 3000;
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function createServer(port) {
  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const filePath = path.join(__dirname, decodeURIComponent(reqPath));

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        const fallbackPath = path.join(__dirname, '404.html');
        fs.stat(fallbackPath, (fallbackErr, fallbackStats) => {
          if (!fallbackErr && fallbackStats.isFile()) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            fs.createReadStream(fallbackPath).pipe(res);
          } else {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 Not Found');
          }
        });
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying port ${port + 1}...`);
      createServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(port, () => {
    const url = `http://localhost:${port}/`;
    console.log(`\n=================================================`);
    console.log(`  TDSCOMS Localhost running on E:\\TDSCOMS`);
    console.log(`  URL: ${url}`);
    console.log(`  Press Ctrl+C to stop`);
    console.log(`=================================================\n`);
    
    // Auto-open in browser on Windows
    exec(`start ${url}`);
  });
}

createServer(PORT);

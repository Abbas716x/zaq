/**
 * 716QX Lounge OS 3.5 — Apex Edition
 * Zero-Dependency High-Performance Local Edge Server
 * LAN Multi-Terminal Distribution | Gzip Compression | Cyber Security Headers
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const zlib = require('zlib');

const PORT = process.env.PORT || 7160;
const HOST = '0.0.0.0';
const BASE_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf'
};

const SECURITY_HEADERS = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache, must-revalidate'
};

function getNetworkIPv4() {
    const interfaces = os.networkInterfaces();
    const addresses = [];
    for (const name of Object.keys(interfaces)) {
        for (const net of interfaces[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                addresses.push(net.address);
            }
        }
    }
    return addresses;
}

const server = http.createServer((req, res) => {
    try {
        const safeUrlPath = path.normalize(decodeURI(req.url.split('?')[0])).replace(/^(\.\.[\/\\])+/, '');
        let filePath = path.join(BASE_DIR, safeUrlPath === '/' ? 'index.html' : safeUrlPath);

        fs.stat(filePath, (err, stats) => {
            if (err || !stats.isFile()) {
                // SPA Fallback to index.html
                filePath = path.join(BASE_DIR, 'index.html');
            }

            const ext = path.extname(filePath).toLowerCase();
            const contentType = MIME_TYPES[ext] || 'application/octet-stream';

            // Apply Enterprise Headers
            for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
                res.setHeader(key, value);
            }
            res.setHeader('Content-Type', contentType);

            const rawStream = fs.createReadStream(filePath);
            const acceptEncoding = req.headers['accept-encoding'] || '';

            if (/\bgzip\b/.test(acceptEncoding) && ['.html', '.css', '.js', '.json', '.svg'].includes(ext)) {
                res.setHeader('Content-Encoding', 'gzip');
                res.writeHead(200);
                rawStream.pipe(zlib.createGzip()).pipe(res);
            } else if (/\bdeflate\b/.test(acceptEncoding) && ['.html', '.css', '.js', '.json', '.svg'].includes(ext)) {
                res.setHeader('Content-Encoding', 'deflate');
                res.writeHead(200);
                rawStream.pipe(zlib.createDeflate()).pipe(res);
            } else {
                res.writeHead(200);
                rawStream.pipe(res);
            }
        });
    } catch (criticalErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('716QX Server Critical Exception');
    }
});

server.listen(PORT, HOST, () => {
    const ips = getNetworkIPv4();
    console.log('\n======================================================');
    console.log('   716QX LOUNGE OS 3.5 — LOCAL APEX CLUSTER ONLINE    ');
    console.log('======================================================');
    console.log(`> Cashier Localhost : http://localhost:${PORT}`);
    ips.forEach((ip) => {
        console.log(`> Waiter / LAN Node : http://${ip}:${PORT}`);
    });
    console.log('======================================================\n');
});

// Graceful Termination
process.on('SIGINT', () => {
    server.close(() => process.exit(0));
});
process.on('SIGTERM', () => {
    server.close(() => process.exit(0));
});

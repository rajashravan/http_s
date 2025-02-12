const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('server.key'),  // Self-signed key
    cert: fs.readFileSync('server.cert') // Self-signed certificate
};

const server = https.createServer(options, (req, res) => {
    if (req.method === 'POST' && req.url === '/login') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            console.log("🟢 Secure login credentials (ENCRYPTED!):", body);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Login successful (secure with HTTPS)');
        });

    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <h1>Login (SECURE HTTPS)</h1>
            <form method="POST" action="/login">
                <input type="text" name="email" placeholder="Email"><br>
                <input type="password" name="password" placeholder="Password"><br>
                <button type="submit">Login</button>
            </form>
        `);
    }
});

server.listen(8443, () => {
    console.log("🛡️ Secure HTTPS server running on https://localhost:8443");
});

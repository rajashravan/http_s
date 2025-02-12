const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/login') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            console.log("🔴 Received login credentials (UNENCRYPTED):", body);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Login successful (but insecure!)');
        });

    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <h1>Login (INSECURE HTTP)</h1>
            <form method="POST" action="/login">
                <input type="text" name="email" placeholder="Email"><br>
                <input type="password" name="password" placeholder="Password"><br>
                <button type="submit">Login</button>
            </form>
        `);
    }
});

server.listen(8080, () => {
    console.log("🚨 Insecure HTTP server running on http://localhost:8080");
});

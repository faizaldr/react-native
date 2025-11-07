import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('./mahasiswa.db');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', (req, res) => {
    const { username, password } = req.body;
    const db = router.db;
    const user = db.get('users').find({ username, password }).value();

    if (user) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '' + Date.now();
        for (let i = 0; i < 5; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return res.json({
            success: true,
            message: 'Login berhasil!',
            user: { id: user.id, name: user.name, username: user.username },
            token
        });
    } else {
        return res.status(401).json({
            success: false,
            message: 'Username atau password salah!'
        });
    }
});

server.use(router);
server.listen(3000, () => {
    console.log('JSON Server running on http://localhost:3000');
});

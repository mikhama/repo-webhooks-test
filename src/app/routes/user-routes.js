module.exports = (app, db) => {
    app.post('/users', async (req, res) => {
        const _id = req.body.id;
        const date = Date.now();
        const user = { _id, date };
        
        try {
            const result = await db.collection('tusers')
                .replaceOne(
                    { _id: { $eq: _id }},
                    { $set: user },
                    { upsert: true },
                );
            
            res.send(result);
        } catch (err) {
            console.log('Error: Cannot insert to database:', err.message);
            res.send(err);
        }
    });

    app.post('/repo', async (req, res) => {
        const { login } = req.body.sender || { login: 'unknown' };
        const date = Date.now();
        const _id = login;
        const user = { _id, date };

        console.log('User =>', login);
        console.log('Body =>', req.body);

        try {
            const result = await db.collection('tusers')
                .replaceOne(
                    { _id: { $eq: _id }},
                    { $set: user },
                    { upsert: true },
                );
            
            res.send(result);
        } catch (err) {
            console.log('Error: Cannot insert to database:', err.message);
            res.send(err);
        }
    });

    app.get('/user/:_id', async (req, res) => {
        const { _id } = req.params;

        try {
            const result = await db.collection('tusers')
                .findOne({ _id });
            
            res.send(result);
        } catch (err) {
            console.log('Error: Cannot find a user:', err.message);
            res.send(err);
        }
    });
};

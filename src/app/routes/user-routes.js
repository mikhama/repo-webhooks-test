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
};

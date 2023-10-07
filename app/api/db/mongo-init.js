db.createUser(
    {
        user: "user2",
        pwd: "Pa55w0rd",
        roles: [
            {
                role: "readWrite",
                db: "hradmin_system"
            }
        ]
    }
);

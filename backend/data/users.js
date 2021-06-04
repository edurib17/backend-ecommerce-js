import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Maria Silva',
        email: 'maria@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Eduardo Emanuel',
        email: 'eduardo@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users
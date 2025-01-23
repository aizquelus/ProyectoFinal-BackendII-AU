import bcrypt from 'bcrypt';

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, user) => {
    if (!password || !user) return;

    return bcrypt.compareSync(password, user.password);
}

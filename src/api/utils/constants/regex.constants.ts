export const regexList = {
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    nick: /^[A-Za-z][A-Za-z0-9_.]{3,19}$/,
    email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
};
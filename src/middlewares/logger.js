

export const logger = async (req, res, next) => {
    console.log(`${req.clientIp} : ${req.method} : ${req.url} : ${new Date().toLocaleTimeString()} `);
    next();
}
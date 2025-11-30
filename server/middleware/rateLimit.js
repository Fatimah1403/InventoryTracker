import redisClient from "../config/redisClient.js";

export const rateLimit = (key, limit, windowInSeconds) => {
    return async (req, res, next) => {
        try {
            const ip = req.ip;
            const redisKey = `rateLimit:${key}:${ip}`;
            const requests = await redisClient.get(redisKey);

            const count = requests ? parseInt(requests, 10) : 0;

            if (count === 1) {
                await redisClient.expire(redisKey, windowInSeconds);
            }

            if (count >= limit) {
                return res.status(429).json({
                    message: "Too many requests. Please try again later."
                });
            }

            
            if (count === 0) {
                await redisClient.setEx(redisKey, windowInSeconds, "1");
            } 
            
            else {
                await redisClient.incr(redisKey);
            }

            next();
        } catch (error) {
            console.error("Rate Limiting Error:", error);
            next(); 
        }
    };
};

import redisClient from "../config/redisClient";

export const rateLimit = (key, limit, windowInSeconds) => {
    return async (req, res, next) => {
        const ip = req.ip;
        try {
            const redisKey = `rateLimit:${key}:${ip}`;
            const requests = await redisClient.get(redisKey);

            if (current === 1) {
                await redisClient.expire(redisKey, windowInSeconds);
            }

            if (requests && requests > limit) {
                return res.status(429).json({ message: "Too many requests. Please try again later." });
            }
            if (!requests) {
                await redisClient.setEx(redisKey, windowInSeconds, 1);
            } else {
                await redisClient.incr(redisKey);
            }

            next();
        } catch (error) {
            console.error("Rate Limiting Error:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
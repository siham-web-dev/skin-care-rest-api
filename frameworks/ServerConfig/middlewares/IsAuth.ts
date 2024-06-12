const isAuthenticated = (req: any, res: any, next: any) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
};

export default isAuthenticated
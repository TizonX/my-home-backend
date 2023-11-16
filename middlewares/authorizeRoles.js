const express = require('express');



const authorizeRoles = (roles) => {
    try {
        return (req, res, next) => {
            const userRole = req.user.role;
            if (roles.includes(userRole)) {
                next();
            } else {
                return res.status(403).json({ error: 'Access denied, insufficient permissions' });
            }
        };
    } catch (error) {
        console.log("middleware role >>", error.message);
    }
};

module.exports = authorizeRoles;

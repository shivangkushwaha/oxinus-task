const accountService = require('../services/accountService');

exports.createAccount = async (req, res) => {
    try {
        const account = await accountService.createAccount(req.body);
        res.status(201).json(account);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAccounts = async (req, res) => {
    try {
        const { limit } = req.query;
        const accounts = await accountService.getAccounts(parseInt(limit, 10) || 10);
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAccountById = async (req, res) => {
    try {
        const account = await accountService.getAccountById(req.params.id);
        if (account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({ error: 'Account not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAccount = async (req, res) => {
    try {
        const account = await accountService.updateAccount(req.params.id, req.body);
        if (account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({ error: 'Account not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const account = await accountService.deleteAccount(req.params.id);
        if (account) {
            res.status(200).json({ message: 'Account deleted' });
        } else {
            res.status(404).json({ error: 'Account not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await accountService.login(email, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

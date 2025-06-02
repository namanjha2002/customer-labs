const Account = require('../model/account');
const Destination = require('../model/destination');

exports.createAccount = async (req, res) => {
  try {
    const { email, name, website } = req.body;

    // Regex patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const urlRegex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i;

    // Validation
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    if (!name || !nameRegex.test(name)) {
      return res.status(400).json({ success: false, message: 'Invalid name (only letters and spaces allowed)' });
    }

    if (website && !urlRegex.test(website)) {
      return res.status(400).json({ success: false, message: 'Invalid website URL format' });
    }


    const existingAccount = await Account.findOne({ email: email });
    if (existingAccount) {
      return res.status(409).json({ success: false, message: 'Email already in use' });
    }

    const newAccount = new Account({
      email,
      name,
      website
    });

    await newAccount.save();

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
 
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
exports.getAccountById = async (req, res) => {
    try {
      const account = await Account.findOne({ accountId: req.params.accountId });
  
      if (!account) {
        return res.status(404).json({ success: false, message: 'Account not found' });
      }
  
      res.status(200).json({
        success: true,
        data: account
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  exports.updateAccount = async (req, res) => {
    try {
      const { email, name, website } = req.body;
  
      const account = await Account.findOne({ accountId: req.params.accountId });
      if (!account) {
        return res.status(404).json({ success: false, message: 'Account not found' });
      }
  
      // Optional: Validate inputs if needed
      if (email) account.email = email;
      if (name) account.name = name;
      if (website) account.website = website;
  
      await account.save();
  
      res.status(200).json({
        success: true,
        message: 'Account updated successfully',
        data: account
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
 

exports.deleteAccount = async (req, res) => {
  try {
    const account = await Account.findOneAndDelete({ accountId: req.params.accountId });

    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }

    // Delete all destinations associated with this account
    await Destination.deleteMany({ accountId: account.accountId });

    res.status(200).json({
      success: true,
      message: 'Account and its destinations deleted successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = exports;


// controllers/destinationController.js
const Destination = require('../model/destination');
const Account = require('../model/account');

exports.createDestination = async (req, res) => {
  try {
    const { accountId, url, method, headers } = req.body;
let checkAccount = await Account.find({accountId:accountId})
if(!checkAccount){
    return res.status(200).json({
        success :true,
        message: "wrong accountId"
    })
}
    // Basic validations
    if (!accountId || !url || !method || !headers || typeof headers !== 'object') {
      return res.status(400).json({ success: false, message: 'All fields are required and headers must be an object' });
    }

    const validMethods = ['GET', 'POST', 'PUT'];
    if (!validMethods.includes(method.toUpperCase())) {
      return res.status(400).json({ success: false, message: 'Invalid HTTP method' });
    }

    const newDestination = new Destination({
      accountId,
      url,
      method: method.toUpperCase(),
      headers
    });

    await newDestination.save();

    res.status(201).json({
      success: true,
      message: 'Destination created successfully',
      data: newDestination
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getDestinationsByAccount = async (req, res) => {
  try {
    const { accountId } = req.params;

    const destinations = await Destination.find({ accountId }).select('-headers');

    res.status(200).json({
      success: true,
      data: destinations
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.updateDestination = async (req, res) => {
  try {
    const { url, method, headers } = req.body;
    const { id } = req.params;

    const updated = await Destination.findByIdAndUpdate(
      id,
      {
        ...(url && { url }),
        ...(method && { method: method.toUpperCase() }),
        ...(headers && { headers })
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Destination updated successfully',
      data: updated
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Destination.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Destination deleted successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const ContactUs = require('../modals/contactus.modal.js');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js');

// Create and Save a new ContactUs
const sendContactUs = catchAsyncErrors(async (req, res) => {
    const requestBodyObject = req.body;

    if (!requestBodyObject.name || !requestBodyObject.email || !requestBodyObject.subject || !requestBodyObject.message) {
        return next(new ErrorHandler("Please enter all the data", 400));
    }

    const contactUs = await ContactUs.create(requestBodyObject);
    if (!contactUs) {
        return next(new ErrorHandler("Unable to send message", 500));
    }

    res.status(201).json({
        success: true,
        message: "ContactUs sent successfully",
        contactUs,
    });
});

module.exports = { sendContactUs };
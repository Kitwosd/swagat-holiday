const asyncHandler = require('../utils/asyncHandler');
const cloudinary = require('../config/cloudinary');

/**
 * @desc    Upload an image to Cloudinary (used by Admin Dashboard)
 * @route   POST /api/upload
 * @access  Private/Admin
 */
const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No image file uploaded.',
    });
  }

  // Upload buffer to Cloudinary using upload_stream
  const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'travels',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(fileBuffer);
    });
  };

  try {
    const result = await uploadToCloudinary(req.file.buffer);

    return res.status(200).json({
      success: true,
      message: 'Image uploaded successfully.',
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to upload image to Cloudinary.',
      error: error.message,
    });
  }
});

module.exports = {
  uploadImage,
};

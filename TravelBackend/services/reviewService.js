const { Review } = require('../models');

class ReviewService {
  async getAllReviews() {
    return await Review.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  async getReviewById(id) {
    return await Review.findByPk(id);
  }

  async createReview(data) {
    return await Review.create(data);
  }

  async updateReview(id, data) {
    const review = await Review.findByPk(id);
    if (!review) return null;
    await review.update(data);
    return review;
  }

  async deleteReview(id) {
    const review = await Review.findByPk(id);
    if (!review) return false;
    await review.destroy();
    return true;
  }
}

module.exports = new ReviewService();

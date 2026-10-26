const { Op } = require('sequelize');
const { Activity } = require('../models');

class ActivityService {
  async getAllActivities() {
    return await Activity.findAll({
      order: [['tier', 'ASC'], ['createdAt', 'ASC']],
    });
  }

  async getActivityByIdOrSlug(idOrSlug) {
    return await Activity.findOne({
      where: {
        [Op.or]: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
    });
  }

  async createActivity(data) {
    if (!data.id) {
      data.id = data.slug || `activity-${Date.now()}`;
    }
    if (!data.slug && data.title) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }
    if (!data.redirectUrl) {
      data.redirectUrl = `/activities/${data.slug || data.id}`;
    }
    return await Activity.create(data);
  }

  async updateActivity(idOrSlug, data) {
    const activity = await this.getActivityByIdOrSlug(idOrSlug);
    if (!activity) return null;
    await activity.update(data);
    return activity;
  }

  async deleteActivity(idOrSlug) {
    const activity = await this.getActivityByIdOrSlug(idOrSlug);
    if (!activity) return false;
    await activity.destroy();
    return true;
  }
}

module.exports = new ActivityService();

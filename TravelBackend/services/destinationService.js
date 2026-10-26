const { Op } = require('sequelize');
const { Destination } = require('../models');

class DestinationService {
  async getAllDestinations() {
    return await Destination.findAll({
      order: [['createdAt', 'ASC']],
    });
  }

  async getDestinationByIdOrSlug(idOrSlug) {
    return await Destination.findOne({
      where: {
        [Op.or]: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
    });
  }

  async createDestination(data) {
    if (!data.id) {
      data.id = data.slug || `dest-${Date.now()}`;
    }
    if (!data.slug && data.name) {
      data.slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }
    return await Destination.create(data);
  }

  async updateDestination(idOrSlug, data) {
    const destination = await this.getDestinationByIdOrSlug(idOrSlug);
    if (!destination) return null;
    await destination.update(data);
    return destination;
  }

  async deleteDestination(idOrSlug) {
    const destination = await this.getDestinationByIdOrSlug(idOrSlug);
    if (!destination) return false;
    await destination.destroy();
    return true;
  }
}

module.exports = new DestinationService();

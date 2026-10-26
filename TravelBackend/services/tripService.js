const { Op } = require('sequelize');
const { Trip } = require('../models');

class TripService {
  /**
   * Get all trips with optional filtering and search
   */
  async getAllTrips(filters = {}) {
    const where = {};

    if (filters.category && filters.category !== 'all') {
      where.category = filters.category;
    }

    if (filters.region) {
      where.region = { [Op.like]: `%${filters.region}%` };
    }

    if (filters.regionSlug) {
      where.regionSlug = filters.regionSlug;
    }

    if (filters.featured !== undefined) {
      where.featured = filters.featured === 'true' || filters.featured === true;
    }

    if (filters.search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${filters.search}%` } },
        { region: { [Op.like]: `%${filters.search}%` } },
        { overview: { [Op.like]: `%${filters.search}%` } },
      ];
    }

    return await Trip.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });
  }

  /**
   * Find trip by ID or Slug
   */
  async getTripByIdOrSlug(idOrSlug) {
    return await Trip.findOne({
      where: {
        [Op.or]: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
    });
  }

  /**
   * Create a new trip
   */
  async createTrip(tripData) {
    // Generate an ID if not provided
    if (!tripData.id) {
      tripData.id = tripData.slug || `trip-${Date.now()}`;
    }
    // Generate slug if not provided
    if (!tripData.slug && tripData.title) {
      tripData.slug = tripData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }
    return await Trip.create(tripData);
  }

  /**
   * Update an existing trip
   */
  async updateTrip(idOrSlug, updateData) {
    const trip = await this.getTripByIdOrSlug(idOrSlug);
    if (!trip) {
      return null;
    }
    await trip.update(updateData);
    return trip;
  }

  /**
   * Delete a trip
   */
  async deleteTrip(idOrSlug) {
    const trip = await this.getTripByIdOrSlug(idOrSlug);
    if (!trip) {
      return false;
    }
    await trip.destroy();
    return true;
  }
}

module.exports = new TripService();

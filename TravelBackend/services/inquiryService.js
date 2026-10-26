const { Inquiry } = require('../models');

class InquiryService {
  async getAllInquiries(filters = {}) {
    const where = {};
    if (filters.type) {
      where.type = filters.type;
    }
    if (filters.status) {
      where.status = filters.status;
    }

    return await Inquiry.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });
  }

  async getInquiryById(id) {
    return await Inquiry.findByPk(id);
  }

  async createInquiry(data) {
    return await Inquiry.create(data);
  }

  async updateInquiryStatus(id, status) {
    const inquiry = await Inquiry.findByPk(id);
    if (!inquiry) return null;
    await inquiry.update({ status });
    return inquiry;
  }

  async deleteInquiry(id) {
    const inquiry = await Inquiry.findByPk(id);
    if (!inquiry) return false;
    await inquiry.destroy();
    return true;
  }
}

module.exports = new InquiryService();

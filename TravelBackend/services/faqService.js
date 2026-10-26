const { Faq } = require('../models');

class FaqService {
  async getAllFaqs() {
    return await Faq.findAll({
      order: [['orderIndex', 'ASC'], ['id', 'ASC']],
    });
  }

  async getFaqById(id) {
    return await Faq.findByPk(id);
  }

  async createFaq(data) {
    return await Faq.create(data);
  }

  async updateFaq(id, data) {
    const faq = await Faq.findByPk(id);
    if (!faq) return null;
    await faq.update(data);
    return faq;
  }

  async deleteFaq(id) {
    const faq = await Faq.findByPk(id);
    if (!faq) return false;
    await faq.destroy();
    return true;
  }
}

module.exports = new FaqService();

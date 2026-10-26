const { SiteContent } = require('../models');

class SiteContentService {
  async getAllContent() {
    const list = await SiteContent.findAll();
    const contentMap = {};
    list.forEach((item) => {
      contentMap[item.key] = item.data;
    });
    return contentMap;
  }

  async getContentByKey(key) {
    const item = await SiteContent.findOne({ where: { key } });
    return item ? item.data : null;
  }

  async upsertContent(key, data) {
    let [item, created] = await SiteContent.findOrCreate({
      where: { key },
      defaults: { key, data },
    });

    if (!created) {
      // Merge or replace
      const merged = typeof data === 'object' && !Array.isArray(data)
        ? { ...item.data, ...data }
        : data;
      await item.update({ data: merged });
    }

    return item.data;
  }
}

module.exports = new SiteContentService();

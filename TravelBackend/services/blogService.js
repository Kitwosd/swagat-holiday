const { Op } = require('sequelize');
const { BlogPost } = require('../models');

class BlogService {
  async getAllPosts() {
    return await BlogPost.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  async getPostByIdOrSlug(idOrSlug) {
    const isNumeric = !isNaN(Number(idOrSlug));
    const where = isNumeric
      ? { [Op.or]: [{ id: idOrSlug }, { slug: idOrSlug }] }
      : { slug: idOrSlug };

    return await BlogPost.findOne({ where });
  }

  async createPost(data) {
    if (!data.slug && data.title) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }
    return await BlogPost.create(data);
  }

  async updatePost(idOrSlug, data) {
    const post = await this.getPostByIdOrSlug(idOrSlug);
    if (!post) return null;
    await post.update(data);
    return post;
  }

  async deletePost(idOrSlug) {
    const post = await this.getPostByIdOrSlug(idOrSlug);
    if (!post) return false;
    await post.destroy();
    return true;
  }
}

module.exports = new BlogService();

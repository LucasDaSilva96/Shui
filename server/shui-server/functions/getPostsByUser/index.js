const { sendResponse, sendError } = require('../../lib/responses');
const { db } = require('../../services/db');

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const { username } = body;

  try {
    if (!username) {
      throw new Error('Missing username');
    }

    const params = {
      TableName: 'post-db',
    };

    const data = await db.scan(params);

    if (!data || !data.Items) {
      throw new Error('Post not found');
    }

    const filteredPosts = data.Items.filter(
      (post) => post.username === username
    );

    const response = {
      message: 'Posts found successfully',
      posts: filteredPosts,
    };

    return sendResponse(response);
  } catch (error) {
    return sendError(500, error.message);
  }
};

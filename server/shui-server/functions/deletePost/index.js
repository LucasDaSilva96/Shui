const { sendError, sendResponse } = require('../../lib/responses');
const { db } = require('../../services/db');

exports.handler = async (event) => {
  const id = event.pathParameters.id;

  try {
    if (!id) {
      throw new Error('Missing id field');
    }

    const params = {
      TableName: 'post-db',
      Key: { id },
    };

    const item = await db.get(params);

    if (!item || !item.Item) {
      throw new Error('Post not found');
    }

    await db.delete(params);

    const response = {
      message: 'Post deleted successfully',
    };

    return sendResponse(response);
  } catch (error) {
    return sendError(500, error.message);
  }
};

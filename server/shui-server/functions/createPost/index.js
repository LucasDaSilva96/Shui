const { sendError, sendResponse } = require('../../lib/responses');
const { db } = require('../../services/db');
const { v4 } = require('uuid');

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  try {
    const { username, text } = body;
    if (!username || !text) {
      throw new Error('Missing required fields');
    }

    const newPost = {
      id: v4(),
      username,
      text,
      createdAt: new Date().toISOString(),
    };

    await db.put({
      TableName: 'post-db',
      Item: newPost,
    });

    const response = {
      message: 'Post created successfully',
      post: newPost,
    };

    return sendResponse(response);
  } catch (error) {
    return sendError(500, error.message);
  }
};

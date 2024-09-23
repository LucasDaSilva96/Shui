const { sendResponse, sendError } = require('../../lib/responses');
const { db } = require('../../services/db');

exports.handler = async () => {
  const params = {
    TableName: 'post-db',
  };

  try {
    const data = await db.scan(params);

    return sendResponse({
      posts: data.Items,
    });
  } catch (error) {
    return sendError(500, error.message);
  }
};

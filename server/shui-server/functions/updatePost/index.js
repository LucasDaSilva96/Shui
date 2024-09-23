const { sendError, sendResponse } = require('../../lib/responses');
const { db } = require('../../services/db');

exports.handler = async (event) => {
  const id = event.pathParameters.id;
  const body = JSON.parse(event.body);

  try {
    const { text, username } = body;

    if (!id) {
      throw new Error('Missing id field');
    }

    const item = await db.get({
      TableName: 'post-db',
      Key: { id },
    });

    if (!item || !item.Item) {
      throw new Error('Post not found');
    }

    if (text) {
      const params = {
        TableName: 'post-db',
        Key: { id },
        UpdateExpression: 'set #text = :text',
        ExpressionAttributeNames: {
          '#text': 'text',
        },
        ExpressionAttributeValues: {
          ':text': text,
        },
      };
      await db.update(params);
    }

    if (username) {
      const params = {
        TableName: 'post-db',
        Key: { id },
        UpdateExpression: 'set #username = :username',
        ExpressionAttributeNames: {
          '#username': 'username',
        },
        ExpressionAttributeValues: {
          ':username': username,
        },
      };
      await db.update(params);
    }

    item.Item.updatedAt = new Date().toISOString();

    const params = {
      TableName: 'post-db',
      Key: { id },
      UpdateExpression: 'set #updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#updatedAt': 'updatedAt',
      },
      ExpressionAttributeValues: {
        ':updatedAt': item.Item.updatedAt,
      },
    };

    await db.update(params);

    const response = {
      message: 'Post updated successfully',
      post: {
        ...item.Item,
        text: text ? text : item.Item.text,
        username: username ? username : item.Item.username,
        updatedAt: item.Item.updatedAt,
      },
    };

    return sendResponse(response);
  } catch (error) {
    return sendError(500, error.message);
  }
};

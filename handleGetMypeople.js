'use strict';

const dynamoose = require('dynamoose');

const schmea = new dynamoose.Schema({id: String, name: String, age: Number });

const peopleModel = dynamoose.model('people', schmea );

exports.handler = async (event) => {
  console.log('++++', event.body);
    // TODO implement
    const response = {
      statusCode: null,
      body: null
    };
    
  console.log(event.pathParameters, "PATH PARAM");
  try {
    const id = event.pathParameters?.id;
    let results;
    if (id) {
      const list = await peopleModel.query("id").eq(id).exec();
      results = list[0];
    } else {
      results = await peopleModel.scan().exec();
    }
    response.statusCode = 200;
    response.body = JSON.stringify(results);
  } catch (e) {
    response.statusCode = 500;
    response.body = JSON.stringify(e.message);
  }
  return response;
  };
  
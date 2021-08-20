
/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
var AWS = require("aws-sdk");

AWS.config.update({
    region: "eu-central-1",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Blog-Posts";

var createdBy = "some@mail.org";
var title = "The 5 Big New Movies";

var params = {
    TableName:table,
    Item:{
        "createdBy": createdBy,
        "title": title,
        "info":{
            "subtitle": "",
            "tags": ["Big Stars", "Bollywood"],
            "body": "Some actual content",
            "comments": [{
                "commentor": "člkajsdfHlkjačlsdfjashd",
                "comment": "člkajsdfHlkjačlsdfjashd"
            }]
        }
    },
    //used to get a return value; otherwise the data value is an empty object
    ReturnValues: 'ALL_OLD'
};

console.log("Adding a new item...");
docClient.put(params, function (err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", data);
    }
});

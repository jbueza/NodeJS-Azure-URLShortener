
/*var azure     = require("azure")
  , uuid      = require("node-uuid")
  , client    = azure.createTableService()
  , tableName = "abcUrls";

var url = function() {};
url.insert = function(request, response) {

    console.error(request);
    var item = request.body.item;
    item.RowKey = uuid();
    item.PartitionKey = 'Partition1';
    item.DateCreated = new Date().getTime();

    self.client.insertEntity(tableName, item, function (error) {
      if(error) throw error; 
      
    });    
};

url.search = function search(request, response) {
    console.error("SEARCH!");
};



exports = module.exports = url;*/
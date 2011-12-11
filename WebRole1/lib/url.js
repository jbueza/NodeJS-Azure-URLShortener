var azure   = require("azure")
  , uuid    = require("node-uuid")
  , client  = azure.createTableService();

var url = function(options) {
    
};

url.insert = function insert(record) {
  var self = this;
  var createItem = function (resp, tasklist) {
      if (!tasklist) {
          tasklist = [];
      }

      var count = tasklist.length;

      var item = req.body.item;
      item.RowKey = uuid();
      item.PartitionKey = 'partition1';
      item.completed = false;

      self.client.insertEntity('tasks', item, function (error) {
          if(error){  
              throw error;
          }
          self.showItems(req, res);
      });
  };
};

url.search = function search(params) {
  

};

exports = url;
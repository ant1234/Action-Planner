
// Create a collection for tasks in mongodb
Tasks = new Mongo.Collection('tasks');

if (Meteor.isClient) {

  Template.body.helpers({

    // Get all of the tasks from the database 
    // & return them to the view
    tasks: function(){
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  }); // Close helper

  Template.body.events({
    "submit .new-task": function (event) {

      // Prevent default browser form submit 
      event.preventDefault();

      // Insert a task into the collection
      var text = event.target.text.value;

      Tasks.insert({
        text: text,
        createdAt: new Date() // current time
      });

      // Clear form once task has been submitted
      event.target.text.value = "";

    }
  }); // Close events

  Template.task.events({
    // Set the checked property to the opposite 
    // of it's current value
    "click .toggle-checked": function() {
    Tasks.update(this._id, {
      $set: {checked: ! this.checked}
    });
    }, 
    "click .delete": function() {
      Tasks.remove(this._id);
    }
  });

}
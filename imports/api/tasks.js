import { Mongo } from 'meteor/mongo';
 import { Meteor } from 'meteor/meteor';
 import { check } from 'meteor/check';


export const Tasks = new Mongo.Collection('tasks');

export const Counters = new Mongo.Collection('counters');


Meteor.methods({
  'tasks.insert' (text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'tasks.remove' (taskId) {
    check(taskId, String);
 
    Tasks.remove(taskId);
  },
  'tasks.setChecked' (taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
 
    Tasks.update(taskId, {
      $set: {
        checked: setChecked
      }
    });
  },

  'counters.add' (number) {
    check(number, String);
 
    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 console.log(number+' '+Meteor.userId()+' '+Meteor.user().username);
    Counters.insert({
      number,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
});
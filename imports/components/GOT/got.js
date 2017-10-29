import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './got.html';
 import { Counters } from '../../api/tasks.js';
import { Meteor } from 'meteor/meteor';

class gotCtrl {
  constructor($scope) {
    
    $scope.viewModel(this);

  //this.hideCompleted = false;

    this.helpers({
      counters() {

         const selector = {};
 
        // // If hide completed is checked, filter tasks
        // if (this.getReactively('hideCompleted')) {
        //   selector.checked = {
        //     $ne: true
        //   };
        // }
        // Show newest tasks at the top
           return Counters.find({}, {
          sort: {
            createdAt: -1
          }
        });
      },
      incompleteCount() {
        return Counters.find({
         
        }).count();
       },
      currentUser() {
        return Meteor.user();
      }
    })
  }

      addCounter(newCounter) {
          // Insert a task into the collection
          Meteor.call('counters.add', newCounter);
          // Clear form
          this.newTask = 0;
        }
    // setChecked(task) {
    //     // Set the checked property to the opposite of its current value
    //      Meteor.call('tasks.setChecked', task._id, !task.checked);
    //   }
    
    //   removeTask(task) {
    //    Meteor.call('tasks.remove', task._id);
    //   }
}
 
export default angular.module('got', [
  angularMeteor
])
  .component('got', {
    templateUrl: 'imports/components/GOT/got.html',
      controller: ['$scope', gotCtrl]
  });
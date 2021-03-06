'use strict';

const listEvents = require('../../database-helpers/elasticsearch/list-events');

module.exports = function (request, reply) {

  const day = new Date( request.params.year + '-' + request.params.month + '-' + request.params.day ).getTime()
  const tomorrow = new Date( request.params.year + '-' + request.params.month + '-' + (parseInt(request.params.day) + 1) ).getTime()

  listEvents(function(err, events) {

    const result = events.filter(event => {return (day <= event.dateTimestamp) && (event.dateTimestamp <= tomorrow) })
    return reply(result);
  })

}

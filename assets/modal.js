$(function() {
  var votesBarChart;
  var postsTemplate = Handlebars.compile($("#posts-template").html());
  var monthLabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  $('svg text').click(openModal);

  function openModal(e) {
    phcloud.index.search($(e.currentTarget).text(), searchCallback);
  }

  function searchCallback(err, res) {
    if (err) {
      return err;
    }

    $('.modal').modal('show')
      .find('.modal-title')
      .text(toTitleCase(res.query));

    drawVotesBarChart(res.hits);
    rednerPosts(res.hits);
  }

  function drawVotesBarChart(posts) {
    var data, count, ctx;

    if (votesBarChart) {
      votesBarChart.destroy();
    }

    count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    _.each(posts, function(p) {
      count[dayToMonth(p.day)] += p.votes_count;
    });


    data = {
      labels: monthLabels,
      datasets: []
    };

    _.each(posts, function(p, i) {
      var votes, set;
      votes = [null, null, null, null, null, null, null, null, null, null, null, null];
      votes[dayToMonth(p.day)] = p.votes_count;
      set = {
        label: p.name,
        fillColor: phcloud.color(i, 0.5),
        strokeColor: phcloud.color(i, 0.8),
        highlightFill: phcloud.color(i, 0.75),
        highlightStroke: phcloud.color(i, 1),
        data: votes
      }

      data.datasets.push(set);
    });

    ctx = document.getElementById("votes-bar-chart").getContext("2d");
    votesBarChart = new Chart(ctx).StackedBar(data, {
      multiTooltipTemplate: "<%= datasetLabel %>: <%= value %>"
    });
  }

  function rednerPosts(posts) {
    var html = postsTemplate({
      posts: posts
    });
    $('.posts').replaceWith(html);
  }

  //--- Helpers ---//

  // Given, 2015-03-30, returns 2.
  function dayToMonth(day) {
    return (new Date(day)).getMonth();
  }

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

});
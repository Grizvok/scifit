function chartChest() {
  $('.chart-menu').removeClass('menu-active');
  $('.chest-menu').addClass('menu-active');

    $.get('http://localhost:8000/dashboard/chestdata', 
    {paramOne: 15, paramTwo: 2},
      function(data) {
    

    var chestData = [];
    var dateData = [];
    data.forEach(function(currentValue, index) {
      chestData.push(data[index].chest);
      dateData.push(moment(data[index].date).format('MM/DD/YYYY'));
    });
    
    var ctx = $('#myChart');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dateData,
        datasets: [{
          label: 'Chest Circumference (inches)',
          data: chestData,
          fill: false,
          borderColor: [
            'rgba(255,99,132,1)'

          ],
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

  });
}



function chartBicep() {
    $('.chart-menu').removeClass('menu-active');
    $('.bicep-menu').addClass('menu-active');
    $.get('http://localhost:8000/dashboard/bicepdata', function(data) {

    var bicepData = [];
    var dateData = [];
    data.forEach(function(currentValue, index) {
      bicepData.push(data[index].bicep);
      dateData.push(moment(data[index].date).format('MM/DD/YYYY'));
    });

    var ctx = $('#myChart');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dateData,
        datasets: [{
          label: 'Bicep Circumference (inches)',
          data: bicepData,
          fill: false,
          borderColor: [
            'rgba(255,99,132,1)'

          ],
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

  });
}

function chartWaist() {
    $('.chart-menu').removeClass('menu-active');
    $('.waist-menu').addClass('menu-active');
    $.get('http://localhost:8000/dashboard/waistdata', function(data) {

    var waistData = [];
    var dateData = [];
    data.forEach(function(currentValue, index) {
      waistData.push(data[index].waist);
      dateData.push(moment(data[index].date).format('MM/DD/YYYY'));
    });

    var ctx = $('#myChart');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dateData,
        datasets: [{
          label: 'Waist Circumference (inches)',
          data: waistData,
          fill: false,
          borderColor: [
            'rgba(255,99,132,1)'

          ],
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  });
}

function chartHip() {
    $('.chart-menu').removeClass('menu-active');
    $('.hip-menu').addClass('menu-active');
    $.get('http://localhost:8000/dashboard/hipdata', function(data) {

    var hipData = [];
    var dateData = [];
    data.forEach(function(currentValue, index) {
      hipData.push(data[index].hip);
      dateData.push(moment(data[index].date).format('MM/DD/YYYY'));
    });

    var ctx = $('#myChart');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dateData,
        datasets: [{
          label: 'Hip Circumference (inches)',
          data: hipData,
          fill: false,
          borderColor: [
            'rgba(255,99,132,1)'

          ],
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  });
}

function chartThigh() {
    $('.chart-menu').removeClass('menu-active');
    $('.thigh-menu').addClass('menu-active');
    $.get('http://localhost:8000/dashboard/thighdata', function(data) {

    var thighData = [];
    var dateData = [];
    data.forEach(function(currentValue, index) {
      thighData.push(data[index].thigh);
      dateData.push(moment(data[index].date).format('MM/DD/YYYY'));
    });

    var ctx = $('#myChart');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dateData,
        datasets: [{
          label: 'Thigh Circumference (inches)',
          data: thighData,
          fill: false,
          borderColor: [
            'rgba(255,99,132,1)'

          ],
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  });
}

$(document).keydown(function(e) { 
  console.log(e.keyCode);
    if (e.keyCode == 27) { 
      $('.modal').close();
      } 
});

$(function() {
  $('.addnewdata').on('click', function() {
    $('.modal').addClass('active');
     });
  });

$(function() {
  chartChest();
  $('.chest-menu').on('click', function() {
    chartChest();
  });
  $('.bicep-menu').on('click', function() {
    chartBicep();
  });
  $('.waist-menu').on('click', function() {
    chartWaist();
  });
  $('.hip-menu').on('click', function() {
    chartHip();
  });
  $('.thigh-menu').on('click', function() {
    chartThigh();
  });
});




$(function() {
  $('.chest').on('focus', function() {
    $('.chest-line').fadeIn(500);
  });
  $('.chest').on('blur', function() {
    $('.chest-line').fadeOut(500);
  });
  $('.bicep').on('focus', function() {
    $('.bicep-line').fadeIn(500);
  });
  $('.bicep').on('blur', function() {
    $('.bicep-line').fadeOut(500);
  });
  $('.waist').on('focus', function() {
    $('.waist-line').fadeIn(500);
  });
  $('.waist').on('blur', function() {
    $('.waist-line').fadeOut(500);
  });
  $('.hip').on('focus', function() {
    $('.hip-line').fadeIn(500);
  });
  $('.hip').on('blur', function() {
    $('.hip-line').fadeOut(500);
  });
  $('.thigh').on('focus', function() {
    $('.thigh-line').fadeIn(500);
  });
  $('.thigh').on('blur', function() {
    $('.thigh-line').fadeOut(500);
  });
});

$(function() {
  var $chest = $('.chest');
  var $chestForm = $('.chest-form');
  $chest.blur(function() {
    $chestForm.submit();
  });
  $chestForm.submit(function(event) {
    event.preventDefault();
    var data = {
      chest: $chest.val()
    };
    var current = Number($chest.val());
    $chest.val('');
    if (current > 15 && current < 120) {
      $('.current-chest').text(current);
      $.post('http://localhost:8000/dashboard/chest', data, function(resp) {
        chartChest();
    });
    }
    });
});

$(function() {
  var $bicep = $('.bicep');
  var $bicepForm = $('.bicep-form');
  $bicep.blur(function() {
    $bicepForm.submit();
  });
  $bicepForm.submit(function(event) {
    event.preventDefault();
    var data = {
      bicep: $bicep.val()
    };
    var current = Number($bicep.val());
    $bicep.val('');
    if (current > 5 && current < 30) {
      $('.current-bicep').text(current); 
      $.post('http://localhost:8000/dashboard/bicep', data, function(resp) {
        chartBicep();
     });
    }
    });
});

$(function() {  
  var $waist = $('.waist');
  var $waistForm = $('.waist-form');
  $waist.blur(function() {
    $waistForm.submit();
  });
  $waistForm.submit(function(event) {
    event.preventDefault(); 
    var data = {
      waist: $waist.val()
    };
    var current = Number($waist.val());
    $waist.val('');
    if (current > 10 && current < 70) {
      $('.current-waist').text(current);
          $.post('http://localhost:8000/dashboard/waist', data, function(resp) {
            chartWaist();
     });
    }
  });
});

$(function() {
  var $hip = $('.hip');
  var $hipForm = $('.hip-form');
  $hip.blur(function() {
    $hipForm.submit();
  });
    $hipForm.submit(function(event) {
    event.preventDefault();
    var data = {
      hip: $hip.val()
    };
    var current = Number($hip.val());
    $hip.val('');
    if (current > 10 && current < 100) {
      $('.current-hip').text(current);
        $.post('http://localhost:8000/dashboard/hip', data, function(resp) {
          chartHip();
     });
    }
  });
});

$(function() {
  var $thigh = $('.thigh');
  var $thighForm = $('.thigh-form');
  $thigh.blur(function() {
    $thighForm.submit();
    });
  $thighForm.submit(function(event) {
    event.preventDefault(); 
    var data = {
      thigh: $thigh.val()
    };
    var current = Number($thigh.val());
    $thigh.val('');
    if (current > 3 && current < 60) {
      $('.current-thigh').text(current);
        $.post('http://localhost:8000/dashboard/thigh', data, function(resp) {
          chartThigh();
     });
    }
   });
 });
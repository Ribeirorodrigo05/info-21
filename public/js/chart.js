google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Meses', 'Sales', 'Expenses'],
          ['Janeiro',  1000,      400],
          ['Fevereiro',  1170,      460],
          ['Março',  660,       1120],
          ['Abril',  1030,      540],
          ['Maio',  660,       1120],
          ['Junho',  660,       1120],
          ['Julho',  660,       1120],
          ['Agosto',  660,       1120],
          ['Setembro',  660,       1120],
          ['Outubro',  660,       1120],
          ['Novembro',  660,       1120],
          ['Dezembro',  660,       1120],

        ]);

        var options = {
          title: 'Gráfico de vendas ',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
      }
export const donught_previous_month = {
  labels: ['FUEL', 'OTHER', 'EQUIPMENT', 'MANPOWER', 'MATERIAL'],
  datasets: [
    {
      label: 'Previous Months',
      data: [19, 0, 34, 11, 36],
      backgroundColor: [
        'yellow',
        'green',
        'blue',
        'grey',
        'orange',
      
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1,
    },
  ],
};

export const donught_this_month = {
    labels: ['FUEL', 'OTHER', 'EQUIPMENT', 'MANPOWER', 'MATERIAL'],
    datasets: [
      {
        label: 'This Month ',
        data: [6, 0, 13, 8, 73],
        backgroundColor: [
          'yellow',
          'green',
          'blue',
          'grey',
          'orange',
        
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };


  export const donught_todate = {
    labels: ['FUEL', 'OTHER', 'EQUIPMENT', 'MANPOWER', 'MATERIAL'],
    datasets: [
      {
        label: 'Todate',
        data: [14, 0, 26, 10, 50],
        backgroundColor: [
          'yellow',
          'green',
          'blue',
          'grey',
          'orange',
        
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  export const dualData = {
    labels: ['previous Month', 'This Month', 'Todate'],
    datasets: [
      {
        label: 'INCOME',
        data: [327113087.23, 210568250.00, 537681337.23],
        backgroundColor: 'blue',
        stack: 'Stack 1',
      },
      {
        label: 'EXPENSE',
        data: [326462028.00, 199133600.00, 525595628.00],
        backgroundColor: 'orange',
        stack: 'Stack 2',
      },
    //   {
    //     label: '# of Green Votes',
    //     data: [3, 10, 13, 15, 22, 30],
    //     backgroundColor: 'rgb(75, 192, 192)',
    //     stack: 'Stack 3',
    //   },
    ],
  };
  
import axios from "axios";
export const donught_previous_month = {
  labels: ["FUEL", "OTHER", "EQUIPMENT", "MANPOWER", "MATERIAL"],
  datasets: [
    {
      label: "Previous Months",
      data: [19, 0, 34, 11, 36],
      backgroundColor: ["yellow", "green", "blue", "grey", "orange"],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const donught_this_month = {
  labels: ["FUEL", "OTHER", "EQUIPMENT", "MANPOWER", "MATERIAL"],
  datasets: [
    {
      label: "This Month ",
      data: [6, 0, 13, 8, 73],
      backgroundColor: ["yellow", "green", "blue", "grey", "orange"],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const gData = (label, data) => ({
  labels: ["FUEL", "OTHER", "EQUIPMENT", "MANPOWER", "MATERIAL"],
  datasets: [
    {
      label: label,
      data: data,
      backgroundColor: ["yellow", "green", "blue", "grey", "orange"],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
});

export const dualData = (income, expense) => ({
  labels: ["previous Month", "This Month", "Todate"],
  datasets: [
    {
      label: "INCOME",
      data: income,
      backgroundColor: "blue",
      stack: "Stack 1",
    },
    {
      label: "EXPENSE",
      data: expense,
      backgroundColor: "orange",
      stack: "Stack 2",
    },
    //   {
    //     label: '# of Green Votes',
    //     data: [3, 10, 13, 15, 22, 30],
    //     backgroundColor: 'rgb(75, 192, 192)',
    //     stack: 'Stack 3',
    //   },
  ],
});
export const CharD = (project, token) => {
  var size;
  var fuel = 0.0,
    equipment = 0.0,
    material = 0.0,
    manpower = 0.0,
    other;
  return axios
    .post(
      "https://www.nrwlpms.com/api/api/report/dashbord_report_quantity_surveyor.php",
      {
        project_id: project,
        jwt: token,
      }
    )
    .then((response) => {
      const totalPre =
        response.data["total report"]["total previous months fuel expence"] +
        response.data["total report"][
          "total previous month equipment expence"
        ] +
        response.data["total report"]["total previous month employee expence"] +
        response.data["total report"]["total previous month material expence"];
      const totalThis =
        response.data["total report"]["total this months fuel expence"] +
        response.data["total report"]["total this month equipment expence"] +
        response.data["total report"]["total this month employee expence"] +
        response.data["total report"]["total this month material expence"];
      const totalTodate =
        response.data["total report"]["total todate fuel expence"] +
        response.data["total report"]["total todate equipment expence"] +
        response.data["total report"]["total todate employee expence"] +
        response.data["total report"]["total todate material expence"];
      const pre = Object.values({
        fuel:
          (response.data["total report"]["total previous months fuel expence"] /
            totalPre) *
          100,
        other: 0,
        equipment:
          (response.data["total report"][
            "total previous month equipment expence"
          ] /
            totalPre) *
          100,
        manpower:
          (response.data["total report"][
            "total previous month employee expence"
          ] /
            totalPre) *
          100,
        material:
          (response.data["total report"][
            "total previous month material expence"
          ] /
            totalPre) *
          100,
      });
      const thi_s = Object.values({
        fuel:
          (response.data["total report"]["total this months fuel expence"] /
            totalThis) *
          100,
        other: 0,
        equipment:
          (response.data["total report"]["total this month equipment expence"] /
            totalThis) *
          100,
        manpower:
          (response.data["total report"]["total this month employee expence"] /
            totalThis) *
          100,
        material:
          (response.data["total report"]["total this month material expence"] /
            totalThis) *
          100,
      });
      const todate = Object.values({
        fuel:
          (response.data["total report"]["total todate fuel expence"] /
            totalTodate) *
          100,
        other: 0,
        equipment:
          (response.data["total report"]["total todate equipment expence"] /
            totalTodate) *
          100,
        manpower:
          (response.data["total report"]["total todate employee expence"] /
            totalTodate) *
          100,
        material:
          (response.data["total report"]["total todate material expence"] /
            totalTodate) *
          100,
      });

      return {
        unstructuredTotal: [
          {
            label: "equipment",
            previous:
              response.data["total report"][
                "total previous month equipment expence"
              ],
            this: response.data["total report"][
              "total this month equipment expence"
            ],
            todate:
              response.data["total report"]["total todate equipment expence"],
          },
          {
            label: "manpower",
            previous:
              response.data["total report"][
                "total previous month employee expence"
              ],
            this: response.data["total report"][
              "total this month employee expence"
            ],
            todate:
              response.data["total report"]["total todate employee expence"],
          },
          {
            label: "material",
            previous:
              response.data["total report"][
                "total previous month material expence"
              ],
            this: response.data["total report"][
              "total this month material expence"
            ],
            todate:
              response.data["total report"]["total todate material expence"],
          },
          {
            label: "fuel",
            previous:
              response.data["total report"][
                "total previous months fuel expence"
              ],
            this: response.data["total report"][
              "total this months fuel expence"
            ],
            todate: response.data["total report"]["total todate fuel expence"],
          },
          {
            label: "income",
            previous: response.data["total report"]["total last months income"],
            this: response.data["total report"]["total this month income"],
            todate: response.data["total report"]["total todate income"],
          },
          {
            label: "expense",
            previous: totalPre,
            this: totalThis,
            todate: totalTodate,
          },
        ],
        total: dualData(
          Object.values({
            previous: response.data["total report"]["total last months income"],
            this: response.data["total report"]["total this month income"],
            todate: response.data["total report"]["total todate income"],
          }),
          Object.values({
            previous: totalPre,
            this: totalThis,
            todate: totalTodate,
          })
        ),
        percent: {
          previous: gData("previous", pre),
          this: gData("This Months", thi_s),
          todate: gData("Todate", todate),
        },
      };
    });
};

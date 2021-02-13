// const eachBranchDailyDataArray =
//   organization.branches &&
//   organization.branches.map((eachBranch) => {
//     const { dates, ...rest } = eachBranch.chart;

//     const allDevicesDailyData = Object.values(rest);

//     return {
//       days: dates,
//       data: sumArrayofArrays(allDevicesDailyData),
//     };
//   });

// const eachBranchDailyEnergyArray =
//   eachBranchDailyDataArray &&
//   eachBranchDailyDataArray.map((eachBranch) => eachBranch.data);

// const organizationDailyData = {
//   days: organization.name && organization.branches[0].chart.dates,
//   data:
//     eachBranchDailyDataArray && sumArrayofArrays(eachBranchDailyEnergyArray),
// };

// const eachBranchEnergyDataArray =
//   organization.branches &&
//   organization.branches.map((eachBranch) => {
//     const energyValueNames = Object.keys(eachBranch.devices[0]).filter(
//       (eachName) => !['name', 'id'].includes(eachName)
//     );

//     let branchEnergyData = {};

//     energyValueNames.forEach((eachName) => {
//       return (branchEnergyData[eachName] = sumValuesUp(
//         eachBranch.devices,
//         eachName
//       ));
//     });

//     return branchEnergyData;
//   });

// const energyValueNames =
//   eachBranchEnergyDataArray &&
//   Object.keys(eachBranchEnergyDataArray[0]).filter(
//     (eachName) => !['name', 'id'].includes(eachName)
//   );

// let organizationEnergyData = {};

// energyValueNames &&
//   energyValueNames.forEach((eachName) => {
//     return (organizationEnergyData[eachName] = sumValuesUp(
//       eachBranchEnergyDataArray,
//       eachName
//     ));
//   });

// const refinedOrganizationData = {
//   name: organization.name,
//   ...organizationEnergyData,
//   organizationDailyData,
// };

// console.log(refinedOrganizationData);

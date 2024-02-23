const axios = require("axios");
const cheerio = require("cheerio");
const xlsx = require("xlsx");

// Create a new workbook
const workbook = xlsx.utils.book_new();

const getData = async () => {
  const headingArray = [];
  try {
    const res = await axios.get(
      "https://www.amazon.in/s?bbn=1389401031&rh=n%3A976419031%2Cn%3A1389401031%2Cn%3A1389432031&dc&rnid=1389401031&ref=lp_1389401031_nr_n_3https://www.amazon.in/s?k=8gb+ram+smartphone&rh=n%3A1389401031&ref=nb_sb_noss",
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
    // console.log(res.data);
    const $ = cheerio.load(res.data);
    $("body")
      .find("span.a-size-medium.a-color-base.a-text-normal")
      .each((index, data) => headingArray.push([$(data).text()]));

    $("body")
    .find("span.a-price")
    .each((index, data) => headingArray[index].push($(data).text()));

    $("body")
    .find("span.a-icon-alt")
    .each((index, data) => headingArray[index].push($(data).text()));

  } catch (error) {
    console.log("Error message : ", error);
  }
  console.log(headingArray);
  const sheet = xlsx.utils.aoa_to_sheet(headingArray);

  // Append the sheet to the workbook
  xlsx.utils.book_append_sheet(workbook, sheet, "Sheet1");

  // Save the workbook to a file
  xlsx.writeFile(workbook, "mobileData.xlsx");

  console.log("XLSX file created successfully!")
};

getData();

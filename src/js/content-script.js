const axios = require("axios");

generateApplicantsModal();
getApplicantsData().then(applicantsData => {
  const showApplicantButtons = [
    document.querySelector('a#anchrTotalProposalHeader'),
    document.querySelector("#spnTotalApplicant > a")
  ];
  showApplicantButtons.forEach(button => {
    button.addEventListener("click", addBidAmountInfo(applicantsData))
  });
});

function generateApplicantsModal() {
  location.href = "javascript:AllApplicants(); void 0";
}

async function getApplicantsData() {
  const applicantsDataURL = "https://www.guru.com/pro/JobDetail.aspx/GetJsonForApplicant_ProposalDetails";
  const response = await axios.post(applicantsDataURL, {
    ProjectId: +location.pathname.split("/")[3].split("&")[0]
  });
  const applicantsData = JSON.parse(response.data.d).Result;
  return applicantsData;
}

function addBidAmountInfo(applicantsData) {
  return () => {
    const applicantDivs = document.querySelectorAll("#modalApplicants > .clearfix");
    applicantDivs.forEach((div, index) => {
      const applicantBidAmount = applicantsData[index].BidAmount;
      const applicantBidAmountFormatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(applicantBidAmount);

      const applicantBidAmountDiv = document.createElement("div");
      applicantBidAmountDiv.setAttribute("style", `
        font-weight: 800; 
        color: black; 
        opacity: 0.7;
      `);
      applicantBidAmountDiv.innerHTML = `Bid Amount: ${applicantBidAmountFormatted}`;

      const bidInfoDiv = div.children[1];
      bidInfoDiv.append(applicantBidAmountDiv)
    });
  }
}
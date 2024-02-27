const sendSmsVerification = async (phoneNumber) => {
  console.log("phone----------", phoneNumber);

  try {
    const data = JSON.stringify({
      to: phoneNumber,
      channel: "sms",
    });

    const response = await fetch(`https://verify-3620-yeqdl4.twil.io/start-verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    const json = await response.json();
    console.log("dataaaaaaaaaaa", json);


    return json.success;

  } catch (error) {
    console.log("error-----------------------------------------")
    console.error("error", error);
    return false;
  }
};

const checkVerification = async (phoneNumber, code) => {
  try {
    const data = JSON.stringify({
      to: phoneNumber,
      code,
    });

    const response = await fetch(`https://verify-3620-yeqdl4.twil.io/check-verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    const json = await response.json();
    return json.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  sendSmsVerification,
  checkVerification,
};
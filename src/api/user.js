const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const optionsLogin = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
const userLoginRequest = async (userInfo) => {
  console.log(userInfo);
  try {
    let jsonToken = await fetch(`${SERVER_URL}/user/login`, {
      ...optionsLogin,
      body: JSON.stringify(userInfo),
    });
    let userToken = await jsonToken.json();
    console.log({ userToken });
    return userToken;
  } catch (err) {
    console.log("ERR-LOGIN: ", err);
  }
};

export { userLoginRequest };

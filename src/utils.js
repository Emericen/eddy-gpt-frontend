const url = "http://127.0.0.1:5000";

export const getNumber = () => {
  return fetch(`${url}/get_number`, {
    method: "GET",
  }).then((response) => {
    console.log(response);
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get number");
    }
    return response.json();
  });
};

export const generate = (data) => {
  console.log(data);

  // return {
  //     "output": "Eddy said: " + data["prompt"]
  // }

  return fetch(`${url}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to generate");
    }
    return response.json();
  });
};

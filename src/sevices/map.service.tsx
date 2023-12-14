import { axiosInstance } from "./axios";

type BodyType = {
  image: string;
  description: string;
  title: string;
  coordinates: string;
  rating: number;
};

type responseType = {
  message: string;
  status: number;
  data?: any;
};

export const MapService = {
  post: async (
    body: any,
    setAlertMessage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    try {
      const response: responseType = await axiosInstance.post(
        "plots",
        body
      );
      if (response.message == "ok" && response.status == 201) {
        setAlertMessage("Successfully created incident");
      }
    } catch (error: any) {
      console.log(error);

      if (error.status == 409) {
        setAlertMessage("Error while creating incident. Try again");
      } else {
        setAlertMessage("Something went wrong. Try again");
      }
    }
  },

  get: async () => {
    try {
      const response = await axiosInstance.get("plots?populate=*");
      const data = response.data.data;
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
    }
  },

  // update: async (
  //   body: BodyType,
  //   id: number,
  //   setAlertMessage: React.Dispatch<React.SetStateAction<string>>
  // ) => {
  //   try {
  //     const response: responseType = await axiosInstance.post(
  //       `reports/update/${id}`,
  //       body
  //     );
  //     if (response.message == "ok" && response.status == 200) {
  //       setAlertMessage("Successfully updated incident");
  //     }
  //   } catch (error: any) {
  //     if (error.messsage == "Bad Request" || error.status == 400) {
  //       setAlertMessage("Error while updating incident. Try again");
  //     } else {
  //       setAlertMessage("Something went wrong. Try again");
  //     }
  //   }
  // },

  // delete: async (
  //   id: number,
  //   setAlertMessage: React.Dispatch<React.SetStateAction<string>>
  // ) => {
  //   try {
  //     const response: responseType = await axiosInstance.post(
  //       `reports/delete/${id}`
  //     );
  //     if (response.message == "ok" && response.status == 200) {
  //       setAlertMessage("Successfully deleted incident");
  //     }
  //   } catch (error: any) {
  //     if (error.messsage == "Bad Request" || error.status == 400) {
  //       setAlertMessage("Error while deleting incident. Try again");
  //     } else {
  //       setAlertMessage("Something went wrong. Try again");
  //     }
  //   }
  // },
};

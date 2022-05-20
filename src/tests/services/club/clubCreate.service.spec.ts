// import { DataSource } from "typeorm";
// import { AppDataSource } from "../../../data-source";
// import createUserService from "../../../services/club/create.service";
// import useRepo from "../../../hooks/useRepo";
// import useError from "../../../hooks/useError";

// describe("Unitary Create User Service on Success", () => {
//   let connection: DataSource;

//   const { clubs } = useRepo();

//   const clubOne = {
//     name: "São Paulo FC",
//   };
//   const clubTwo = {
//     name: "Fluminense FC",
//   };

//   beforeAll(async () => {
//     await AppDataSource.initialize()
//       .then((res) => {
//         connection = res;
//       })
//       .catch((e) => console.error("AppDataSource failed to connect: ", e));
//   });
//   afterAll(async () => {
//     await connection.destroy();
//   });
// });

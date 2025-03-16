






























// router.get("/movies", async (req, res) => {
//     res.send(
//       await Session.findAll({
//         include: [
//           { model: Movie, required: true },
//           { model: Room, required: true },
//         ],
//       })
//     );
//   });
  
//   router.get("/movies/:date", async (req, res) => {
//     const date = req.params.date;
//     res.send(
//       await Session.findAll({
//         include: [
//           { model: Movie, required: true },
//           { model: Room, required: true },
//         ],
//         where: {
//           start_time: {
//             [Op.gte]: new Date(`${date}T00:00:00`),
//             [Op.lt]: new Date(`${date}T23:59:59`),
//           },
//         },
//       })
//     );
//   });
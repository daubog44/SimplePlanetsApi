const AppError = require("../utils/appError");
const data = require("../data/loadData");
const { mainModule } = require("process");

exports.getData = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data,
  });
};

exports.getAllPossibleSpaceDoors = (req, res, next) => {
  const { quantity } = req.params;
  const { spaceDoor } = req.params;

  if (!quantity || !spaceDoor || !Number(quantity)) {
    return next(
      new AppError("Please provide a quantity and a space door correct!", 400)
    );
  }

  const spaceDoorSelected = data.find((obj) => obj.name === spaceDoor);
  if (!spaceDoorSelected) {
    return next(new AppError(`Space door ${spaceDoor} not found`, 404));
  }

  const possibility = spaceDoorSelected.links.filter((link) =>
    link.cost <= quantity ? link : null
  );

  res.status(200).json({
    status: "success",
    data: {
      possibility,
    },
  });
};

exports.getSimplePath = (req, res, next) => {
  const { initialDoor, finalDoor } = req.params;

  const initialDoorSelected = data.find((obj) => obj.name === initialDoor);
  if (!initialDoorSelected) {
    return next(new AppError(`Initial door ${initialDoor} not found`, 404));
  }

  const finalDoorSelected = data.find((obj) => obj.name === finalDoor);
  if (!finalDoorSelected) {
    return next(new AppError(`Final door ${finalDoor} not found`, 404));
  }

  const path = findPath(initialDoorSelected, finalDoorSelected);

  if (!path) {
    return next(new AppError(`No path found`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      path: path[0].slice(0, -1),
      totalCost: path[0].at(-1),
    },
  });
};

const findPath = (initialDoor, finalDoor) => {
  let allPossiblepath = [];
  let links = initialDoor.links;
  let totalCost = 0;

  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    if (link.to === finalDoor.name) {
      allPossiblepath[i] = [link, link.cost];
    }

    const nextPossibility = data.find((obj) => obj.name === link.to);

    nextPossibility.links.forEach((nextLink) => {
      if (nextLink.to === finalDoor.name) {
        allPossiblepath[i] = [
          link,
          { to: nextLink.to, cost: nextLink.cost },
          link.cost + nextLink.cost,
        ];
      }
    });
  }

  allPossiblepath = allPossiblepath.filter((path) => (path ? path : null));

  let minCostPathIndex = [];
  allPossiblepath.forEach((path) => {
    minCostPathIndex.push(path.at(-1));
  });
  minCostPathIndex = minCostPathIndex.indexOf(Math.min(...minCostPathIndex));

  return [allPossiblepath[minCostPathIndex]];
};

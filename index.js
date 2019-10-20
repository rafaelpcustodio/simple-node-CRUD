const express = require("express");

const server = express();

server.use(express.json());

const projects = [
  {
    id: "0",
    title: "tests",
    tasks: [
      {
        task: "nenhuma"
      }
    ]
  }
];

let countRequisition = 0;

server.use((req, res, next) => {
  countRequisition++;
  console.log(`We already have ${countRequisition} requisitions done.`);
  return next();
});

function checkProjectInArray(req, res, next) {
  const { id } = req.params;
  const indexToBeUpdated = projects.findIndex(p => p.id === id);
  if (indexToBeUpdated < 0) {
    return res.status(400).json({ error: "Project does not exist." });
  }

  return next();
}

server.post("/projects", (req, res) => {
  const { id } = req.body;
  const { title } = req.body;
  const { tasks } = req.body;
  projects.push({ id, title, tasks });
  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const indexToBeUpdated = projects.findIndex(p => p.id === id);
  projects[indexToBeUpdated].title = title;
  return res.json(projects);
});

server.delete("/projects/:id", checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const indexToBeUpdated = projects.findIndex(p => p.id === id);
  projects.splice(indexToBeUpdated, 1);
  return res.json(projects);
});

server.post("/projects/:id/tasks", checkProjectInArray, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  const indexToBeUpdated = projects.findIndex(p => p.id === id);
  projects[indexToBeUpdated].tasks.push({ task: title });
  return res.json(projects);
});

server.listen(3000);

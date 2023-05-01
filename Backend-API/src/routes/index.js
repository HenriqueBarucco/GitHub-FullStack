import users from "./usersRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).send({ title: "Shaw and Partners  :)" });
    });

    app.use(users);
};

export default routes;

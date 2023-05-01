export default class UserController {
    static usersSince = (req, res) => {
        const since = req.query.since;

        fetch(`https://api.github.com/users?since=${since}`)
            .then((response) => response.json())
            .then((data) => res.send(data))
            .catch((error) => res.status(500).send(error));
    };

    static async userDetails(req, res) {
        const username = req.params.username;

        try {
            const response = await fetch(
                `https://api.github.com/users/${username}`
            );
            const data = await response.json();

            if (response.status === 404) {
                res.status(404).send({ message: "User not found" });
            } else {
                res.send(data);
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    static async userRepos(req, res) {
        const username = req.params.username;

        try {
            const response = await fetch(
                `https://api.github.com/users/${username}/repos`
            );
            const data = await response.json();

            if (response.status === 404) {
                res.status(404).send({ message: "Usuário não encontrado" });
            } else {
                res.send(data);
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

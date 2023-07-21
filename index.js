const express = require("express");
const app = express();
const fs = require("fs/promises");

const PORT = 3000;

// Mostrar todo: http://localhost:3000
app.get("/", async (req, res) => {
    try {
        const data = JSON.parse(
        await fs.readFile(__dirname + "/anime.json")
        );
        res.status(200).json({
            message: "Datos cargados correctamente",
            data: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        status: "ERROR",
        message: error.message,
        });
    }
    res.end();
});

// Buscar: http://localhost:3000/read/1
app.get("/read/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = JSON.parse(await fs.readFile(__dirname + "/anime.json"));
        let animeEncontrado = data[id];
        if (animeEncontrado) {
            res.status(200).json({
                message: "Se ha encontrado el animé con exito",
                data: animeEncontrado
        });
        } else {
        res.status(404).json({
            status: "OK",
            message: "No existe este animé",
        });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
        status: "ERROR",
        message: error.message,
        });
    }
    res.end();
});

// Crear: http://localhost:3000/create?nombre=Angel&genero=Maho&anio=1979&autor=Shiro
    app.get("/create", async (req, res) => {
        try {
            const nombre = req.query.nombre;
            const genero = req.query.genero;
            const anio = req.query.anio;
            const autor = req.query.autor;
            const newAnime = {
            nombre,
            genero,
            anio,
            autor
            };
        const anime = JSON.parse(
        await fs.readFile(__dirname + "/anime.json")
        );
        const id = new String(
        Number(
            Object.keys(anime)[Object.keys(anime).length - 1]
        ) + 1
        );
        anime[id] = newAnime;
        await fs.writeFile(__dirname + "/anime.json", JSON.stringify(anime));
            res.status(201).json({
                message: "Se ha creado con éxito el nuevo animé",
                data: anime
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
    res.end();
});

// Actualizar: http://localhost:3000/update/6?nombre=Angel+la+niña+de+las+flores&genero=Maho+soho&anio=1979&autor=Shiro+Jinbo
app.get("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const nombre = req.query.nombre;
        const genero = req.query.genero;
        const anio = req.query.anio;
        const autor = req.query.autor;
        let encontrado = false;

        const data = JSON.parse(await fs.readFile(__dirname + "/anime.json"));
    let newAnime = data[id];
    if (newAnime) {
        newAnime.nombre = nombre;
        newAnime.genero = genero;
        newAnime.anio = anio;
        newAnime.autor = autor;
        encontrado = true;
    }

    if (encontrado) {
        await fs.writeFile( __dirname + "/anime.json", JSON.stringify(data));
        res.status(201).json({
            message: "Los datos han sido actualizados con éxito",
            data: data
        });
        } else {
        res.status(404).json({
            status: "OK",
            message: "No existe el animé a actualizar",
        });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
    res.end();
});

// Borrar: http://localhost:3000/delete/6
app.get("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = JSON.parse(
        await fs.readFile(__dirname + "/anime.json")
        );
        delete data[id];
        await fs.writeFile(__dirname + "/anime.json", JSON.stringify(data));
        res.status(201).json({
            message: "El animé se ha eliminado correctamente",
            data: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        status: "ERROR",
        message: error.message,
        });
    }
    res.end();
});

app.listen(PORT, () => console.log(`Iniciando en puerto ${PORT}`));

module.exports = {
    app,
};

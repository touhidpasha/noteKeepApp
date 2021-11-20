const noteService = require("../services/note.service.js");
const utils = require("../utils/utils")

class controller {


    //creates a note in the database
    createNote = (req, res) => {
        var email = utils.verifyUser(req.body.token);

        if (!email)
            return res.status(401).send({ "message": "please login first" })
        let info = {
            "title": req.body.title,
            "content": req.body.content,
            "email": email
        }

        noteService.createNote(info, (err, data) => {
            if (err) {
                return res.status(500).send({
                    message: err.message || "Some error occurred while creating the Note.",
                });
            }
            return res.status(200).send(data);
        });
    };


    //updating note as trash 
    setTrash = (req, res, next) => {

        const email = utils.verifyUser(req.body.token);
        if (!email)
            return res.status(401).send({ "message": "unautorizesd" })
        else
            noteService.setTrash(req.body, (err, data) => {
                if (err) {
                    return res.status(500).send({
                        message: err.message || "Some error occurred while creating the Note.",
                    });
                }
                return res.status(200).send(data);

            })
    }

    // Retrieve and return all notes from the database.
    findAll = (req, res) => {
        // console.log("in findall 1 " +JSON.stringify(req.body.token));
        // console.log("in findall 2 " +req.body.token);
        // console.log("in findall 2.1 " +req.token);
        // console.log("in findall 2.1 " +req.body);
        console.log("req " + req.body);
        console.log("req " + req.headers);

        // console.log("header token "+req.body.data.token);
        console.log("header tokenn auth " + req.body.headers.Authorization);
        // console.log(" header "+ req.headers.Authorization);


        console.log("in findall 2.1 " + JSON.stringify(req.headers));

        // const email = utils.verifyUser(req.body.data.token);
        const email = utils.verifyUser(req.body.headers.Authorization);

        // const email = utils.verifyUser(req.body.token);
        // console.log("data from FE "+JSON.stringify(req.body));
        // const email = utils.verifyUser("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvdWhpZHBhc2hhNTUyQGdtYWlsLmNvbSIsImlhdCI6MTYzNjg4OTEzMCwiZXhwIjoxNjM2ODk2MzMwfQ.uhpgwxS74gGoX7ayOzjs7pn-Mvdwmuj1SFtMR9PY084");
        // const email=utils.verifyUser("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvdWhpZHBhc2hhNTUyQGdtYWlsLmNvbSIsImlhdCI6MTYzNjk1MDcxNCwiZXhwIjoxNjM2OTU3OTE0fQ.5Cxu3vaQSFSIamTkuXtZ-vQN28oV1chyi3PD26xP__4")
        console.log("in findall 3" + email);
        if (email !== false) {
            noteService.findAll({ "email": email }, (err, data) => {
                if (err) {
                    return res.status(500).send({
                        message: err.message || "Some error occurred while fetching the Note.",
                    });
                }
                console.log("output from server " + data);
                return res.status(200).send(data);
            });
        }
        else {
            return res.status(401).send({ "message": "login first" })
        }
    };

    // Find a single note with a noteId
    findOne = (req, res) => {
        let id = req.params.noteId;
        noteService.findOne(id, (err, data) => {
            if (err) {
                if (err.kind === "ObjectId") {
                    return res.status(404).send({
                        message: "Note not found with id " + id,
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving note with id " + id,
                });
            }
            if (!data) {
                return res.status(404).send({
                    message: "Note not found with id (in then) " + id,
                });
            }
            res.status(200).send({ Note: data });
        });
    };

    // Update a note identified by the noteId in the request
    updateNote = (req, res) => {
        let id = req.params.noteId;
        let title = req.body.title;
        let content = req.body.content;
        noteService.updateNote(id, title, content, (err, data) => {
            if (err) {
                if (err.kind === "ObjectId") {
                    return res.status(404).send({
                        message: "Note not found with id " + id,
                    });
                }
                return res.status(500).send({
                    message: "Error updating note with id " + id,
                });
            }
            if (!data) {
                return res.status(404).send({
                    message: "Note not found with id " + id,
                });
            }
            res.send({ message: "Update Succesfull", Note: data });
        });
    };

    // Delete a note with the specified noteId in the request
    deleteOne = (req, res) => {
        console.log("deletion is called for "+req.body.id);
        const email = utils.verifyUser(req.body.token);
        if (!email)
            return res.status(401).send({ "message": "unautorizesd for deletion" })
        else
            noteService.deleteOne(req.body, (err, data) => {
                if (err) {
                    return res.status(500).send({
                        message: err.message || "Some error occurred while creating the Note.",
                    });
                }
                return res.status(200).send(data);

            })
    }

    // let id = req.params.noteId;
    // noteService.deleteOne(id, (err, data) => {
    //     if (err) {
    //         if (err.kind === "ObjectId") {
    //             return res.status(404).send({
    //                 message: "Note not found with id " + id,
    //             });
    //         }
    //         return res.status(500).send({
    //             message: "Error deleting note with id " + id,
    //         });
    //     }
    //     if (!data) {
    //         return res.status(404).send({
    //             message: "Note not found with id " + id,
    //         });
    //     }
    //     res.send("Deleted node successfully");
// });
    // };
}

module.exports = new controller();
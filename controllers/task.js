import task from "../models/task.js"
export const newTask = async (req,res) => {
    const {title,description} = req.body;
    const taskinfo = await task.create({
        title,
        description,
        user: req.user
    });
    res.status(201)
    .json({
        success: true,
        message: "Task added successfully"
    });
}
export const allTask = async (req,res) => {
    const id = req.user._id;
    const tasks = await task.find({user: id});
    res.status(200)
    .json({
        success: true,
        tasks
    })
}
export const updateTask = async (req,res) => {
    const {id} = req.params;
    const taskinfo = await task.findById(id);
    if(!taskinfo)
    {
        return res.status(404)
        .json({
            success: false,
            message: "Invalid Id"
        })
    }
    taskinfo.isCompleted = !taskinfo.isCompleted;
    await taskinfo.save();
    res.status(200)
    .json({
        success: true,
        message: "Task Updated"
    })
}
export const deleteTask = async (req,res) => {
    const {id} = req.params;
    const taskinfo = await task.findById(id);
    if(!taskinfo)
    {
        return res.status(404)
        .json({
            success: false,
            message: "Invalid Id"
        })
    }
    await taskinfo.deleteOne();
    res.status(200)
    .json({
        success: true,
        message: "Task Deleted"
    })
}
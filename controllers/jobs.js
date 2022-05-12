const JobModel = require('../models/Job')

const getAllJobs = async (req, res) => {
    const jobs = await JobModel.find({ createdBy: req.user.userId }).sort('createdAt')
    return res.status(200).json({ jobs, count: jobs.length })
}



module.exports = {
    getAllJobs
}
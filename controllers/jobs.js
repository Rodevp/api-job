const JobModel = require('../models/Job')

const getAllJobs = async (req, res) => {
    const jobs = await JobModel.find({ createdBy: req.user.userId }).sort('createdAt')
    return res.status(200).json({ jobs, count: jobs.length })
}

const getJob = async (req, res) => {

    const {
      user: { userId },
      params: { id: jobId },
    } = req
  
    const job = await JobModel.findOne({
      _id: jobId,
      createdBy: userId,
    })
    
    if (!job) {
      return res.status(404).json({ message: 'job not found' })
    }
    
    return res.status(200).json({ job })

}



module.exports = {
    getAllJobs,
    getJob
}
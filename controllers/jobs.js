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

const createJob = async (req, res) => {

    req.body.createdBy = req.user.userId
    const job = await JobModel.create(req.body)
    return res.status(201).json({ job })

}

const updateJob = async (req, res) => {

    const {
      body: { company, position },
      user: { userId },
      params: { id: jobId },
    } = req
  
    if (company === '' || position === '') {
      return res.status(400).json({ message: 'Company or Position fields cannot be empty' })
    }

    const job = await JobModel.findByIdAndUpdate(
      { _id: jobId, createdBy: userId },
       req.body,
      { new: true, runValidators: true }
    )

    if (!job) {
      return res.status(404).json({ message: 'job not found' })
    }

    return res.status(201).json({ job })

}


module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob
}